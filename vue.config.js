//in vue.config.js file
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/weather' : '/',
  filenameHashing: false,
  devServer: {
    proxy: 'http://datapoint.metoffice.gov.uk'
  }
}