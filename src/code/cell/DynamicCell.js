/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

// import { screen, system, tool } from '../../common'
import { screen } from '../../common'
import { CachedImage } from "react-native-img-cache";

// create a component
class DynamicCell extends Component {

    state: {
      color: Array<string>
    }
    constructor(props: Object) {
        super(props)

        const co = '#ed4d4d00'
        let colorStates = []
        let object = this.props.dynamic[0]
        for (var variable in object) {
          if (object.hasOwnProperty(variable)) {
            colorStates.push(co)
          }
        }
        this.state = {
           color:colorStates
        }
    }
    render() {

      let dynamics = this.props.dynamic[0];

      let topticImages = dynamics.map(
        (model, i) => (
          <TouchableOpacity key = {i} activeOpacity = {1} style={styles.subContainer} onPress={()=>{this.didselected(model)}} >
            <View key = {i} style={styles.subContentContainer}>
              <CachedImage source = {{uri: model.imageUrl}} style={styles.icon} />
              <Text style={styles.text} numberOfLines={2}>
                 {/* <TouchableWithoutFeedback onPressIn={() => {this.didselectedDisplayForTopic(true, i)}} */}
                   {/* onPressOut={() => {  this.didselectedDisplayForTopic(false, i)}}
                   onPress={()=>{this.didselectedForTopic(model.title)}}> */}
                   <Text style={{backgroundColor:this.state.color[i], margin:4, borderRadius:4}} >{model.title.length > 0 ? '#'+model.title+'#':''}</Text>
                 {/* </TouchableWithoutFeedback> */}
                 <Text style={{color:'#2b2d37'}} >{model.content}</Text>
              </Text>
              <View style={{flexDirection: 'row',flex: 1,marginTop:5}}>
                 <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.didselectedForComment(model.commitcount)}}>
                   <Image source = {require('../../../src/img/icon_talk.png')} />
                   <Text style={styles.textlite} numberOfLines={1} > {model.commitcount} </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}} onPress={()=>{this.didselectedForLike(model.likecount)}} >
                   <Image source = {require('../../../src/img/icon_like.png')} />
                   <Text style={styles.textlite} numberOfLines={1} > {model.likecount} </Text>
                 </TouchableOpacity>
              </View>
            </View>
         </TouchableOpacity>
        )
      )
      let topticViews = []
      for (let i = 0; i < dynamics.length; i++) {
          let items = topticImages[i];
          topticViews.push(items)
      }

      let lineCount = Math.ceil(dynamics.length / 2)
        return (
          <View style={[styles.mainContainer, {height: 250 * lineCount}]}>
              {topticViews}
          </View>
        );
    }

    didselected(rowData:Object) {
      alert(rowData.content)
    }

    didselectedForLike(count:number) {
      alert('喜欢人数:' + count)
    }

    didselectedForComment(count:number) {
      alert('评论人数:' + count)
    }

    didselectedForTopic(rowData:Object) {
      alert(rowData)
    }

    didselectedDisplayForTopic(isOnPressIn:boolean,i:number) {
      let data =  this.state.color
      data[i] = isOnPressIn ? '#ed4d4d7d' : '#ed4d4d00'
      this.setState({color: data})
    }
}

// define your styles
const styles = StyleSheet.create({
    icon: {
        // height: screen.width * 2 / 5,
        justifyContent: 'center',
        height: 170
    },
    mainContainer: {
        flexDirection: 'row',
        width: screen.width,
        // height: screen.width * 3 * 4 / 5,
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    subContainer: {
      width: screen.width / 2,
      height: 250,
    },
    subContentContainer: {
      flex:1,
      // backgroundColor: '#00000040',
      margin: 5,
    },
    text: {
      color: 'red',
      // backgroundColor: '#00000040',
      fontSize: 14,
      marginTop: 5,
      marginBottom: 5,
      height:35
    },
    textlite: {
      color: '#737980',
      fontSize: 13,
      // marginTop: 5,
      // marginBottom: 5,
    },
    iconlite: {
        // height: screen.width * 2 / 5,
        justifyContent: 'center'
    },
});

//make this component available to the app
export default DynamicCell;
