import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { getContext } from "../providers/ContextProvider";

const Header = ({ showBackButton = false }) => {
  const { setUser, favourites } = getContext();

  const handleLogout = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: async () => {
          setUser({});
          await SecureStore.deleteItemAsync("user");
          router.replace("/login");
        },
      },
    ]);
  };
  return (
    <View style={tw`flex-row items-center justify-between px-4`}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={27} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={tw`flex-row gap-x-2 items-center`}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/ef/82/4e/ef824ee86efb3ec6cc6eb6758cd5e70c.png",
            }}
            style={tw`w-8 h-8 rounded-full`}
            resizeMode="stretch"
          />
          <Text style={tw`text-xl font-bold`}>EZone</Text>
        </View>
      )}
      <View style={tw`flex-row items-center gap-x-3`}>
        <TouchableOpacity onPress={() => router.push("/favourites")}>
          <AntDesign name="staro" size={24} color="black" />
          {favourites.length > 0 && (
            <View
              style={tw`bg-red-500 w-2.5 h-2.5 rounded-full absolute top-0 right-0.5`}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={27} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
