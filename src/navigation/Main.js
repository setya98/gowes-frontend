import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, StyleSheet, Dimensions, Animated } from "react-native";
import { useRef } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import WishlistNavigator from "./WishlistNavigator";
import UserNavigator from "./user/UserNavigator";

import CartIcon from "../component/CartIcon";

const Tab = createBottomTabNavigator();

export default function Main({ navigation }) {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="MainTab"
          screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            bottom: 25,
            position: "absolute",
            marginHorizontal: 20,
            paddingHorizontal: 5,
            height: 65,
            elevation: 5,
            borderRadius: 20,
            shadowColor: "#737575",
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            shadowOffset: {
              width: 0,
              height: 10,
            },
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
            
                <Image
                  source={require("../assets/homepage.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          }} 
        />
        <Tab.Screen
          name="Cart"
          component={CartNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/bag.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
              <CartIcon />
              </View>
            ),
          }} 
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Image
                  source={require("../assets/heart.png")}
                  resizeMode="contain"
                  style={{
                    width: 23,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          }} 
        />
        <Tab.Screen
          name="Profile"
          component={UserNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Image
                  source={require("../assets/user.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          }} 
        />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}

