const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';

  const jsonPlacholderEndpoint = "https://jsonplaceholder.typicode.com";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-react',
                { runtime: 'automatic' }
              ]
            ]
          }
        },
        {
          test: /\.html$/,
          use: [
            { loader: "html-loader", },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"], },
    devServer: {
      open: true, // para abrir el navegador
      compress: true,
      port: 3000,
    },
    plugins: [
      new webpack.DefinePlugin({ BACKEND_URL: JSON.stringify(jsonPlacholderEndpoint) }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      }),
    ],
  };
};
