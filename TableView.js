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
  TouchableHighlight,
} from 'react-native';
import base64 from "react-native-base64";

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item,this.props.index);
  }

  fixCase(str){
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  floodingColor(waterLevel){
    if (waterLevel > 0) {
      return '#ff8787';
    }
    else if (waterLevel < 0 && waterLevel > -0.3) {
      return '#fdffa0';
    }
    else {
      return '';
    }
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}
            backgroundColor = {this.floodingColor(item.floodedby)}
            >
              <Text style={styles.road}>{this.fixCase(item.roadname)}</Text>
              <Text style={styles.title}
                numberOfLines={1}>{this.fixCase(item.stream)}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}



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

    const { params } = this.props.navigation.state;
    console.log("date: " + params.date);
    fetch("http://35.194.88.251/api/bridges/" + params.date, {
      method: "GET",
      headers: headers
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        console.log("data received");
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

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (item,index) => {
    console.log("Pressed row: "+index);
    this.props.navigation.navigate('Info', {bridge: item});
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={this.state.bridges}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  road: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3d3d3d'
  },
  title: {
    fontSize: 20,
    color: '#3d3d3d'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});
