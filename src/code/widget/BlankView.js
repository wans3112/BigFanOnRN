/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// import color from './color'

// create a component
class BlankView extends Component {
    render() {
        return (
            <View style={[styles.container,this.props.blankstyle]}>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 12,
        backgroundColor: '#f6f6f6',
    },
});

//make this component available to the app
export default BlankView;
