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
import Login from './Login';
import FormGenerator from './FormGenerator'
import BridgeInfo from './BridgeInfo'
import MapView from './MapView'

//component that represents the UI
type Props = {};
//configures searchpage component as first on stack
const App = createStackNavigator({
  Form: { screen: FormGenerator },
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Table: { screen: TableView },
  Login: { screen: Login },
  Info: { screen: BridgeInfo},
  Map: { screen: MapView},
});
export default App;
