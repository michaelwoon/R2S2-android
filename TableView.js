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


type Props = {};

export default class TableView extends Component<Props> {
  constructor(props){
    super(props);
    this.state = { isLoading: true};
    this.bridges = {};
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
        this.setState({
          // tableOptions: {
          //   loading: false,
          //   showPagination: true,
          //   showPageSizeOptions: true,
          //   showPageJump: true,
          //   collapseOnSortingChange: true,
          //   collapseOnPageChange: true,
          //   collapseOnDataChange: true,
          //   freezeWhenExpanded: false,
          //   filterable: true,
          //   sortable: true,
          //   resizable: true
          // },
          bridges: json
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  };

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
          fullData: responseJson.description,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  };

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
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
