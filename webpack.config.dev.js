import webpack from 'webpack';
import path from 'path';

export default {
  debug: true, //enables displaying debug info
  devtool: 'inline-source-map', //('cheap-module-eval-source-map')
  noInfo: false, //webpack will display all the files its bundling
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads(reload=true parameter tells webpack to reload the page if hot reloading fails) the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')   //('./src/index') actual app entry point its index.js
  ],
  target: 'web',   //if app is running in Node we can set this 'Node instead of 'web'.'web' is for browser i.e. our app is running in browser so webpack will bundle according to that.
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`. 
    publicPath: '/',             //Imp: Webpack won't generate any actual physical files for our development. It will create bundles in memory ,and serve files from memory.
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src') // tell devServer where our code is i.e. in source directory
  },
  plugins: [                                       //to enhance webpack power. Here we are using two plugins for our app.
    new webpack.HotModuleReplacementPlugin(),    // It will enable us to replace modules without having to do a full browser refresh.
    new webpack.NoErrorsPlugin()               // It will help us keep errors from breaking our hot reloading experience. Instead will see a nice error msg in the browser.
  ],
  module: {                   //this section tells Webpack what file types it should handle.
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},               //lines from here to ends will tells webpack to handle different Bootstrap files.
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};