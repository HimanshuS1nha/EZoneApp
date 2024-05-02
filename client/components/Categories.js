import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Category from "./Category";
import tw from "twrnc";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/categories`
      );
      return data.data;
    },
  });
  return (
    <View>
      <Text style={tw`text-xl font-bold px-4 mb-4`}>Categories</Text>
      {isLoading ? (
        <ActivityIndicator size={30} style={tw`mt-5`} />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={tw`px-2`}
          showsHorizontalScrollIndicator={false}
        >
          {categories?.map((category, i) => {
            return <Category category={category} key={i} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;
