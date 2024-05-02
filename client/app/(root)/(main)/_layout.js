import { Tabs, router } from "expo-router";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";

const MainLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
            title: "Home",
          }}
          name="home"
        />
        <Tabs.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            title: "Profile",
          }}
          name="profile"
        />
      </Tabs>

      <View style={tw`bg-transparent absolute bottom-5 w-full items-center`}>
        <TouchableOpacity
          style={tw`bg-blue-500 w-12 h-12 rounded-full p-1 items-center justify-center`}
          onPress={() => router.push("/cart")}
        >
          <FontAwesome name="shopping-cart" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </>
  );
};

export default MainLayout;
