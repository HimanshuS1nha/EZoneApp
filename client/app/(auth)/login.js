import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { getContext } from "../../providers/ContextProvider";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const { setUser } = getContext();
  const { ref } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      if (password.trim().length < 8) {
        throw new Error("Password must be atleast 8 characters long");
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/login`,
        {
          email,
          password,
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      setUser(data.user);
      await SecureStore.setItemAsync("user", JSON.stringify(data?.user));
      if (ref) {
        router.replace(ref);
      } else {
        router.replace("/home");
      }
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
    <SafeView style={tw`flex-1`}>
      <ImageBackground
        source={{
          uri: "https://blog.hubspot.com/hs-fs/hubfs/ecommerce%20marketing.jpg?width=595&height=400&name=ecommerce%20marketing.jpg",
        }}
        style={tw`flex-1`}
        resizeMode="stretch"
      >
        <Text style={tw`mx-8 mt-16 text-3xl font-semibold`}>Welcome Back!</Text>
      </ImageBackground>
      <View
        style={tw`absolute w-full bottom-0 h-76 bg-white rounded-tl-2xl rounded-tr-2xl px-12`}
      >
        <TouchableOpacity
          style={tw`bg-blue-600 w-16 h-16 items-center justify-center rounded-full absolute right-12 -top-7`}
          disabled={isPending}
          onPress={handleLogin}
        >
          <Entypo name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
        <Text style={tw`mt-8 text-3xl font-semibold`}>Sign in</Text>

        <View style={tw`mt-7 gap-y-6`}>
          <TextInput
            placeholder="Your email"
            style={tw`border-b py-2 border-b-gray-300`}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Your password"
            style={tw`border-b py-2 border-b-gray-300`}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={tw`flex-row justify-between mt-7`}>
          <TouchableOpacity>
            <Text style={tw`text-rose-500 text-base`}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            disabled={isPending}
          >
            <Text style={tw`font-semibold text-base`}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
};

export default Login;
