const webpack           = require('webpack');
const path              = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [ "lodash",
					  "react",
					  "react-dom",
					  "react-redux",
					  "react-router",
					  "redux",
					  "redux-form",
					  "redux-thunk", ];

module.exports = {
	
	entry : {
		main   : './src/index.js',
		vendor : VENDOR_LIBS
	},
	
	output : {
		path       : path.join(__dirname, 'dist'),
		filename   : '[chunkhash].js',
		publicPath : 'libs/'
	},
	
	module : {
		rules : [ {
			use     : 'babel-loader',
			test    : /\.js$/,
			exclude : /node_modules/
		} ]
	},
	
	plugins : [ new webpack.optimize.CommonsChunkPlugin({names : [ 'vendor', 'manifest' ]}),
				new htmlWebpackPlugin({template : './src/index.html'}),
				new webpack.DefinePlugin({
											 'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV || 'dev')
										 }) ]
};
