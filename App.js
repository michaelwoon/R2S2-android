/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//strict mode has better error handling
 'use strict';

//libraries
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';


//variable based on platform (no longer needed)
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//component that represents the UI
type Props = {};
//configures searchpage component as first on stack
const App = createStackNavigator({
  Home: { screen: SearchPage },
});
export default App;
//style object
const styles = StyleSheet.create({

});
