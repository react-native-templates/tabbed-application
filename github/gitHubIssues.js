'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
  Image
} from 'react-native';

import api from './api'

var styles = StyleSheet.create({
  style: {
    flex: 1
  },
  issueListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  issueDetails:
  {
    flex: 0.8,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  issueTitle: {
    flex: 1,
    fontSize: 15,
    marginLeft: 15,
  },
  issueAvatarImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  text: {
    fontSize: 40
  },
  errorText: {
    fontSize: 20,
    color: 'red'
  },
  errorMessageText: {
    fontSize: 14,
    color: 'red'
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
    height: 50,
    width: 100,
    margin: 20
  }
});

const propTypes = {
  state: React.PropTypes.string.isRequired
}

export default class GitHubIssues extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { error: false, loading: false,refreshing: false, issuesDataSource: ds.cloneWithRows([])}
  }

  componentWillMount() {
    this._tryGetIssues();
  }

  _getIssues() {
    return api.issues(this.props.state)
      .then((response) => {
        if(response.status == 403) {
          var error = new Error(response.message)
          error.response = response
          throw error
        }

        return response.json()
      });
  }

  _tryGetIssues() {
    this.setState({loading: true});
    this._getIssues()
    .then((issues) => { this.setState({
      loading: false,
      issuesDataSource: this.state.issuesDataSource.cloneWithRows(issues)})
    })
    .catch((err) => this.setState({
      loading: false,
      error: true,
      errorMessage: err.message
    }));
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._getIssues()
    .then((issues) => { this.setState({
      refreshing: false,
      issuesDataSource: this.state.issuesDataSource.cloneWithRows(issues)})
    })
    .catch((err) => this.setState({
      refreshing: false,
      error: true,
      errorMessage: err.message
    }));
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 2 : 0.5,
          backgroundColor: '#c8c7cc',
        }}
      />
    );
  }

  _renderIssueRow(issue) {
    return (
      <View style={styles.issueListItem}>
        <Image style={styles.issueAvatarImage} source={{uri: issue.user.avatar_url}} />
        <View style={styles.issueDetails}>
            <Text numberOfLines={3} style={styles.issueTitle}>{issue.title}</Text>
        </View>
      </View>
    )
  }

  _renderLoadingView() {
    return (
      <View style={styles.style}>
          <ActivityIndicator
              animating={this.state.loading}
              style={[styles.activityIndicator, {height: 80}]}
              size="large"
          />
      </View>
    );
  }

  _renderErrorView() {
    return (
      <View style={[styles.style,{justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={styles.errorText}>Something Went Wrong...</Text>
          <Text style={styles.errorMessageText}>{this.state.errorMessage}</Text>
          <TouchableHighlight
            style={styles.retryButton}
            onPress={this._tryGetIssues.bind(this)}>
              <Text style={{fontSize: 16, color: 'white'}}>Retry</Text>
          </TouchableHighlight>
      </View>
    );
  }

  render() {
    if(this.state.loading) {
      return this._renderLoadingView();
    }

    if(this.state.error) {
      return this._renderErrorView();
    }

    return (
      <View style={styles.style}>
        <ListView
          style={{flex:1}}
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

GitHubIssues.propTypes = propTypes;
