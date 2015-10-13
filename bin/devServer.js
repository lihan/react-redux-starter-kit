require('babel/register');

var path = require('path');
var express = require('express');
var webpack = require('webpack');


const webpackConfig = require('../build/webpack/development_hot');
const config = require('../config');

var app = express();

var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + '/dist'));



app.listen(config.get('hot_port'), 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", config.get('hot_port'), config.get('hot_port'));
});
