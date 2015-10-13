require('babel/register');

var path = require('path');
var express = require('express');
var webpack = require('webpack');


const webpackConfig = require('../build/webpack/production');
const config = require('../config');


var app = express();

var staticPath = path.normalize(path.join(__dirname, '../dist'));


app.use(express.static(staticPath));


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(config.get('hot_port'), 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", config.get('hot_port'), config.get('hot_port'));
});
