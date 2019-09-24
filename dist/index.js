
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-viewport-helpers.cjs.production.min.js')
} else {
  module.exports = require('./react-native-viewport-helpers.cjs.development.js')
}
