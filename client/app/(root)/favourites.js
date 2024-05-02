import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { getContext } from "../../providers/ContextProvider";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import tw from "twrnc";
import { router } from "expo-router";

const Favourites = () => {
  const { favourites, setProduct } = getContext();
  return (
    <SafeView style={tw`mt-4 bg-gray-100`}>
      <ScrollView>
        <Header showBackButton />
        <Text style={tw`mt-3 text-center font-bold text-2xl`}>Favourites</Text>

        {favourites.length > 0 ? (
          <View
            style={tw`gap-y-4 px-4 mt-4 items-center justify-center flex-row gap-x-4 flex-wrap`}
          >
            {favourites.map((favourite, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setProduct(favourite);
                    router.push("/product");
                  }}
                  style={tw`bg-white rounded-3xl px-3 pb-4`}
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
                    {favourite.name.length > 15
                      ? favourite.name.substring(0, 15) + "..."
                      : favourite.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Text
            style={tw`text-rose-500 text-xl text-center font-semibold mt-5`}
          >
            No items here
          </Text>
        )}
      </ScrollView>
    </SafeView>
  );
};

export default Favourites;
