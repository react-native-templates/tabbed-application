'use strict'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import api from './api'

const propTypes = {
  state: React.PropTypes.string.isRequired
}

export default class GitHubIssues extends Component {
  constructor (props) {
    super(props);

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = { error: false, loading: false,refreshing: false, issuesDataSource: ds.cloneWithRows([]) }
  }

  componentWillMount () {
    this._tryGetIssues()
  }

  _getIssues () {
    return api.issues(this.props.state)
      .then((response) => {
        if(response.status == 403) {
          var error = new Error(response.message)
          error.response = response
          throw error
        }

        return response.json()
      })
  }

  _tryGetIssues () {
    this.setState({ loading: true })
    this._getIssues()
      .then((issues) => this.setState({
        loading: false,
        issuesDataSource: this.state.issuesDataSource.cloneWithRows(issues)
      }))
      .catch((err) => this.setState({
        loading: false,
        error: true,
        errorMessage: err.message
      }))
  }

  _onRefresh () {
    this.setState({refreshing: true})
    this._getIssues()
      .then((issues) => this.setState({
        refreshing: false,
        issuesDataSource: this.state.issuesDataSource.cloneWithRows(issues)
      }))
      .catch((err) => this.setState({
        refreshing: false,
        error: true,
        errorMessage: err.message
      }))
  }

  _renderSeperator (sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 2 : 0.5,
          backgroundColor: '#c8c7cc',
        }}
      />
    )
  }

  _renderIssueRow (issue) {
    return (
      <View style={styles.issueListItem}>
        <Image style={styles.issueAvatarImage} source={{uri: issue.user.avatar_url}} />
        <View style={styles.issueDetails}>
            <Text numberOfLines={3} style={styles.issueTitle}>{issue.title}</Text>
        </View>
      </View>
    )
  }

  _renderLoadingView () {
    return (
      <View style={styles.style}>
          <ActivityIndicator
              animating={this.state.loading}
              style={[styles.activityIndicator, {height: 80}]}
              size="large"
          />
      </View>
    )
  }

  _renderErrorView () {
    return (
      <View style={[ styles.style, { justifyContent: 'center', alignItems: 'center' } ]}>
          <Text style={styles.errorText}>Something Went Wrong...</Text>
          <Text style={styles.errorMessageText}>{this.state.errorMessage}</Text>
          <TouchableHighlight
            style={styles.retryButton}
            onPress={this._tryGetIssues.bind(this)}>
              <Text style={{fontSize: 16, color: 'white'}}>Retry</Text>
          </TouchableHighlight>
      </View>
    )
  }

  render () {
    if (this.state.loading) {
      return this._renderLoadingView()
    }

    if(this.state.error) {
      return this._renderErrorView()
    }

    return (
      <View style={styles.style}>
        <ListView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          dataSource={this.state.issuesDataSource}
          renderRow={this._renderIssueRow}
          renderSeparator={this._renderSeperator}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  style: {
    flex: 1
  },
  issueListItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 20
  },
  issueDetails: {
    alignItems: 'flex-start',
    flex: 0.8,
    flexDirection: 'column'
  },
  issueTitle: {
    flex: 1,
    fontSize: 15,
    marginLeft: 15,
  },
  issueAvatarImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  text: {
    fontSize: 40
  },
  errorText: {
    color: 'red',
    fontSize: 20
  },
  errorMessageText: {
    color: 'red',
    fontSize: 14
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  retryButton: {
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center'
    margin: 20,
    width: 100
  }
})

GitHubIssues.propTypes = propTypes
