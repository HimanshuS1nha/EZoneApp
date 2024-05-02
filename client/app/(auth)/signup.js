import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: handleSignup, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async () => {
      if (!email || !phone || !password || !confirmPassword) {
        throw new Error("Please fill all the fields");
      }

      if (phone.trim().length !== 10) {
        throw new Error("Phone number must be 10 digits long");
      }

      if (password.trim().length !== 8 || confirmPassword.trim().length !== 8) {
        throw new Error("Passwords must be atleast 8 chracters long");
      }

      if (password !== confirmPassword) {
        throw new Error("Password do not match");
      }

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/signup`,
        {
          email,
          phone,
          password,
          confirmPassword,
        }
      );

      return data;
    },

    onSuccess: (data) => {
      router.replace("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response.data.error) {
          Alert.alert("Error", error.response.data.error);
        } else {
          Alert.alert("Error", "Some error occured. Please try again later!");
        }
      } else if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later!");
      }
    },
  });
  return (
    <SafeView style={tw`flex-1`}>
      <ImageBackground
        source={{
          uri: "https://blog.hubspot.com/hs-fs/hubfs/ecommerce%20marketing.jpg?width=595&height=400&name=ecommerce%20marketing.jpg",
        }}
        style={tw`flex-1`}
        resizeMode="stretch"
      >
        <Text style={tw`mx-8 mt-16 text-3xl font-semibold`}>
          Let&apos;s get started!
        </Text>
      </ImageBackground>
      <View
        style={tw`absolute w-full bottom-0 h-[420px] bg-white rounded-tl-2xl rounded-tr-2xl px-12`}
      >
        <TouchableOpacity
          style={tw`bg-blue-600 w-16 h-16 items-center justify-center rounded-full absolute right-12 -top-7`}
          onPress={handleSignup}
          disabled={isPending}
        >
          <Entypo name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
        <Text style={tw`mt-8 text-3xl font-semibold`}>Sign up</Text>

        <View style={tw`mt-7 gap-y-6`}>
          <TextInput
            placeholder="Your email"
            style={tw`border-b py-2 border-b-gray-300`}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Your phone number"
            style={tw`border-b py-2 border-b-gray-300`}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            placeholder="Your password"
            style={tw`border-b py-2 border-b-gray-300`}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm password"
            style={tw`border-b py-2 border-b-gray-300`}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={tw`flex-row justify-end mt-7`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={tw`font-semibold text-base`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
};

export default Signup;
