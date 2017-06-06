/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// import color from './color'

// create a component
class TitleBar extends Component {

  constructor(props: Object) {
      super(props)
  }

  render() {
    let navi = this.props.navi
      return (
          <View style={styles.container}>
            <Text style={styles.text}> {this.props.title} </Text>
            <TouchableOpacity style={styles.press} onPress={()=>{
              navi.navigate('TopicList',{title:this.props.title,callBack:(data)=>{
                console.log('上级页面返回的数据:',data)
              }})  }}>
              <Text style={styles.moretext}> 更多 </Text>
              <Image source={require('../../../src/img/icon_arrow_right_small_gray.png')} resizeMode='contain' style={styles.icon} />
            </TouchableOpacity>
          </View>
      );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
      color: '#2b2d37',
      fontSize: 13,
      textAlign: 'center',
      alignSelf: 'center',
    },
    moretext: {
      color: '#737980',
      fontSize: 12,
      textAlign: 'center',
      alignSelf: 'center',
      marginRight: 6,
    },
    icon: {
        width: 6,
        height: 12,
        marginRight: 8,
        alignSelf: 'center'
    },
    press: {
      justifyContent:'flex-end',
      flexDirection: 'row'
    }
});

//make this component available to the app
export default TitleBar;
