import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import SafeView from "../components/SafeView";
import { router } from "expo-router";
import { getContext } from "../providers/ContextProvider";

const Intro = () => {
  const { user } = getContext();
  useEffect(() => {
    if (user) {
      if (Object.keys(user).length > 0) {
        router.replace("/home");
      }
    }
  }, [user]);
  return (
    <SafeView>
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-photo/view-3d-personal-computer-with-workstation_23-2150714013.jpg?size=626&ext=jpg&ga=GA1.1.856373819.1706865171&semt=sph",
        }}
        resizeMode="stretch"
        style={tw`flex-1`}
      >
        <View style={tw`justify-center items-center mt-10 flex-row gap-x-4`}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/ef/82/4e/ef824ee86efb3ec6cc6eb6758cd5e70c.png",
            }}
            style={tw`w-10 h-10 rounded-full`}
            resizeMode="stretch"
          />
          <Text style={tw`text-white text-3xl font-bold`}>EZone</Text>
        </View>
        <View
          style={tw`absolute bg-black/70 bottom-0 w-full h-[40%] items-center rounded-t-3xl`}
        >
          <View style={tw`w-20 bg-gray-400 h-1.5 rounded-full mt-6 mb-5`} />
          <Text style={tw`text-white text-3xl font-medium text-center`}>
            Find your dream product here
          </Text>
          <Text style={tw`text-gray-200 text-base font-medium text-center`}>
            We provide the best products for you
          </Text>

          <TouchableOpacity
            style={tw`bg-blue-500 mt-7 w-[57%] items-center justify-center py-3 rounded-full`}
            onPress={() => router.push("/login")}
          >
            <Text style={tw`text-white font-bold text-base`}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mt-4`}
            onPress={() => router.replace("/home")}
          >
            <Text style={tw`text-white font-bold text-base`}>
              Continue without login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeView>
  );
};

export default Intro;
