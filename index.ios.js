/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import {
   AppRegistry,
   Text,
 } from 'react-native';
 import App from './App'

 export default class navigation extends React.Component {

   render() {
     return <App />;
   }
 }

 AppRegistry.registerComponent('navigation', () => navigation);

 // AppRegistry.registerComponent('navigation', function () {
 //   return navigation;
 // });
