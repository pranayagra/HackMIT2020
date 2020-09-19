import * as React from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
// // You can import from local files
// // or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
// import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  Platform, StyleSheet, Text, View
} from 'react-native';
//import CryptoJS to generate a secure token to connect with the Temasys Platform
// import CryptoJS from 'crypto-js';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Screens/Login'
import LoginWGoogle from './Screens/LoginWithGoogle'
import LoginWFB from './Screens/LoginWithFacebook'
import SignIn from './Screens/SignIn'
import Guest from './Screens/Guest'
// import HomeScreen from './Screens/HomeScreen'
// import VideosScreen from './Screens/VideosScreen'
// import WatsonScreen from './Screens/WatsonScreen'
// import RoomsScreen from './Screens/RoomsScreen'
//import the Skylink react SDK
// import { Skylink } from './skylink_react_complete';

// const skylink = new Skylink();

const LoginNavigator = createBottomTabNavigator({
  Login: { screen: Login },
  "Sign in": { screen: SignIn },
  "Login With Google": { screen: LoginWGoogle },
  "Login With Facebook": { screen: LoginWFB },
  Guest: { screen: Guest },
})

const HomeStack = createStackNavigator({
  Login: { screen: LoginNavigator },
  // Home: { screen: HomeScreen },
  // Videos: { screen: VideosScreen },
  // Chat: { screen: WatsonScreen },
  // Rooms: { screen: RoomsScreen },
},

  {
    headerMode: 'float',
    initialRouteName: 'Login',
  })

const AppContainer = createAppContainer(HomeStack);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
