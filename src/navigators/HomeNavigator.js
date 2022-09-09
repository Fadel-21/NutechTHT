import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductScreen from "../screens/ProductScreen/ProductScreen";
import SingleProduct from "../screens/ProductScreen/SingleProduct";

const Stack = createNativeStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={ProductScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Product Detail'
                component={SingleProduct}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack/>
}