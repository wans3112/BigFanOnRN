/**
 * Copyright (c) 2017-present, wans
 * All rights reserved.
 *
 * @flow
 */

 import React, { Component } from 'react';
 import { View, Text, StyleSheet, ListView, TouchableOpacity, ScrollView, Image } from 'react-native';

 import NavigationItem from '../NavigationItem'
 import RefreshListView from '../widget/RefreshListView'
 import RefreshState from '../widget/RefreshState'
 import BlankView from '../widget/BlankView'
 import api from '../api'

 import { screen } from '../../common'

 import { CachedImage } from "react-native-img-cache";
 import WSorage from '../../sorage/WSorage'

 class StadiumController extends Component {

   state: {
       page: number,
       dataList:Array<Object>,
       dataSource: ListView.DataSource,
   }

   constructor(props: Object) {
       super(props)

       WSorage._getStorage();

       let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

       this.state = {
           page: 0,
           dataList: [],
           dataSource: ds.cloneWithRows([]),
       }
   }

   static navigationOptions = ({navigation}) => {

     const { params } = navigation.state

     return {
      //  title: params.title,
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
     }
   }

   componentDidMount() {
       this.refs.listView.startHeaderRefreshing()

       WSorage._load('staduimlist', (json) => {
         console.log("缓存 staduimlist >> ",json)
         this.doFetchData(json, true, 0)
       })
   }

  render () {
     return (
       <View style={styles.container}>
           <View style={{flexDirection:'row',height:50,backgroundColor:'white'}}>
             {this.renderHeader()}
           </View>
           <BlankView blankstyle={{backgroundColor:'#00000000'}}/>
           <RefreshListView
               ref = 'listView'
               dataSource={this.state.dataSource}
               renderRow={(rowData) =>this.renderRow(rowData) }
               onHeaderRefresh={() => this.requestData(true)}
               onFooterRefresh={() => this.requestData(false)}
               renderSeparator={this.renderSeparator}
               onScroll={(e) => this.onScroll(e)}
           />
       </View>
     )
   }

   renderHeader() {
     let items = []
     let titles = ['深圳', '羽毛球', '智能排序', '日期']
     for (var i = 0; i < 4; i++) {
       items.push(
          <View key={i} style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            <View style={{flexDirection:'row'}}>
              <Text>{titles[i]}</Text>
              <Image style={{height:10,width:10,marginLeft:5,marginTop:2}} source={require('../../img/icon_back_black_down.png')} resizeMode='contain'/>
            </View>
          </View>
       )
     }
     return items
   }

   onScroll(e: any) {
      //  let offsetY = e.nativeEvent.contentOffset.y;
       //  console.log('offset x :',offsetY,screen.height)

   }

   requestData(isReload:boolean) {

      let page = isReload ? 0 : ++this.state.page

       fetch(api.StadiumListApi,{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' //记得加上这行，不然bodyParser.json() 会识别不了
                },
                body: JSON.stringify({
                    "categoryId":3,
                    "sortType":page,
                    "pageNum":0,
                    "isSign":1,
                    "searchType":2,
                    "protocol_ver":1,
                    "isShelves":1,
                    "lat":22.55532308717054,
                    "ver":"3.0",
                    "platformType":1,
                    "isFirst":0,
                    "larkAppId":1,
                    "lng":113.9738262765926,
                    "cityId":6,
                    "pageSize":10

                })})
           .then((response) => response.json())
           .then((json) => {
               console.log(json);
               this.doFetchData(json, isReload, page)

           })
           .catch((error) => {
               alert(error)
           })
   }

   doFetchData (json:Object,isReload:boolean,page:number) {
     setTimeout(() => {
         WSorage._sava('staduimlist', json)
         let items = json.data.items;

         let dataList = isReload ? items : [...this.state.dataList, ...items]

         this.setState({
             page: page,
             dataList: dataList,
             dataSource: this.state.dataSource.cloneWithRows(dataList)
         })

         let footerState = RefreshState.Idle
          console.log('...data--->>',items)
         //测试加载全部数据的情况
         if (items.length < 10 ) {
             footerState = RefreshState.NoMoreData
         }

         this.refs.listView.endRefreshing(footerState)
     }, 1000);
   }

   renderRow(model:Object){
       let isMember = model.lowestPrice > 1
       return (
         <TouchableOpacity onPress={()=>{alert(model.name)}} activeOpacity={0.6} style={{flex:1,height:isMember?140:110,padding:15,backgroundColor:'white'}}>
           <View style={{height:75, flexDirection: 'row'}} >
             <CachedImage style={{width:75, height:75}} source={{uri:model.bizPlaceUrl}} />
             <View style={{flex:1, flexDirection:'column',justifyContent:'space-between',marginLeft:15}}>
               <View style={{flex:1,flexDirection: 'column',}}>
                 <Text style={{color: '#2d2d37',fontSize: 17}} numberOfLines={1} >{model.name}</Text>
                 <View style={{flex:1,flexDirection:'row',justifyContent:'space-between', marginTop:8}}>
                   <View style={{flexDirection: 'row'}} >
                     {this.renderSatrtView(model.placeScore)}
                     <Text style={[styles.text,{marginLeft:6}]} numberOfLines={1} >({model.commentCount}评价)</Text>
                   </View>
                   <Text style={styles.text} numberOfLines={1} >{(model.distance/1000).toFixed(1)}km</Text>
                 </View>
               </View>
               <Text style={{color: '#ed4d4d',fontSize: 23, marginBottom:-5}} numberOfLines={1} >
                 <Text style={{fontSize: 12}} >¥</Text>
                 {model.lowestPrice}
                 <Text style={{fontSize: 15}} >起</Text>
               </Text>
             </View>
           </View>
           {this.renderMemberView(isMember)}
         </TouchableOpacity>
       );
   }

   renderMemberView(isMember:boolean) {
     if ( isMember ) {
       return <View style={{marginLeft:15+75, marginTop:20, flexDirection: 'row'}}>
         <Image source={require('../../img/venue_icon_member.png')} resizeMode='contain'/>
         <Text style={[styles.text,{marginLeft:6}]}>一次充值2000元送200元</Text>
       </View>
     }
     return <View />
   }

   renderSatrtView(score:number) {
      let starts = []
      for (var i = 0; i < 5; i++) {
        starts.push(
          i <= score ?
          <Image key={i} source={require('../../img/venue_icon_star_red.png')} resizeMode='contain' style={{marginRight:2,marginTop:2}}/>
          :
          <Image key={i} source={require('../../img/venue_icon_star_gray.png')} resizeMode='contain' style={{marginRight:2,marginTop:2}}/>
        )
      }
      return starts
   }

   renderSeparator() {
       return (
         <View style={{height: 0.5, backgroundColor: '#e8e8e8'}}>
         </View>
       );
     }
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

export default StadiumController
