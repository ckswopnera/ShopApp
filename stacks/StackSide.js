import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native'
import React from 'react'
import StackScreen_Main from './StackScreen_Main';
import ProfileScreen from '../screens/ProfileScreen';

export default function StackSide() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: '#990099',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',

            },
           
            drawerActiveBackgroundColor: '#990099',
            drawerActiveTintColor: '#fff',
            // drawerInactiveBackgroundColor: '#000',
            drawerInactiveTintColor: '#000',

        }}>
            <Drawer.Screen name="Main" component={StackScreen_Main}
                options={{ headerTitle: 'Search' }}
            />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}