'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class FirstTab extends Component {
  render () {
    return (
      <View style={styles.style}>
        <Text style={styles.text}>First Tab</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40
  }
})

module.exports = FirstTab
