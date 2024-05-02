import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "../providers/ContextProvider";
import { StripeProvider } from "@stripe/stripe-react-native";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        >
          <ContextProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ContextProvider>
        </StripeProvider>
      </QueryClientProvider>
      <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />
    </>
  );
};

export default RootLayout;
