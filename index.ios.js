/**
 * Sample React Native Tabbed Application
 * https://github.com/react-native-templates/tabbed-application
 * @flow
 */
'use strict'

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native'

import FirstTab from './firstTab'
import SecondTab from './secondTab'
/*import GitHubIssues from './github/gitHubIssues'*/

import { firstIcon, secondIcon } from './icons'

class TabbedApplication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'first',
      headerText: 'First'
    }
  }

  render () {
    return (
      <View style={styles.style}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.headerText}</Text>
        </View>
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            title='First'
            icon={{uri: firstIcon, scale: 17}}
            selected={this.state.selectedTab === 'first'}
            onPress={() => {
              this.setState({
                selectedTab: 'first',
                headerText: 'First'
              })
            }}>
            {/* <GitHubIssues state='open' /> */}
            <FirstTab />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title='Second'
            icon={{uri: secondIcon, scale: 17}}
            selected={this.state.selectedTab === 'second'}
            onPress={() => {
              this.setState({
                selectedTab: 'second',
                headerText: 'Second'
              })
            }}>
            {/* <GitHubIssues state='closed' /> */}
            <SecondTab />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  style: {
    alignItems: 'stretch',
    flex: 1
  },
  header: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    paddingTop: 15
  },
  headerText: {
    color: 'dodgerblue',
    fontSize: 24
  }
})

AppRegistry.registerComponent('TabbedApplication', () => TabbedApplication)
