'use strict'

// Basic usage of fetch api to get react-native issues from the repo
export default {
  issues (state) {
    return fetch('https://api.github.com/repos/facebook/react-native/issues?state=' + state)
  }
}

