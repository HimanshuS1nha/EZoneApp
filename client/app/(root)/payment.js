import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { getContext } from "../../providers/ContextProvider";
import { router, useLocalSearchParams } from "expo-router";

const Payment = () => {
  const { confirmPayment, loading } = useConfirmPayment();
  const { totalAmount, user } = getContext();
  const { orderId } = useLocalSearchParams();

  const { mutate: handlePayment, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/create-payment-intent`,
        { totalAmount }
      );
      const { paymentIntent, error } = await confirmPayment(data.clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: { email: user.email },
        },
      });
      return { paymentIntent, error };
    },
    onSuccess: async (data) => {
      if (data.paymentIntent.status === "Succeeded") {
        router.navigate({ pathname: "/success", params: { orderId } });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response.data.error) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later!");
      }
    },
  });
  return (
    <SafeView style={tw`bg-gray-100`}>
      <View style={tw`mx-4 p-4 bg-blue-500 rounded-xl mt-4`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`absolute top-[18px] left-3 z-20`}
        >
          <Entypo name="chevron-left" size={27} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          Total amount : ₹ {totalAmount}
        </Text>
      </View>
      <View style={tw`w-full mt-5 gap-y-5`}>
        <Text style={tw`text-xl font-medium ml-8`}>Make Payment</Text>
        <Image
          source={{
            uri: "https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-gold-card-498x280.png",
          }}
          style={tw`h-60 w-full`}
          resizeMode="contain"
        />
      </View>
      <View
        style={tw`mt-7 gap-y-5 mb-5 mx-1 rounded-md border-b border-b-blue-600`}
      >
        <Text style={tw`text-xl font-medium ml-8`}>Card Details</Text>
        <CardField
          style={tw`w-full h-20`}
          cardStyle={tw``}
          postalCodeEnabled={false}
        />
      </View>

      <TouchableOpacity
        style={tw`w-[80%] ${
          isPending ? "bg-blue-300" : "bg-blue-500"
        } py-3 px-4 items-center justify-center rounded-xl mx-auto mt-7`}
        onPress={handlePayment}
        disabled={loading || isPending}
      >
        <Text style={tw`text-white text-lg font-bold`}>
          {isPending ? "Please wait..." : "Pay now"}
        </Text>
      </TouchableOpacity>
    </SafeView>
  );
};

export default Payment;
