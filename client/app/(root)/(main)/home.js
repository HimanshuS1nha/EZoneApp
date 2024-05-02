import { ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import SafeView from "../../../components/SafeView";
import Header from "../../../components/Header";
import Categories from "../../../components/Categories";
import Products from "../../../components/Products";

const Home = () => {
  return (
    <SafeView style={tw`mt-4`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-y-4`}
      >
        <Header />
        <Categories />
        <Products title={"featured"} />
        <Products title={"best-seller"} />
        <Products title={"mobiles"} />
        <Products title={"electronics"} />
        <Products title={"stationery"} />
      </ScrollView>
    </SafeView>
  );
};

export default Home;
