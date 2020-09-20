import React from 'react';
import Expo from "expo";
// import {
//   Button,
//   Dimensions,
//   Platform, StyleSheet, Text, View
// } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';


import LandingPage from './Screens/LandingPage'
import LoginScreen from './Screens/LoginScreen'
import RoomScreen from './Screens/RoomScreen'
import HomeScreen from './Screens/HomeScreen'
import WatsonScreen from './Screens/WatsonScreen'
import VideoScreen from './Screens/VideoScreen'
import ThanksScreen from './Screens/ThanksScreen'
import LoadingScreen from './Screens/LoadingScreen'
// import VideosScreen from './Screens/VideosScreen'

import firebase from 'firebase'
import {firebaseConfig} from './firebase'
// firebase.initializeApp(firebaseConfig)

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F27405',
    accent: '#A63429',
    background: '#D94929',
    paper: '#F2F2F2',
    text: '#737373',
    disabled: '#333333',
    // primary2: '#D94929',
    // primary3: '#A63429',
    // offwhite: '#F2F2F2',
    // accent: '#737373',
  },

};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="LandingScreen" component={LandingPage} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RoomScreen" component={RoomScreen} />
          <Stack.Screen name="WatsonScreen" component={WatsonScreen} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
          <Stack.Screen name="ThanksScreen" component={ThanksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
};