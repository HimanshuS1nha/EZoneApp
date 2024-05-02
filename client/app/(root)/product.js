import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import ProductHeader from "../../components/ProductHeader";
import { getContext } from "../../providers/ContextProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const ProductPage = () => {
  const { product, addToCart, user } = getContext();
  return (
    <SafeView style={tw`pb-[30px]`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        showsVerticalScrollIndicator={false}
      >
        <ProductHeader product={product} />
        <View style={tw`h-[50%] mt-4 items-center`}>
          <Image
            source={{ uri: product.images[0] }}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
          <View
            style={tw`absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-full`}
          >
            <View style={tw`flex-row gap-x-1 items-center`}>
              <Text style={tw`text-white text-base`}>{product.rating}</Text>
              <Entypo name="star" size={20} color="white" />
            </View>
          </View>
        </View>
        <View style={tw`flex-row justify-between px-4 mb-5`}>
          <Text style={tw`w-60 text-xl font-medium`}>{product.name}</Text>
          <View style={tw`items-end`}>
            <Text style={tw`text-xl font-bold`}>
              ₹{" "}
              {Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(product.price)}
            </Text>
            <View style={tw`flex-row items-center gap-x-3`}>
              <Text style={tw`text-xs font-bold text-rose-500 line-through`}>
                ₹{" "}
                {Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(product.mrp)}
              </Text>
              <Text style={tw`font-bold`}>{product.discount} % off</Text>
            </View>
          </View>
        </View>
        <View style={tw`px-4 gap-y-4`}>
          <Text style={tw`text-xl font-bold`}>About</Text>
          {product.about.map((about, i) => {
            return (
              <View key={i} style={tw`flex-row gap-x-2`}>
                <Text style={tw`text-lg`}>&#8226;</Text>
                <Text style={tw`text-lg`}>{about}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={tw`absolute w-full bottom-0 h-20 flex-row px-4 gap-x-4 justify-center items-center bg-transparent`}
      >
        <TouchableOpacity
          style={tw`w-[45%] bg-gray-300 py-3 px-4 items-center justify-center rounded-xl flex-row gap-x-2`}
          onPress={() => {
            addToCart(product);
            router.push("/cart");
          }}
        >
          <FontAwesome6
            name="cart-shopping"
            size={20}
            style={tw`text-gray-700`}
          />
          <Text style={tw`text-gray-700 text-lg font-bold`}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-[45%] bg-blue-500 py-3 px-4 items-center justify-center rounded-xl`}
          onPress={() => {
            addToCart(product);
            if (Object.keys(user).length > 0) {
              router.push("/checkout");
            } else {
              router.push({ pathname: "/login", params: { ref: "/checkout" } });
            }
          }}
        >
          <Text style={tw`text-white text-lg font-bold`}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default ProductPage;
