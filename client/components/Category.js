import { router } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Pressable,
  Text
} from "react-native";
import tw from "twrnc";

const Category = ({ category }) => {
  return (
    <Pressable onPress={() => router.push(`/${category.name}`)}>
      <ImageBackground
        source={{ uri: category.image }}
        style={tw`w-[250px] h-[200px] mr-4`}
        imageStyle={tw`rounded-lg`}
      >
        <Text
          style={tw`text-blue-600 text-xl font-extrabold capitalize absolute bottom-3 left-2`}
        >
          {category.name}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

export default Category;
