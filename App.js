/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://www.raywenderlich.com/247-react-native-tutorial-building-android-apps-with-javascript
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
import SearchResults from './SearchResults';
import TableView from './TableView';

//component that represents the UI
type Props = {};
//configures searchpage component as first on stack
const App = createStackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Table: { screen: TableView },
});
export default App;
