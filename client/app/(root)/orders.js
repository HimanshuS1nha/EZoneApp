import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getContext } from "../../providers/ContextProvider";
import tw from "twrnc";
import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";

const Orders = () => {
  const { user } = getContext();

  const { data, isLoading } = useQuery({
    queryKey: ["get-orders"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/get-orders`,
        { email: user.email }
      );
      return data;
    },
  });
  return (
    <SafeView>
      {isLoading ? (
        <ActivityIndicator size={40} style={tw`mt-6`} />
      ) : (
        <View style={tw`flex-1`}>
          <Header showBackButton />
          <Text style={tw`mt-3 text-center font-bold text-2xl`}>My Orders</Text>

          <View style={tw`px-4 gap-y-5 mt-7`}>
            {data?.orders?.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })}
          </View>
        </View>
      )}
    </SafeView>
  );
};

export default Orders;
