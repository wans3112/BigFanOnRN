/**
 * Copyright (c) 2017-present, wans
 * All rights reserved.
 *
 * @flow
 */

 import React, { Component } from 'react';
 import { View, Text, StyleSheet, ListView, TouchableOpacity, ScrollView } from 'react-native';

 import NavigationItem from '../NavigationItem'
 import RefreshListView from '../widget/RefreshListView'
 import RefreshState from '../widget/RefreshState'
 import api from '../api'

 import { screen } from '../../common'

 import { CachedImage } from "react-native-img-cache";
 import WSorage from '../../sorage/WSorage'

 class TopicListController extends Component {

   state: {
       page: number,
       dataList:Array<Object>,
       dataSource: ListView.DataSource,
   }

   constructor(props: Object) {
       super(props)

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
       title: params.title,
     }
   }

   componentDidMount() {
       this.refs.listView.startHeaderRefreshing()
   }

  render () {
     return (
       <View style={styles.container}>
           <RefreshListView
               ref = 'listView'
               dataSource={this.state.dataSource}
               renderRow={(rowData) =>this.renderRow(rowData.topic) }
               onHeaderRefresh={() => this.requestData(true)}
               onFooterRefresh={() => this.requestData(false)}
               renderSeparator={this.renderSeparator}
               onScroll={(e) => this.onScroll(e)}
           />
       </View>
     )
    //  <Button
    //    title='返回传值'
    //    onPress={() => {
    //     const {navigation} = this.props
    //      navigation.goBack()
    //      navigation.state.params.callBack('returndata from topiclist vc')
    //    }} />
   }

   onScroll(e: any) {
      //  let offsetY = e.nativeEvent.contentOffset.y;
       //  console.log('offset x :',offsetY,screen.height)

   }

   requestData(isReload:boolean) {

      let page = isReload ? 0 : ++this.state.page

       fetch(api.TopicListApi,{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' //记得加上这行，不然bodyParser.json() 会识别不了
                },
                body: JSON.stringify({
                    pageSize: "20",
                    pageNum: page
                })})
           .then((response) => response.json())
           .then((json) => {
               console.log(json);
               setTimeout(() => {
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
                   if (items.length < 20 ) {
                       footerState = RefreshState.NoMoreData
                   }

                   this.refs.listView.endRefreshing(footerState)
               }, 1000);

           })
           .catch((error) => {
               alert(error)
           })
   }

   renderRow(model:Object){
       return (
         <TouchableOpacity onPress={()=>{alert(model.name)}} activeOpacity={0.6} style={{flex:1,height:110,padding:15,flexDirection: 'row',backgroundColor:'white'}}>
           <CachedImage style={{flex:1}} source={{uri:model.img_url}} />
           <View style={{flex:1.2,flexDirection: 'column',justifyContent: 'space-between',marginLeft:6}}>
             <View style={{flex:1,flexDirection: 'column'}}>
               <Text style={{color: '#000000ff',fontSize: 16,fontWeight: 'bold'}} numberOfLines={1} >{model.name}</Text>
               <Text style={{color: '#00000050',fontSize: 13,marginTop:5}} numberOfLines={2} >{model.content}</Text>
             </View>
             <Text style={{color: '#00000032',fontSize: 12,}} numberOfLines={1} >{'已有'+model.pep_total+'人参加'}</Text>
           </View>
         </TouchableOpacity>
       );
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
    }
  });

export default TopicListController
