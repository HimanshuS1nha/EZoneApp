import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text } from "react-native";
import tw from "twrnc";
import Header from "../../components/Header";
import Product from "../../components/Product";
import SafeView from "../../components/SafeView";

const CategoryPage = () => {
  const { category } = useLocalSearchParams();

  const { data: products } = useQuery({
    queryKey: ["get-category" + category],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/category/${category}`
      );
      return data.data;
    },
  });
  return (
    <SafeView style={tw`mt-4`}>
      <Header showBackButton />
      <ScrollView contentContainerStyle={tw`px-4 gap-y-4 pb-3`}>
        <Text style={tw`mt-3 text-center font-bold text-2xl capitalize`}>
          {category}
        </Text>

        {products?.map((product, i) => {
          return <Product product={product} key={i} />;
        })}
      </ScrollView>
    </SafeView>
  );
};

export default CategoryPage;
