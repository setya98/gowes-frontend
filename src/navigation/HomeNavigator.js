import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProductContainer from "../screens/products/ProductContainer";
import ProductDetail from "../screens/products/ProductDetail"

const Stack = createStackNavigator()

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Product Container">
            <Stack.Screen
                name='Home'
                component={ProductContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product Detail'
                component={ProductDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
