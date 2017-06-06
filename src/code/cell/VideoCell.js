/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// import { screen, system, tool } from '../../common'
import { screen } from '../../common'

// create a component
class VideoCell extends Component {

    constructor(props: Object) {
        super(props)
    }

    render() {

      let video = this.props.video
      // console.log('video---->>', video)

      let labelNames = video.labels.map(
        (name, i) => (
          <View key={i} style={styles.labelContainer}>
             <Text style={styles.label} numberOfLines={1} > {name} </Text>
          </View>
        )
      )
      let labels = []
      for (let i = 0; i < labelNames.length; i++) {
          let items = labelNames[i];
          labels.push(items)
      }

      return (
          <TouchableOpacity style={[styles.contentContainer, {height:screen.width*9/16}]} activeOpacity = {1}  onPress={()=>{this.didselected(video)}} >
            <Image source = {{uri: video.imageUrl}} style={styles.icon} >
              <View style={styles.shadow} >
                <View style={{flex:10, justifyContent: 'center'}}>
                  <Text style={styles.text} numberOfLines={1} > {video.title} </Text>
                  <View style={{flexDirection:'row', justifyContent: 'center',width:screen.width,marginTop:10}}>
                    {labels}
                  </View>
                </View>
                <Text style={styles.textsmall} numberOfLines={1} > {video.duration>60?(parseInt(video.duration/60)+':'+video.duration%60):('00:'+video.duration)} </Text>
              </View>
            </Image>
         </TouchableOpacity>
      );
    }

    didselected(rowData:Object) {
      alert(rowData.title)
    }

}

// define your styles
const styles = StyleSheet.create({
    icon: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
      padding: 5,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    text: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      marginRight: 20,
      marginLeft:20
    },
    textsmall: {
      color: 'white',
      fontSize: 12,
      textAlign: 'right',
      alignSelf: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      paddingBottom: 4,
      flex: 1
    },
    labelContainer: {
      marginLeft: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      paddingBottom: 3,
      borderRadius: 8
    },
    label: {
      color: 'white',
      fontSize: 12,

    },
    shadow: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    spacing: {
      height: 14,
      backgroundColor: '#f6f6f6',
    }
});

//make this component available to the app
export default VideoCell;
