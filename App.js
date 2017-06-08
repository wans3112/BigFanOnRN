// @flow

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import NavigationItem from './src/code/NavigationItem'
import TabBarItem from './src/code/widget/TabBarItem'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import { StatusBar } from 'react-native';

import api from './src/code/api'
import { screen } from './src/common'

import Swiper from 'react-native-swiper';
import RefreshListView from './src/code/widget/RefreshListView'
import RefreshState from './src/code/widget/RefreshState'
import HomeMenuItem from './src/code/widget/HomeMenuItem'
import TitleBar from './src/code/widget/TitleBar'
import BlankView from './src/code/widget/BlankView'

import TopticCell from './src/code/cell/TopticCell'
import DynamicCell from './src/code/cell/DynamicCell'
import VideoCell from './src/code/cell/VideoCell'

import WWebViewController from './src/code/controller/WWebViewController'
import TopicListController from './src/code/controller/TopicListController'

import WSorage from './src/sorage/WSorage'

import { AsyncStorage } from 'react-native';

import { CachedImage } from "react-native-img-cache";

class HomeScreen extends Component {

  static navigationOptions = {
    title: '发现',
    headerRight: (
        <NavigationItem
            icon={require('././src/img/icon_news.png')}
            onPress={() => {
              alert('消息')
            }}
        />
    ),
    headerLeft:(<View />)
  }

  state: {
      dataSource: ListView.DataSource,
      banners: Array<Object>,
  }
  constructor(props: Object) {
    super(props)

    WSorage._getStorage();

    let { menuInfos, onMenuSelected } = this.props

    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    };

    this.state = {
        banners: [],
        dataSource: new ListView.DataSource({
               getSectionData: getSectionData, // 获取组中数据
               getRowData: getRowData, // 获取行中的数据
               rowHasChanged: (r1, r2) => r1 !== r2,
               sectionHeaderHasChanged:(s1, s2) => s1 !== s2
           })
     }
  }

  // React组件的一个生命周期方法，它会在组件刚加载完成的时候调用一次，以后不再会被调用
  componentDidMount() {
    WSorage._load('index', (json) => {
      console.log("缓存 >> ",json)
      this.doFetchData(json)
    })
    // this.refs.listView.startHeaderRefreshing()
  }

  requestData() {
    fetch(api.HomdeApi,{method : 'post'})
        .then((response) => response.json())
        .then((json) => {
            // console.log(JSON.stringify(json));
            // 缓存
            WSorage._sava('index', json)
            // 处理数据
            this.doFetchData(json)
        })
        .catch((error) => {
            this.refs.listView.endRefreshing(RefreshState.Failure)
        })
  }

  doFetchData(json) {
    console.log("doFetchData >> ",json)

    let bannersData = json.data.videoLayout.data.map(
        (info, i) => {
            return {
                imageUrl: info.respVideo.imageUrl,
                title: info.respVideo.brief,
                index:i,
                url:'http://www.jianshu.com'
            }
        }
    )
    let topicsData = json.data.topicListInfoLayout.data.map(
        (info) => {
            return {
                imageUrl: info.topic.img_url,
                title: info.topic.name,
                count: info.totalCountHot
            }
        }
    )
    let dynamicData = json.data.specialDynamicsLayout.data.map(
        (info) => {
            return {
                imageUrl: (info.images[0]).imageUrl,
                title: info.topicName,
                likecount: info.sumPraises,
                commitcount: info.sumDynamicComments,
                content: info.respDynamicDetailText.content
            }
        }
    )
    let videoData = json.data.videoLayout.data.map(
        (info) => {
            return {
                imageUrl: info.respVideo.imageUrl,
                title: info.respVideo.brief,
                labels: info.respVideo.labelNames,
                duration: info.respVideo.duration,
            }
        }
    )

    var dataBlob = {},
    sectionIDs = [],
    rowIDs = [];

    sectionIDs = [0, 1, 2, 3, 4];

    rowIDs[0] = [0];
    rowIDs[1] = [0];

    rowIDs[2] = [0];
    dataBlob[2] = json.data.topicListInfoLayout.title;
    dataBlob[2+':'+0] = [topicsData];

    rowIDs[4] =[0];
    dataBlob[4] = json.data.specialDynamicsLayout.title;
    dataBlob[4+':'+0] = [dynamicData];

    rowIDs[3] =[];
    dataBlob[3] = json.data.videoLayout.title;
    for (var i = 0; i < videoData.length; i++) {
      rowIDs[3].push(i)
      dataBlob[3+':'+i] = videoData[i];
    }

    console.log("JSON.stringify(json)",dataBlob);

    this.setState({
        banners: bannersData,
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    })
    setTimeout(() => {
        this.refs.listView.endRefreshing(RefreshState.NoMoreData)
    }, 500);
  }

  // 每一行中的数据
  renderRow(rowData, sectionID){
      return (
        <View>
           { sectionID == 0
             ?
             this.renderBanners()
             :
             (
               sectionID == 1
               ?
              this.renderMenuBar()
               :
               (
                 sectionID == 2
                 ?
                 <TopticCell toptics = {rowData} />
                 :
                 (
                   sectionID == 3
                   ?
                   <VideoCell video = {rowData} />
                   :
                   <DynamicCell dynamic = {rowData} />
                 )
               )
             )
           }
        </View>

      );
  }

  // 每一组对应的数据
  renderSectionHeader(sectionData,sectionId){
      return (
        <View >
          {
            sectionId > 1 ?
            (
              <View>
                <BlankView />
                <TitleBar title={sectionData} navi={this.props.navigation}/>
              </View>
            )
            :
            <View />
          }
        </View>
      );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <RefreshListView
            ref = 'listView'
            dataSource = {this.state.dataSource}
            renderSectionHeader = {this.renderSectionHeader.bind(this)}
            renderRow = {this.renderRow.bind(this)}// 下一层view中的this指向当前this
            onHeaderRefresh = {() => this.requestData()}
            removeClippedSubviews = {false}
            stickySectionHeadersEnabled = {false}
        />
      </View>
    );
  }

  renderBanners() {
    const images = this.state.banners
    var imageViews=[];
    for(var i=0;i<images.length;i++){
      let info = images[i];
      imageViews.push(
        <TouchableOpacity key={i} style={{flex:1}} activeOpacity={1}
          onPress={()=>{
            this.props.navigation.navigate('WebController', {'info': info})
          }}>
          <CachedImage style={{flex:1}} source={{uri:info.imageUrl}} />
        </TouchableOpacity>
      );
    }
    // dot={<Image source = {require('././src/img/icon_dot.png')} resizeMode='contain' style={{margin:5}}/>}
    // activeDot={<Image source = {require('././src/img/icon_dot_selected.png')} resizeMode='contain' style={{margin:5}}/>}
    return <Swiper height={screen.width*3/7} autoplay={false}  >
              {imageViews}
           </Swiper>;
  }

  renderMenuBar() {
    let menuItems = api.menuInfo.map(
        (info, i) => (
            <HomeMenuItem
                key={info.title}
                title={info.title}
                icon={info.icon}
                />
        )
    )
    return <View style={styles.itemsView} >
      {menuItems}
    </View>
  }

}

class TestScreen extends Component {
  render() {
    return <Text>TestScreen</Text>
  }
}

const TabController = TabNavigator(
    {
        GatherSpace: {
            screen: TestScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '聚集地',
                title: '聚集地',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('././src/img/tab_icon_circle_default.png')}
                        selectedImage={require('././src/img/tab_icon_circle_selected.png')}
                    />
                )
            }),
        },
        Stadium: {
            screen: TestScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '场馆',
                title: '场馆',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('././src/img/tab_icon_venue_default.png')}
                        selectedImage={require('././src/img/tab_icon_venue_selected.png')}
                    />
                )
            }),
        },
        Discover: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '发现',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('././src/img/tab_icon_find_default.png')}
                        selectedImage={require('././src/img/tab_icon_find_selected.png')}
                    />
                ),
                headerRight: (
                    <NavigationItem
                        icon={require('././src/img/icon_news.png')}
                        onPress={() => {
                          alert('消息')
                        }}
                    />
                )
            }),
        },
        Mine: {
            screen: TestScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('././src/img/tab_icon_profile_default.png')}
                        selectedImage={require('././src/img/tab_icon_profile_selected.png')}
                    />
                ),
                title: '我的',
                headerLeft:(<View />),
                headerRight: (
                    <NavigationItem
                        icon={require('././src/img/icon_news.png')}
                        onPress={() => {
                          alert('消息')
                        }}
                    />
                )
            }),
        },
    },
    {
        initialRouteName: 'Discover',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            style: { height:49 },
            activeTintColor: 'red',
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }

)

const StackOptions = ({navigation}) => {
    console.log('wans >>', navigation);
    let {state,goBack} = navigation;
    const headerStyle = {backgroundColor:'white'};
    const headerTitleStyle = {alignSelf:'center',fontSize:17,color:'#2d2d37',fontWeight:'500'}
    const headerBackTitle = false;
    const gesturesEnabled = true;

    let defaultOptions = {headerStyle,headerTitleStyle,headerBackTitle,gesturesEnabled}

    if ( state.index == undefined ) {
      defaultOptions.headerLeft = (
        <TouchableOpacity onPress={()=>{goBack()}}>
          <Image source={require('././src/img/icon_back_black.png')} resizeMode='contain' style={{marginLeft:6}}/>
        </TouchableOpacity>
      );
      defaultOptions.headerRight = (<View />);
    }
    return defaultOptions

};

const Navigator = StackNavigator(
  {
      Home: { screen: TabController },
      WebController: { screen: WWebViewController },
      TopicList: {screen: TopicListController }
  },
  {
      initialRouteName: 'Home',
      headerMode: 'float',
      mode:'card',
      // android push效果
      transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
      }),
      cardStack: { gesturesEnabled: true},
      navigationOptions: ({navigation}) => StackOptions({navigation})
  }
);

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        width:screen.width,
        height:screen.height
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        // borderWidth: screen.onePixel,
        // borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
        backgroundColor: 'white'
    },

});

class App extends Component {
    constructor() {
        super()
        StatusBar.setBarStyle('dark-content')// light-content
    }

    render() {
        return (
            <Navigator />
        );
    }
}

export default App;
