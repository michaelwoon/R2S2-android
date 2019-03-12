'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import base64 from "react-native-base64";
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoidXZhaHlkcm9pbmZvcm1hdGljc2xhYiIsImEiOiJjamI5bXRqanowbTM4MnFwczN3emNjYW9oIn0.mejJdMMfKWw7xn0i5K6c2Q");

const columbusCircleCoordinates = [
  -73.98197650909422, 40.768793007758816
];

type Props = {};

export default class MapView extends Component<Props> {

  constructor(props){
    super(props);
  };
  static navigationOptions = {
    title: 'Map',
  };

  componentDidMount(){
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          zoomLevel={15}
          centerCoordinate={columbusCircleCoordinates}>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
