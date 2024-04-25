import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import StackScreen_Main from './stacks/StackScreen_Main';
import LoginScreen from './screens/LoginScreen';
import StackSide from './stacks/StackSide';


const Stack = createStackNavigator();

function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertNotificationRoot
        theme="light"
      >
        <NavigationContainer>
          <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

            <StatusBar
              barStyle={'light-content'}
              // backgroundColor={'transparent'}
              backgroundColor={'#990099'}
              // translucent={true}
              StatusBarAnimation={'fade'}
            // hidden={true}
            />
             <Stack.Navigator
                  screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: { color: '#000', fontSize: 18 },
                    headerShown: false,
                  }}>
               <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                  />
                  <Stack.Screen name="MainStack" component={StackSide} />
                

                  </Stack.Navigator>
         
          </SafeAreaView>
        </NavigationContainer>


      </AlertNotificationRoot>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
