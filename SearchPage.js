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
  Alert,
  Picker,
} from 'react-native';
import base64 from "react-native-base64";
import { CheckBox } from 'react-native-elements';


type Props = {};
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
        if(data[i].floodedby > 0 && this.state.floodExpected) {
          newdata.push(data[i]);
        }
        else if(data[i].floodedby < 0 && data[i].floodedby > -0.3 && this.state.floodPossible) {
          newdata.push(data[i]);
        }
        else if(data[i].floodedby < -0.3 && this.state.noFlood) {
          newdata.push(data[i]);
        }
      }
    }
    return newdata;
  };
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
    // console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
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

   fetch("http://35.194.88.251/api/bridges/" + this.state.selectedDate, {
     method: "GET",
     headers: headers
   })
    .then(response => response.json())
    .then(json => this._handleResponse(json))
     .then(function(response) {
       return response.json();
     })
     .then(json => {
       console.log("data received");
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
      this.setState({ message: 'No results found'});
      Alert.alert('No results found');
    }
  };

  logout(){
    this.props.navigation.navigate('Form');
    global.token = '';
  }

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
      selectedDate: "20181011-230000",
      noFlood: true,
      floodPossible: true,
      floodExpected: true,
    };
  }
  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={styles.buttons}>
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
            navigate('Table',{
              date: this.state.selectedDate,
              noFlood: this.state.noFlood,
              floodPossible: this.state.floodPossible,
              floodExpected: this.state.floodExpected
            })
          } />
      </View>
      <View style={styles.wrapper}>
        <Button
          title="Map"
          onPress={() =>
            navigate('Map',{
              date: this.state.selectedDate,
              noFlood: this.state.noFlood,
              floodPossible: this.state.floodPossible,
              floodExpected: this.state.floodExpected
            })
          } />
      </View>
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
        <Picker
          selectedValue={this.state.selectedDate}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedDate: itemValue})}
          prompt="Select a date">
          <Picker.Item label="20181011-230000" value="20181011-230000" />
          <Picker.Item label="20180917-190000" value="20180917-190000" />
        </Picker>
        <CheckBox
          title='No flooding expected'
          checked={this.state.noFlood}
          onPress={() => this.setState({noFlood: !this.state.noFlood})}
        />
        <CheckBox
          title='Floodng possible'
          checked={this.state.floodPossible}
          onPress={() => this.setState({floodPossible: !this.state.floodPossible})}
        />
        <CheckBox
          title='Flooding expected'
          checked={this.state.floodExpected}
          onPress={() => this.setState({floodExpected: !this.state.floodExpected})}
        />
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
    marginTop : 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
});
