import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import SafeView from "../../components/SafeView";
import { Entypo } from "@expo/vector-icons";
import { getContext } from "../../providers/ContextProvider";
import CartItem from "../../components/CartItem";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const Checkout = () => {
  const { user, cart, totalAmount } = getContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { mutate: handleCheckout, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      if (!name || !address || !pincode || !city || !state) {
        throw new Error("Please fill all the fields");
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/create-order`,
        {
          name,
          email: user.email,
          address,
          pincode,
          city,
          state,
          cart,
          totalAmount,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      router.push({ pathname: "/payment", params: { orderId: data.orderId } });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data?.error) {
        Alert.alert("Error", error.response?.data?.error);
      } else if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later");
      }
    },
  });
  return (
    <SafeView style={tw`px-4`}>
      <TouchableOpacity onPress={() => router.back()} style={tw`mt-4`}>
        <Entypo name="chevron-left" size={27} color="black" />
      </TouchableOpacity>

      <ScrollView style={tw``} showsVerticalScrollIndicator={false}>
        <Text style={tw`mt-3 text-center font-bold text-2xl`}>
          Address Details
        </Text>

        <View style={tw`mt-8 gap-y-6`}>
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your email"
            value={user.email}
            editable={false}
          />
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your address"
            multiline
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your pin code"
            keyboardType="number-pad"
            value={pincode}
            onChangeText={(text) => setPincode(text)}
          />
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your city"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            style={tw`border rounded-lg p-3 text-base`}
            placeholder="Your state"
            value={state}
            onChangeText={(text) => setState(text)}
          />
        </View>

        <View style={tw`mt-8 gap-y-5`}>
          <Text style={tw`text-center font-bold text-2xl`}>Your Cart</Text>
          {cart.map((cartItem, i) => {
            return <CartItem product={cartItem} giveShadow={false} key={i} />;
          })}
        </View>

        <View style={tw`w-full items-center mt-8 mb-3`}>
          <TouchableOpacity
            style={tw`w-[80%] ${
              isPending ? "bg-blue-200" : "bg-blue-500"
            } py-3 px-4 items-center justify-center rounded-xl`}
            onPress={handleCheckout}
          >
            <Text style={tw`text-white text-lg font-bold`}>
              {isPending ? "Please Wait..." : "Proceed"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Checkout;
