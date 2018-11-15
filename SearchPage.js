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
import base64 from "react-native-base64";

type Props = {};
function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;
  //transforms data into name-value pairs
  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}
export default class SearchPage extends Component<Props> {
  static navigationOptions = {
    title: 'Flood Warning',
  };
  //defines function
  filterJson(data,searchstr){
    var newdata = [];
    searchstr = searchstr.toLowerCase();
    for(var i = 0; i < data.length; i++) {
      if(data[i].stream.toLowerCase().includes(searchstr) || data[i].roadname.toLowerCase().includes(searchstr)){
        newdata.push(data[i]);
      }
    }
    return newdata;
  };
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
  };
  //for bridge search: get all bridges, filter by the string
  //check both stream name and roadname (compare in lower case)
  //if no responses then say to try again
  _executeQuery = (query) => {
    console.log(query);
   //  this.setState({ isLoading: true });
   //  fetch(query)
   //  .then(response => response.json())
   //  .then(json => this._handleResponse(json.response))
   //  .catch(error =>
   //   this.setState({
   //    isLoading: false,
   //    message: 'Something bad happened ' + error
   // }));
   let headers = new Headers();

   headers.append(
     "Authorization",
     "Basic " + base64.encode(global.token + ":x")
   );

   fetch("https://vfis-beta.uvahydroinformatics.org/api/bridges", {
     method: "GET",
     headers: headers
   })
    .then(response => response.json())
    .then(json => this._handleResponse(json))
     .then(function(response) {
       return response.json();
     })
     .then(json => {
       console.log("data received"); //makes it here
       this.setState({
         isLoading: false,
         // bridges: json,
       });
     })
     .catch(function(ex) {
       console.log("parsing failed or no token", ex);
     });

  };
  _onSearchPressed = () => {
    const query = this.state.searchString;
    this._executeQuery(query);
  };
  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    var filteredResponse = this.filterJson(response,this.state.searchString)
    if (filteredResponse.length > 0) {
      this.props.navigation.navigate(
        'Results', {bridges: filteredResponse});
    } else {
      console.log('filteredResponse len == 0');
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  };

  logout(){
    this.props.navigation.navigate('Form');
    global.token = '';
  }

  //gives component a state, intial value
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
    };
  }
  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={styles.wrapper}>
        <Button
          title="Log out"
          onPress={() =>
            this.logout()
          } />
      </View>
      <View style={styles.wrapper}>
        <Button
          title="View all bridges"
          onPress={() =>
            navigate('Table')
          } />
      </View>
        <Text style={styles.description}>
          Search by stream or road name
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Type here!'/>
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Go'
          />
        </View>
        <Image source={require('./Resources/bridge.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 20,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
  wrapper: {
    marginTop : 10,
    marginBottom: 10,
  },
});
