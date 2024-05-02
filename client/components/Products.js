import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import tw from "twrnc";
import axios from "axios";
import Product from "./Product";

const Products = ({ title }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["get-products" + title],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/category/${title}`
      );
      return data.data;
    },
  });
  return (
    <View>
      <Text style={tw`text-xl font-bold px-4 mb-4 capitalize`}>
        {title.split("-").length > 1
          ? `${title.split("-")[0]} ${title.split("-")[1]}`
          : title}
      </Text>
      {isLoading ? (
        <ActivityIndicator size={30} style={tw`mt-5`} />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={tw`px-2`}
          showsHorizontalScrollIndicator={false}
        >
          {products?.map((product, i) => {
            return <Product product={product} key={i} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Products;
