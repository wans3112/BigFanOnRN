/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, WebView } from 'react-native';
import { screen } from '../../common'
import { StackNavigator } from 'react-navigation';

// create a component
class WWebViewController extends Component {

  // getInitialState() {
  //     return {list: ['xxx', 'yyy']};
  // }

  constructor(props: Object) {
      super(props)
    //  this.state = { info: props.navigation.state.params.info };
      console.log("webview >>", this)
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params.info.title,
    }
  }

  render() {
    let url = this.props.navigation.state.params.info.url
    console.log("url >>", url)
      return (
        <View style={styles.container}>
          <WebView
            // style={{backgroundColor:'blue'}}
            source={{uri:url, method: 'GET'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={false}
            />
       </View>
      );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
    }
});

//make this component available to the app
export default WWebViewController;
