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
class TopticCell extends Component {

    constructor(props: Object) {
        super(props)
    }

    render() {

      let toptics = this.props.toptics[0]
      // console.log('toptics---->>', toptics)

      let topticImages = toptics.map(
        (toptic, i) => (
          <TouchableOpacity key = {i} activeOpacity = {1}  onPress={()=>{this.didselected(toptic)}} >
            <Image source = {{uri: toptic.imageUrl}} style={styles.icon} >
              <View style={styles.shadow} >
                <Text style={styles.text} numberOfLines={1} > {toptic.title} </Text>
                <Text style={styles.textsmall} numberOfLines={1} > / </Text>
                <Text style={styles.textsmall} numberOfLines={1} > {toptic.count + '参与'} </Text>
              </View>
            </Image>
         </TouchableOpacity>
        )
      )
      let topticViews = []
      for (let i = 0; i < toptics.length; i++) {
          let items = topticImages[i];
          topticViews.push(items)
      }
        return (
          <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // onScroll={(e) => this.onScroll(e)}
          >
              <View style={styles.topicContainer}>
                  {topticViews}
              </View>
          </ScrollView>
        </View>

        );
    }

    didselected(rowData:Object) {
      alert(rowData.title)
    }

}



// define your styles
const styles = StyleSheet.create({
    icon: {
        width: 160,
        height: 85,
        margin: 5,
        justifyContent: 'center'
    },
    topicContainer: {
        flexDirection: 'row',
        // width: 5 * 160,
        height: 85,
        flexWrap: 'wrap',
    },
    mainContainer: {
      height : 100,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    contentContainer: {
      // width: screen.width,
      height: 95,
      // marginTop: 14,
      backgroundColor: 'white'
    },
    text: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    textsmall: {
      color: 'white',
      fontSize: 12,
      textAlign: 'center',
      marginTop: 3
    },
    shadow: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    spacing: {
      height: 14,
      backgroundColor: '#f6f6f6',
    }
});

//make this component available to the app
export default TopticCell;
