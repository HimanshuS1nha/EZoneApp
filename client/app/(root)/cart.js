import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import Header from "../../components/Header";
import { getContext } from "../../providers/ContextProvider";
import CartItem from "../../components/CartItem";
import { router } from "expo-router";

const Cart = () => {
  const { cart, totalAmount, user } = getContext();
  return (
    <SafeView style={tw`mt-4`}>
      <ScrollView contentContainerStyle={tw`pb-20`}>
        <Header showBackButton />
        <Text style={tw`mt-3 text-center font-bold text-2xl`}>Your Cart</Text>
        {cart.length === 0 && (
          <Text style={tw`text-center text-rose-500 mt-3 text-xl`}>
            No items to show
          </Text>
        )}
        <ScrollView contentContainerStyle={tw`px-2 flex-1 mt-4 gap-y-5`}>
          {cart.map((item, i) => {
            return <CartItem product={item} key={i} />;
          })}
        </ScrollView>
      </ScrollView>
      {cart.length > 0 && (
        <View
          style={tw`absolute w-full items-center bottom-0 h-20 justify-between flex-row px-4 bg-gray-200`}
        >
          <View>
            <Text style={tw`font-bold`}>TOTAL</Text>
            <Text style={tw`font-bold text-lg`}>₹ {totalAmount}</Text>
          </View>
          <TouchableOpacity
            style={tw`w-44 bg-blue-500 py-3 px-4 items-center justify-center rounded-xl`}
            onPress={() => {
              if (cart.length > 0) {
                if (Object.keys(user).length > 0) {
                  router.push("/checkout");
                } else {
                  router.push({
                    pathname: "/login",
                    params: { ref: "/checkout" },
                  });
                }
              } else {
                Alert.alert("Error", "Please add some items to the cart first");
              }
            }}
          >
            <Text style={tw`text-white text-lg font-bold`}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeView>
  );
};

export default Cart;
