'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

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
            backgroundColor = {this.floodingColor(item.floodedby)}>
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
export default class SearchResults extends Component<Props> {
  static navigationOptions = {
    title: 'Results',
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
        data={params.bridges}
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
    padding: 10
  },
});
