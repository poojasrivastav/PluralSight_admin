import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,             //i.e. Don't want information on command line as it runs.
  publicPath: config.output.publicPath //publicPath which we defined within our webpack.config
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {              //our app is single page app so we want express to serve our index.html for all request thatswhy for all request we specify wild card which is * (*)
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);       // open the browser using the open package, which is also from npm 
  }
});