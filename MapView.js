'use strict';

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import base64 from "react-native-base64";

MapboxGL.setAccessToken("pk.eyJ1IjoidXZhaHlkcm9pbmZvcm1hdGljc2xhYiIsImEiOiJjamI5bXRqanowbTM4MnFwczN3emNjYW9oIn0.mejJdMMfKWw7xn0i5K6c2Q");

const baseCoordinates = [
  -77.2786997, 36.906495
];

export default class MapView extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      bridges: [],
    };
  };

  static navigationOptions = {
    title: 'Map',
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


  componentDidMount(){
    this.loadBridges();
  };

  selectPoint(item) {
    console.log("selected " + item);
    this.props.navigation.navigate('Info', {bridge: item});
  };

  makePoint(item, id, title, coordinates) {
    return (
      <MapboxGL.PointAnnotation
        id={id}
        title={title}
        coordinate={coordinates}
        onSelected={this.selectPoint(item)}>
      </MapboxGL.PointAnnotation>
    );
  };

  showPoints() {
    let items = [];
    for (let i = 0; i < this.state.bridges.length; i++) {
      let item = this.state.bridges[i];
      let id = this.state.bridges[i].fedid;
      let title = "Road: " + this.state.bridges[i].roadname + " Stream: " + this.state.bridges[i].stream;
      let coordinates = [parseFloat(this.state.bridges[i].xcord),parseFloat(this.state.bridges[i].ycord)];
      items.push(this.makePoint(item,id,title,coordinates));
    }
    return items;
  };

  render () {
    console.log(this.state.bridges.length);
    if(this.state.bridges.length == 0) {
      return <View></View>
    }
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          zoomLevel={9}
          centerCoordinate={baseCoordinates}>
          <MapboxGL.PointAnnotation
            key="key1"
            id="id1"
            title="Test"
            coordinate={baseCoordinates}>
          </MapboxGL.PointAnnotation>
          {this.showPoints()}
        </MapboxGL.MapView>
      </View>
      );
  }
}
