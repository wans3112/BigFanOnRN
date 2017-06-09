/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// import color from './color'

// create a component
class WBButton extends Component {

  state: {
    highlightcolor: string,
    normalcolor:string,
    color:string,
    title:string,
  }

  constructor(props: Object) {
      super(props)

      this.state = {
         normalcolor:'#000000',
         highlightcolor:'#00000052',
         title:'',
         color:'#000000'
      }
  }

  render() {
      return (
        <TouchableOpacity onPressIn={() => {
          this.setState({color: this.props.highlightcolor})
        }}
           onPressOut={() => {
             this.setState({color: this.props.normalcolor})
           }}
          onPress={()=>{}} activeOpacity = {1}>
          <Text style={{color:this.state.color}} >{this.props.title}</Text>
         </TouchableOpacity>
      );
  }
}

// didselectedHighlight(isOnPressIn:boolean) {
//   let color = isOnPressIn ? this.state.highlightcolor : this.state.normalcolor
//   this.setState({color: data})
// }

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

//make this component available to the app
export default WBButton;
