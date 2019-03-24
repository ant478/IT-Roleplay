const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode = process.env.NODE_ENV !== 'production';

const presetEnvOptions = {
  targets: '> 0.25%, not dead',
  useBuiltIns: 'usage',
  modules: false,
};

const babelOptions = {
  presets: [['@babel/preset-env', presetEnvOptions]],
  plugins: ['@babel/plugin-transform-runtime'],
};

const babelReactOptions = {
  presets: [['@babel/preset-env', presetEnvOptions], '@babel/react'],
  plugins: ['@babel/plugin-transform-runtime'],
};

const tsLoaderOptions = {
  context: __dirname,
  configFile: 'config/tsconfig.json',
};

const config = {
  entry: './frontend/app.js',
  mode: devMode ? 'development' : 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../frontend/build'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelOptions,
      }],
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelReactOptions,
      }],
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelOptions,
      }, {
        loader: 'ts-loader',
        options: tsLoaderOptions,
      }],
    }, {
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelReactOptions,
      }, {
        loader: 'ts-loader',
        options: tsLoaderOptions,
      }],
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../frontend'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      { from: 'frontend/index.html', to: 'index.html' },
    ]),
    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: false,
    }),
  ],
};

module.exports = config;
