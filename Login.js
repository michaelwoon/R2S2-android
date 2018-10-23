'use strict';

import React, { Component } from "react";
import PropTypes from "prop-types";
//import { LinkContainer } from "react-router-bootstrap";
import base64 from "react-native-base64";
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

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.string
  };

  constructor(props) {
    super(props);
    //this.loginFunc = this.loginFunc.bind(this);
    this.state = {
      isLoading : true,
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  componentDidMount() {
    //e.preventDefault();
    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " +
        base64.encode(
          "mohamedmorsyanwar@gmail.com" + ":" + "password"
        )
    );

    fetch("/api/login", {
      method: "GET",
      headers: headers
    })
      .then(
        function(response) {
          if (response.status == 200) {
            console.log('GET call passed')
            response.json().then(
              function(data) {
                this.setState({
                  isLoading: false,
                });
                this.props.login({
                  token: data.token
                });
              }.bind(this)
            );
          } else {
            this.setState({
              isLoading: false,
            });
            this.props.login({
              token: 'GET call did not return token'
            });
          }
        }.bind(this)
      )
      .catch(function(ex) {
        console.log('GET call failed')
        console.log(ex);
      });
  }

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
        {this.props.login.token}
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
