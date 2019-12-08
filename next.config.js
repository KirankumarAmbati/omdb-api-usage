const withCSS = require('@zeit/next-css');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withCSS({
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(['OMDB_API_KEY']))    
        return config
      }
})