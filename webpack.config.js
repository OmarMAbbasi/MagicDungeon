const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devtool: "inline-source-map",

	module: {
		rules: [
			{
				test: /\.less?$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "less-loader" // compiles Less to CSS
					}
				],
				exclude: /(node_modules)/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				exclude: /(node_modules)/,
				use: ["file-loader"]
			},
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					query: {
						presets: ["@babel/env"]
					}
				}
			}
		]
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".js", ".jsx", "*"]
	}
};
