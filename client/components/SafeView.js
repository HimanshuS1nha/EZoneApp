import { Platform, SafeAreaView, StatusBar } from "react-native";
import React from "react";

const SafeView = ({ children, style }) => {
  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "",
          flex: 1,
          backgroundColor: "#ffffff",
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
