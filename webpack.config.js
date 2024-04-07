
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ip = require('ip');

const javascriptEntryPath = path.resolve(__dirname, 'src', 'app.js');
// const htmlEntryPath = path.resolve(__dirname, htmlIndexPath);
// const buildPath = path.resolve(__dirname, 'public', 'build');
// const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const publicIndex = path.resolve(__dirname, 'public', 'index.html');

const NodeEnvironment = process.env.NODE_ENV;

const DOCKER = 'DOCKER';
const LOCAL_HOST = 'localhost';

const getLocalDevEndPoint = () => {
	const Environment = process.env;
	if(Environment.hasOwnProperty(DOCKER) && Environment[DOCKER] === 'running') {
		console.log('Docker Environment: ', Environment[DOCKER]);
		return ip.address();
	} else {
		return LOCAL_HOST;
	}
};

const localDevEndPoint = getLocalDevEndPoint();

console.log('Node Environment Webpack Config: ', NodeEnvironment);

// Here goes all configuration
module.exports = {
	mode: 'development',
	entry: javascriptEntryPath,
	output: {
    path: distPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
       { 
        test: /\.js$/, // apply to all JS files
        exclude: /node_modules/, // exclude all files on node_modules
        use: {
          loader: 'babel-loader', // looks at .babelrc
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: publicIndex // create a template to start from
    })
  ],
  devServer: {
    host: localDevEndPoint, // where to run
    historyApiFallback: true,
    port: 3001, //given port to exec. app
    open: true,  // open new tab
    hot: true // Enable webpack's Hot Module Replacement
  }
}