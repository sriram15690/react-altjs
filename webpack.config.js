var path = require('path');
var webpack = require('webpack');
//require("../css/style.css");


 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
       // { test: require.resolve("jquery"), loader: "imports?jQuery=jquery" }
            
        
    ]
  }
};
