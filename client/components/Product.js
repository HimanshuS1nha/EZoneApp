import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { getContext } from "../providers/ContextProvider";

const Product = ({ product }) => {
  const { setProduct } = getContext();

  const handlePress = () => {
    setProduct(product);
    router.push("/product");
  };
  return (
    <Pressable
      style={tw`shadow-xl bg-white border p-2 items-center mr-4 rounded-lg`}
      onPress={handlePress}
    >
      <Image
        source={{ uri: product.images[0] }}
        style={tw`w-40 h-28`}
        resizeMode="contain"
      />
      <Text style={tw``}>
        {product.name.length > 15
          ? product.name.substring(0, 15) + "..."
          : product.name}
      </Text>
      <View
        style={tw`bg-red-500 absolute py-0.5 px-1 rounded-tl-lg rounded-tr-full rounded-br-full -top-0.5 left-0`}
      >
        <Text style={tw`text-white`}>-{product.discount}%</Text>
      </View>
    </Pressable>
  );
};

export default Product;
