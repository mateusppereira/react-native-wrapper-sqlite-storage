/* eslint-disable */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Main from './main';
import Data from './data';
import { createStackNavigator } from 'react-navigation';
// import createRoutes from './routes';

const RootStack = createStackNavigator({
  Main: Main,
  Data: Data,
}, {
  initialRouteName: 'Main',
  headerMode: 'none',
});

export default class Initial extends Component {

  render() {
    return (
      <RootStack />
    );
  }
}
