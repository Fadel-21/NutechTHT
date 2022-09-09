import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from '../screens/CartScreen/CartScreen';
import CheckoutNavigator from './CheckoutNavigator';
import Checkout from '../screens/CartScreen/Checkout/Checkout';

const Stack = createNativeStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Checkout'
                component={CheckoutNavigator}
                options={{
                    title: 'Checkout'
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack/>
}