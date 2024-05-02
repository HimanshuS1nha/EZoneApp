import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const OrderCard = ({ order }) => {
  return (
    <View style={tw`w-full bg-white shadow-xl rounded-lg p-4 gap-y-2`}>
      <View style={tw`flex-row gap-x-2 items-center`}>
        <Text style={tw`text-base`}>Order Id:</Text>
        <Text style={tw`font-medium text-base text-blue-600`}>{order._id}</Text>
      </View>
      <View style={tw`flex-row gap-x-2 items-center`}>
        <Text style={tw`text-base`}>Number of items:</Text>
        <Text style={tw`font-medium text-base text-blue-600`}>
          {order.products.length}
        </Text>
      </View>
      <View style={tw`flex-row gap-x-2 items-center`}>
        <Text style={tw`text-base`}>Address:</Text>
        <Text style={tw`font-medium text-base text-blue-600`}>
          {order.address}
        </Text>
      </View>
      <View style={tw`flex-row gap-x-2 items-center`}>
        <Text style={tw`text-base`}>Total Amount:</Text>
        <Text style={tw`font-medium text-base text-blue-600`}>
          ₹ {order.amount}
        </Text>
      </View>
      <View style={tw`flex-row gap-x-2 items-center`}>
        <Text style={tw`text-base`}>Payment Status:</Text>
        <Text
          style={tw`font-medium text-base capitalize ${
            order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
          }`}
        >
          {order.paymentStatus}
        </Text>
      </View>

      <View style={tw`absolute bottom-3 right-3`}>
        <Image
          source={{ uri: order.products[0].images[0] }}
          style={tw`w-24 h-24`}
        />
      </View>
    </View>
  );
};

export default OrderCard;
