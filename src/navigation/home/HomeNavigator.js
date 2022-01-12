import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProductContainer from "../../screens/products/ProductContainer";
import ProductDetail from "../../screens/products/ProductDetail"
import ChatNavigator from "../chat/ChatNavigator";
import SearchedProduct from "../../screens/products/SearchedProduct";

const Stack = createStackNavigator()

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Product Container">
            <Stack.Screen
                name='Product Container'
                component={ProductContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product Detail'
                component={ProductDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Chat'
                component={ChatNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Search Product'
                component={SearchedProduct}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
