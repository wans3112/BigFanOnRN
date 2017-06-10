

import React, { Component } from 'react'
import { View, Text, StyleSheet, ListView, TouchableOpacity, Image } from 'react-native';
import NavigationItem from '../NavigationItem'
import { screen } from '../../common'

class MineController extends Component {

    state: {
      headerHeight:float,
      dataSource: ListView.DataSource,
      scrollOffsetY:float

    }

    constructor(props: Object) {
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
          headerHeight:200,
          scrollOffsetY:0,
          dataSource: ds.cloneWithRows([
       'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
     ]),

        }
    }

    static navigationOptions = ({navigation}) => {

      const { params } = navigation.state

      return {
       headerRight: (
           <NavigationItem
               icon={require('../../img/icon_news.png')}
               onPress={() => {
                 alert('消息')
               }}
           />
       ),
       headerLeft: (
           <NavigationItem
               iconStyle={{marginLeft:12}}
               icon={require('../../img/navi_icon_map.png')}
               onPress={() => {
                 alert('地图')
               }}
           />
       ),
       header:null
      }
    }

    componentDidMount() {

    }

     render () {
        return (
          <View style={styles.container}>
              <Image style={{position:'absolute', top:this.state.scrollOffsetY,width:screen.width, height:this.state.headerHeight}} source={require('../../img/icon_my_bg.png')}>
                {/* <Image source={require('../../img/venue_icon_member.png')} resizeMode='contain'/> */}
              </Image>
              <ListView
                 style={{backgroundColor:'#ffffff00'}}
                 ref = 'listView'
                 contentInset={{top:200}}
                 contentOffset={{y:-200}}
                 onScroll={(e) => this.onScroll(e)}
                //  renderHeader={this.renderHeader.bind(this)}
                 dataSource={this.state.dataSource}
                 renderRow={(rowData) =>this.renderRow(rowData) }
               />
          </View>
        )
      }

    renderRow(rowData:Object) {

      return (
        <Text>{rowData}</Text>
      )
    }

    renderHeader() {
      return (
        <Image style={{width:screen.width, height:this.state.headerHeight}} source={require('../../img/icon_my_bg.png')} resizeMode='contain'>
          {/* <Image source={require('../../img/venue_icon_member.png')} resizeMode='contain'/> */}
        </Image>
      )
    }

    onScroll(e: any) {
        let offsetY = e.nativeEvent.contentOffset.y;
       if(offsetY<-200){
         this.setState(
            {
              scrollOffsetY:0,
              headerHeight:-offsetY
            }
         )
         console.log('offset y :',offsetY,this.state.headerHeight)

        //  this.refs.listView.scrollTo({y:0})
      }else {
        this.setState(
           {
             scrollOffsetY:-(offsetY+200),
             headerHeight:200
           }
        )
      }
    }

    //
    // renderMemberView(isMember:boolean) {
    //   if ( isMember ) {
    //     return <View style={{marginLeft:15+75, marginTop:20, flexDirection: 'row'}}>
    //       <Image source={require('../../img/venue_icon_member.png')} resizeMode='contain'/>
    //       <Text style={[styles.text,{marginLeft:6}]}>一次充值2000元送200元</Text>
    //     </View>
    //   }
    //   return <View />
    // }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
  },
  text: {
      color: '#b5b4b9',
      fontSize: 12
  }

});

export default  MineController;
