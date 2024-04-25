import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import ProductSearch from '../screens/ProductSearch';
import EditScreen from '../screens/EditScreen';


const Stack = createStackNavigator();
export default function StackScreen_Main() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#000', fontSize: 18 },
                  headerShown: false,
            }}>
                <Stack.Screen
                name="Search"
                component={ProductSearch}
            //   options={{headerShown: false}}
            />
            <Stack.Screen
                name="Details"
                component={ProductDetails}
            //   options={{headerShown: false}}
            />
             <Stack.Screen
                name="Edit"
                component={EditScreen}
            //   options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}