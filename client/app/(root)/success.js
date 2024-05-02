import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import SafeView from "../../components/SafeView";
import tw from "twrnc";
import { getContext } from "../../providers/ContextProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Success = () => {
  const { totalAmount, setCart } = getContext();
  const { orderId } = useLocalSearchParams();

  const handleBack = () => {
    setCart([]);
    router.replace("/home");
  };

  const { isLoading } = useQuery({
    queryKey: ["update-payment-status"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/update-payment-status`,
        { orderId }
      );
      return data;
    },
  });
  return (
    <SafeView>
      {isLoading ? (
        <ActivityIndicator size={40} style={tw`mt-6`} />
      ) : (
        <>
          <View style={tw`mt-10 items-center`}>
            <Image
              source={{
                uri: "https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif",
              }}
              style={tw`w-40 h-40`}
            />
          </View>

          <View style={tw`mt-10 gap-y-3 items-center`}>
            <Text style={tw`text-3xl text-green-700 font-bold`}>
              Payment Successful
            </Text>
            <Text style={tw`text-base font-medium`}>
              Thank you for shopping with us!!
            </Text>
          </View>
          <View style={tw`bg-gray-300 h-[1.5px] w-full mt-10`} />

          <View style={tw`flex-row items-center justify-center mt-10 gap-x-2`}>
            <Text style={tw`text-blue-600 text-base font-bold`}>
              Total Amount:
            </Text>
            <Text style={tw`text-blue-600 text-base font-bold`}>
              ₹ {totalAmount}
            </Text>
          </View>

          <View style={tw`mt-10 items-center`}>
            <TouchableOpacity
              style={tw`w-[45%] bg-blue-500 py-3 px-4 rounded-full items-center justify-center`}
              onPress={handleBack}
            >
              <Text style={tw`text-white text-base font-semibold`}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeView>
  );
};

export default Success;
