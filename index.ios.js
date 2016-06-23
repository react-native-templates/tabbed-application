/**
 * Sample React Native Tabbed Application
 * https://github.com/react-native-templates/tabbed-application
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import FirstTab from './firstTab'
import SecondTab from './secondTab'
import GitHubIssues from './github/gitHubIssues'

import { firstIcon, secondIcon } from './icons'


class TabbedApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'first',
    }
  }

  render() {
    return (
      <View style={styles.style}>
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            title="First"
            icon={{uri: firstIcon, scale: 17}}
            selected={this.state.selectedTab === 'first'}
            onPress={() => {
              this.setState({
                selectedTab: 'first',
              });
            }}>
            {/* <FirstTab /> */}
            <GitHubIssues state='open' />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Second"
            icon={{uri: secondIcon, scale: 17}}
            selected={this.state.selectedTab === 'second'}
            onPress={() => {
              this.setState({
                selectedTab: 'second',
              });
            }}>
            {/* <SecondTab /> */}
            <GitHubIssues state='closed' />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  style: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 60
  },
});

AppRegistry.registerComponent('TabbedApplication', () => TabbedApplication);
