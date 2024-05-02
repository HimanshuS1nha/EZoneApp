import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getContext } from "../providers/ContextProvider";

const ProductHeader = ({ product }) => {
  const { addToFavourites, favourites, removeFromFavourites } = getContext();

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    favourites.map((favourite) => {
      if (favourite._id === product._id) {
        setIsFavourite(true);
      }
    });
  }, []);
  return (
    <View style={tw`flex-row px-4 justify-between items-center pt-4`}>
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="chevron-left" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (isFavourite) {
            setIsFavourite(false);
            removeFromFavourites(product);
          } else {
            setIsFavourite(true);
            addToFavourites(product);
          }
        }}
      >
        <AntDesign
          name={isFavourite ? "star" : "staro"}
          size={27}
          color={isFavourite ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductHeader;
