'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';


type Props = {};
export default class TableView extends Component<Props> {
  static navigationOptions = {
    title: 'Table',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          filler for table data
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
});
