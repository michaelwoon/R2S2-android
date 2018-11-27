'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import base64 from "react-native-base64";


type Props = {};

export default class BridgeInfo extends Component<Props> {
  constructor(props){
    super(props);
  //  this.state = { isLoading: true};
  };
  static navigationOptions = {
    title: 'Bridge Info',
  };


  fixCase(str){
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  componentDidMount(){
  };


  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator/>
    //     </View>
    //   )
    // }
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>Road name: {params.bridge.roadname}</Text>
        <Text>Stream: {params.bridge.stream}</Text>
        <Text>Xcord: {params.bridge.xcord}</Text>
        <Text>Ycord: {params.bridge.ycord}</Text>
        <Text>Elevation: {params.bridge.roadelev}</Text>
        <Text>ID: {params.bridge.fedid}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
