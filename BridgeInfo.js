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
    return str.toUpperCase();
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
        <View style={styles.title}>
          <Text style={styles.titletext}>{this.fixCase(params.bridge.roadname)}</Text>
        </View>
        <Text style={styles.bodytext}>Stream Crossed: {this.fixCase(params.bridge.stream)}</Text>
        <Text style={styles.bodytext}>Located at: [{params.bridge.xcord}, {params.bridge.ycord}]</Text>
        <Text style={styles.bodytext}>Bridge Overtopped by: {params.bridge.floodedby} ft</Text>
        <Text style={styles.bodytext}>Max Water Level: {params.bridge.maxwl} ft</Text>
        <Text style={styles.bodytext}>Bridge Elevation: {params.bridge.roadelev} ft</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  titletext: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodytext: {
    color: '#3d3d3d',
    paddingBottom: 5,
  }
});
