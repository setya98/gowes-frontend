import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Buyer from "../../screens/user/buyer/Buyer";
import EditBuyer from "../../screens/user/buyer/EditBuyer";
import Seller from "../../screens/user/seller/Seller";
import EditSeller from "../../screens/user/seller/EditSeller";
import AddProduct from "../../screens/user/seller/AddProduct";
import ProductContainerSeller from "../../screens/user/seller/ProductContainerSeller"
import OrderList from "../../screens/user/seller/OrderList";
import EditProduct from "../../screens/user/seller/EditProduct";
import ProductReview from "../../screens/review/ProductReview";
import ProductReviewCard from "../../screens/review/ProductReviewCard";
import Order from "../../screens/order/Order";
import OrderSeller from "../../screens/order/OrderSeller";
import OrderDetail from "../../screens/order/OrderDetail";

const Stack = createStackNavigator()

export default function UserNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name='Buyer'
                component={Buyer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Seller'
                component={Seller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Buyer'
                component={EditBuyer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Seller'
                component={EditSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Add Product'
                component={AddProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product List'
                component={ProductContainerSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order List'
                component={OrderList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Product'
                component={EditProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Review Product'
                component={ProductReview}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name='Review Product Card'
                component={ProductReviewCard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order'
                component={Order}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order Seller'
                component={OrderSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order Detail'
                component={OrderDetail}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    )
}
