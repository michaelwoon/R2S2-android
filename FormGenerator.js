import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import base64 from "react-native-base64";

const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
];
export default class FormGenerator extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    global.token = '';
  };

  login() {
    const formValues = this.formGenerator.getValues();
    //set props with username and pass (hardcoded for now)
    // const username = formValues.user_name; //works
    // const pass = formValues.password;
    const username = 'mohamedmorsyanwar@gmail.com';
    const pass = 'password';

    let headers = new Headers()

    headers.append(
    "Authorization",
    "Basic " +
    base64.encode(
      username.toLowerCase() + ":" + pass
        )
    );

    fetch("https://vfis-beta.uvahydroinformatics.org/api/login", {
      method: "GET",
      headers: headers
    })
      .then(
        function(response) {
          if (response.status == 200) {
            response.json().then(
              function(data) {
                Alert.alert(
                  'Login Successful!'
                );
                global.token = data.token;
                console.log(global.token);
              }.bind(this)
            );
          } else {
            Alert.alert(
              'Invalid username or password'
            );
          }
        }.bind(this)
      )
      .catch(function(ex) {
        console.log('CATCH',ex);
      });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={styles.submitButton}>
          <Button block onPress={() => this.login()}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);
