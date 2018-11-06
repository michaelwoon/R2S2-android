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

export default class TableView extends Component<Props> {
  constructor(props){
    super(props);
    this.state = { isLoading: true};
    this.bridges = [];
  };
  static navigationOptions = {
    title: 'Table',
  };

  loadBridges(){
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + base64.encode(global.token + ":x")
    );

    fetch("https://vfis-beta.uvahydroinformatics.org/api/bridges", {
      method: "GET",
      headers: headers
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        console.log("data received"); //makes it here
        this.setState({
          isLoading: false,
          bridges: json,
        });
      })
      .catch(function(ex) {
        console.log("parsing failed or no token", ex);
      });
  };

  fixCase(str){
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  componentDidMount(){
    this.loadBridges();
  };


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return ( //add function to make it not all uppercase
      <View style={styles.container}>
        <FlatList
          data={this.state.bridges}
          renderItem =
          {({item}) => (
            <ListItem
            title = {this.fixCase(item.roadname)}
            subtitle = {this.fixCase(item.stream)}
            />
          )}
          keyExtractor={item => item.fedid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
});
