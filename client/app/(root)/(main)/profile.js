import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import SafeView from "../../../components/SafeView";
import { getContext } from "../../../providers/ContextProvider";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { user, setUser, favourites, setProduct } = getContext();

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
    <>
      <SafeView style={tw`bg-gray-100`}>
        {Object.keys(user).length > 0 ? (
          <>
            <View
              style={tw`bg-blue-600 h-40 rounded-b-xl items-center justify-center flex-row gap-x-8`}
            >
              <Image
                source={{
                  uri: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png",
                }}
                style={tw`w-24 h-24 rounded-full`}
              />
              <View>
                <Text style={tw`text-white text-2xl font-medium`}>Profile</Text>
                <Text style={tw`text-gray-300 font-medium`}>{user?.email}</Text>
              </View>

              <View
                style={tw`absolute w-[90%] flex-row bg-white -bottom-[70px] shadow-lg justify-between px-4 py-5 rounded-lg`}
              >
                <TouchableOpacity
                  style={tw`items-center gap-y-1`}
                  onPress={() => router.navigate("/orders")}
                >
                  <MaterialIcons name="menu-book" size={27} color="black" />
                  <Text>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`items-center gap-y-1`}
                  onPress={() => router.navigate("/favourites")}
                >
                  <AntDesign name="staro" size={24} color="black" />
                  <Text>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`items-center gap-y-1`}
                  onPress={handleLogout}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={27}
                    color="black"
                  />
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`mt-28`}>
              <View style={tw`flex-row px-4 justify-between items-center`}>
                <Text style={tw`text-xl font-medium`}>Favourites</Text>
                <TouchableOpacity
                  onPress={() => router.navigate("/favourites")}
                >
                  <Text style={tw`text-blue-600 font-bold`}>View all</Text>
                </TouchableOpacity>
              </View>

              <View style={tw`gap-y-4 px-4 mt-4`}>
                <View
                  style={tw`flex-row gap-x-2 gap-y-4 flex-wrap items-center justify-center`}
                >
                  {favourites.slice(0, 4).map((favourite, i) => {
                    return (
                      <TouchableOpacity
                        style={tw`bg-white rounded-3xl px-3 pb-4 w-[45%] items-center`}
                        onPress={() => {
                          setProduct(favourite);
                          router.navigate("/product");
                        }}
                        key={i}
                      >
                        <Image
                          source={{
                            uri: favourite.images[0],
                          }}
                          style={tw`w-36 h-36`}
                          resizeMode="contain"
                        />
                        <Text style={tw`text-center font-bold`}>
                          {favourite.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={tw`bg-white flex-1 items-center justify-center gap-y-6`}>
            <Text style={tw`text-red-500 font-bold text-xl`}>
              Please login first
            </Text>

            <TouchableOpacity
              style={tw`w-[45%] bg-blue-500 py-3 px-4 rounded-full items-center justify-center`}
              onPress={() =>
                router.navigate({
                  pathname: "/login",
                  params: { ref: "/profile" },
                })
              }
            >
              <Text style={tw`text-white text-base font-medium`}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeView>
      <StatusBar style="light" backgroundColor="#2563eb" />
    </>
  );
};

export default Profile;
