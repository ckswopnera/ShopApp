import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native'
import React from 'react'
import StackScreen_Main from './StackScreen_Main';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useshopApp } from '../store/store';

export default function StackSide() {
    const Drawer = createDrawerNavigator();
    const updateSearchBar = useshopApp(state => state.updateSearchBar);
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
                options={{
                    headerTitle: 'Search',
                    headerRight: () => <Ionicons name='search' color='#fff' size={24}
                        onPress={() => updateSearchBar(true)}
                    />,
                    headerRightContainerStyle: { paddingRight: 8 }
                }}
            />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}