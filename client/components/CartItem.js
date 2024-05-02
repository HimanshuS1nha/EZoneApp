import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { getContext } from "../providers/ContextProvider";

const CartItem = ({ product, giveShadow = true }) => {
  const { alterQuantity, removeFromCart } = getContext();
  return (
    <View
      style={tw`w-full h-36 bg-white ${
        giveShadow ? "shadow-xl" : ""
      } flex-row items-center gap-x-5 rounded-lg`}
    >
      <View style={tw`h-full w-28`}>
        <Image
          source={{ uri: product.images[0] }}
          style={tw`w-full h-full`}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={tw`w-32 text-lg font-medium`}>
          {product.name.length > 20
            ? product.name.substring(0, 21) + "..."
            : product.name}
        </Text>
        <Text style={tw`font-medium text-rose-500`}>
          ₹{" "}
          {Intl.NumberFormat("en-IN").format(product.price * product.quantity)}
        </Text>
      </View>
      <View style={tw`flex-row gap-x-2`}>
        <TouchableOpacity onPress={() => alterQuantity(product, "-")}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </TouchableOpacity>
        <Text style={tw`font-medium`}>{product.quantity}</Text>
        <TouchableOpacity onPress={() => alterQuantity(product, "+")}>
          <AntDesign name="pluscircle" size={24} color="green" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`absolute top-2 right-2`}
        onPress={() => removeFromCart(product)}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
