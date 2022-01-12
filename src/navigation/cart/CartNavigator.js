import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Cart from "../../screens/cart/Cart";
import Checkout from "../../screens/cart/Checkout";

const Stack = createStackNavigator()

export default function CartNavigator({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name='Cart'
                component={Cart}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Checkout'
                component={Checkout}
                options={{ title : "", headerShown: false }}
            />
        </Stack.Navigator>
    )
}
