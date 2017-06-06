/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// import color from './color'

// create a component
class SpacingView extends Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 14,
        backgroundColor: '#f6f6f6',
    },
});

//make this component available to the app
export default SpacingView;
