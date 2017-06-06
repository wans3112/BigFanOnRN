/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Heading2 } from './Text'
import { screen } from '../../common'

// create a component
class HomeMenuItem extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={()=>{alert(this.props.title)}}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading2 style={{color:'#737980',fontSize:12}}>
                    {this.props.title}
                </Heading2>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 4,
        backgroundColor: 'white'
    },
    icon: {
        width: screen.width / 12,
        height: screen.width / 12,
        marginBottom: 15
    }
});

//make this component available to the app
export default HomeMenuItem;
