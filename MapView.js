'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoidXZhaHlkcm9pbmZvcm1hdGljc2xhYiIsImEiOiJjamI5bXRqanowbTM4MnFwczN3emNjYW9oIn0.mejJdMMfKWw7xn0i5K6c2Q");

const baseCoordinates = [
  -77.2786997, 36.906495
];

export default class MapView extends Component<{}> {
  static navigationOptions = {
    title: 'Map',
  };

  render () {
    return (
      <View style={{flex: 1}}>
          <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          zoomLevel={8}
          centerCoordinate={baseCoordinates}>
        </MapboxGL.MapView>
      </View>
      );
  }
}
