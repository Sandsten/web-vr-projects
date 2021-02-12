const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  experiments: {
    topLevelAwait: true,
  },
  devServer: {
    // host: '0.0.0.0', // Required if you want to work inside docker containers
    port: 8080,
    historyApiFallback: true, // 404 responses will fall back to index.html. Required for using react-router-dom
    // disableHostCheck: true // Might have to be enabled in order to run dev server in docker container

    // watchOptions required in order for webpack to rebuild when used inside a docker container
    // watchOptions: {
    //   aggregateTimeout: 500, // Delay before rebuilding once a file has changed
    //   poll: 1000, // Check for changes every second
    // },
  },
  devtool: 'inline-source-map', // Remove this when in production, takes alot of space!
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'root',
          },
        },
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      },
      {
        test: /\.scss$/,
        // Order of modules matters
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        use: ['file-loader'],
      },
      {
        //Load fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      favicon: 'src/favicon.ico',
    }),
  ],
};
