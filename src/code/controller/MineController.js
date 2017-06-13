

import React, { Component } from 'react'
import { View, Text, StyleSheet, ListView, TouchableOpacity, Image } from 'react-native';
import NavigationItem from '../NavigationItem'
import { screen } from '../../common'

import BlankView from '..//widget/BlankView'

class MineController extends Component {

    state: {
      headerHeight:float,
      dataSource: ListView.DataSource,
      scrollOffsetY:float,
      bgcolor:string,
      tintColor:string

    }

    constructor(props: Object) {
        super(props)

        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.state = {
          headerHeight:200,
          scrollOffsetY:0,
          bgcolor:'#ffffff00',
          dataSource: new ListView.DataSource({
                 getSectionData: getSectionData, // 获取组中数据
                 getRowData: getRowData, // 获取行中的数据
                 rowHasChanged: (r1, r2) => r1 !== r2,
                 sectionHeaderHasChanged:(s1, s2) => s1 !== s2
             }),
          tintColor:'white'

        }
    }

    static navigationOptions = ({navigation}) => {

      const { params } = navigation.state
      // if ( !params )  return
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
       header:null,
      }
    }

    componentDidMount() {

      var dataBlob = {},
      sectionIDs = [],
      rowIDs = [];

      sectionIDs = [0, 1, 2];

      rowIDs[0] = [0];
      dataBlob[0+':'+0] = ['topicsData'];

      rowIDs[1] = [0];
      dataBlob[1+':'+0] = ['topicsData'];
      dataBlob[1+':'+0] = [{title:'我的俱乐部', subTitle:'加入俱乐部吧'},
      {title:'关注的达人', subTitle:'关注一个达人吧'},
      {title:'我的比赛', subTitle:'去参加一场比赛'},
      {title:'我的场馆', subTitle:'看看周边的场馆'}];

      rowIDs[2] = [0];
      dataBlob[2+':'+0] = ['topicsData'];
      dataBlob[2+':'+0] = [{title:'任务中心', subTitle:'签到得鸟蛋', image:require('../../img/ny_icon_task.png')},
      {title:'运动水平', subTitle:'等级分评测', image:require('../../img/ny_icon_level.png')},
      {title:'我的订单', subTitle:'消费记录清单', image:require('../../img/ny_icon_order.png')},
      {title:'我的资产', subTitle:'鸟蛋会员优惠', image:require('../../img/ny_icon_asset.png')}];

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
      })
    }

     render () {
        return (
          <View style={styles.container}>
              <View style={{backgroundColor:this.state.bgcolor,
              position:'absolute',
              zIndex:99,
              width:screen.width,
              height:64, justifyContent:'space-between',flexDirection:'row'}}>
              <TouchableOpacity style={{justifyContent:'center',marginTop:20,height:44,width:44}}>
                <Image style={{tintColor:'white', alignSelf:'center'}} source={require('../../img/navi_icon_set.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:'center',marginTop:20,height:44,width:44}}>
                <Image style={{tintColor:'white',alignSelf:'center'}} source={require('../../img/icon_news.png')} />
              </TouchableOpacity>
            </View>
              <ListView
                 style={{backgroundColor:'#ffffff00', zIndex:10}}
                 ref = 'listView'
                 contentInset={{bottom:12}}
                //  contentOffset={{y:-200}}
                 onScroll={(e) => this.onScroll(e)}
                 renderSectionHeader = {this.renderSectionHeader.bind(this)}
                 dataSource={this.state.dataSource}
                 renderRow={this.renderRow.bind(this)}
                 renderHeader = {this.renderHeader}
               />
          </View>
        )
      }

    renderRow(rowData, sectionID){

      return (
        <View>
          {
            sectionID == 0 ?
            (
              <TouchableOpacity activeOpacity={0.6} style={{flexDirection:'row', height:90,justifyContent:'space-between', backgroundColor:'white', padding:12}}>
                <View>
                  <Text style={{fontSize:13, color:'#2d2d37'}}>我的动态</Text>
                  <Text style={{fontSize:24, fontWeight:'bold', color:'#b5b4b9', marginTop:5}}>0</Text>
                </View>
                <View style={{alignItems:'flex-end', alignSelf:'center', flexDirection:'row'}}>
                  <Text style={{fontSize:12, color:'#b5b4b9', marginRight:8}}>去发表第一条动态吧</Text>
                  <Image style={{alignSelf:'center'}} source={require('../../img/icon_arrow_right_small_gray.png')} />
                </View>
              </TouchableOpacity>
            )
            :
            (
              sectionID == 1 ?
              <View activeOpacity={0.6} style={{flexDirection:'row', flexWrap:'wrap', height:100*2, backgroundColor:'white'}}>
                {
                  rowData.map(
                    (info, i) => (
                      <TouchableOpacity key={i} style={{height:100, width:screen.width/2, justifyContent:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{'marginLeft':20,fontSize:40, fontWeight:'bold', color:'#b5b4b9'}}>0</Text>
                          <View style={{marginLeft:18}}>
                            <Text style={{fontSize:15, color:'#2d2d37'}}>{info.title}</Text>
                            <Text style={{fontSize:12, color:'#b5b4b9', marginTop:5}}>{info.subTitle}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  )
                }
                <View style={{position:'absolute',left:0,right:0,height:0.5,top:100, backgroundColor:'#e8e8e8'}}/>
                <View style={{position:'absolute',top:0,bottom:0,width:0.5,left:screen.width/2, backgroundColor:'#e8e8e8'}}/>
              </View>

              :(
                <View activeOpacity={0.6} style={{flexDirection:'row', flexWrap:'wrap', height:76*2, backgroundColor:'white'}}>
                  {
                    rowData.map(
                      (info, i) => (
                        <TouchableOpacity key={i} style={{height:76, width:screen.width/2, justifyContent:'center'}}>
                          <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image style={{'marginLeft':20}} source={info.image} resizeMode='contain' />
                            <View style={{marginLeft:18,alignItems:'center'}}>
                              <Text style={{fontSize:15, color:'#2d2d37'}}>{info.title}</Text>
                              <Text style={{fontSize:12, color:'#b5b4b9', marginTop:5}}>{info.subTitle}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    )
                  }
                  <View style={{position:'absolute',left:0,right:0,height:0.5,top:76, backgroundColor:'#e8e8e8'}}/>
                  <View style={{position:'absolute',top:20,width:0.5, height:36, left:screen.width/2, backgroundColor:'#e8e8e8'}}/>
                  <View style={{position:'absolute',bottom:20,width:0.5, height:36, left:screen.width/2, backgroundColor:'#e8e8e8'}}/>
                </View>
              )
            )
          }
        </View>
      )
    }

    // 每一组对应的数据
    renderSectionHeader(sectionData,sectionId){
        return (
          <BlankView />
        );
    }

    renderHeader() {
      return (
        <Image style={{alignItems:'center', width:screen.width, height:200}} source={require('../../img/icon_my_bg.png')}>
          <View style={{position:'absolute', bottom:30, alignItems:'center' }}>
          <Image source={require('../../img/my_head_default.png')} resizeMode='contain' />
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', marginTop:15, height:26, width:80, borderColor:'rgba(255, 255, 255, 0.8)',borderWidth:0.5}}>
            <Text style={{color:'white', fontSize:14}}>点击登录</Text>
          </TouchableOpacity>
          </View>
        </Image>
      )
    }

    onScroll(e: any) {
        let offsetY = e.nativeEvent.contentOffset.y;
        console.log('offset y :',offsetY,this.state.headerHeight)

       if(offsetY<0){
         this.setState(
            {
              // scrollOffsetY:0,
              // headerHeight:-offsetY,
              bgcolor:'#ffffff00'
            }
         )

        //  this.refs.listView.scrollTo({y:0})
      }else {
        color = 'rgba(255, 255, 255, ' + (offsetY)/200 + ')'
        this.setState(
           {
            //  scrollOffsetY:-(offsetY+200),
            //  headerHeight:200,
             bgcolor:color

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
