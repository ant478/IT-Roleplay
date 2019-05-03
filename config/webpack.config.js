const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const devMode = process.env.NODE_ENV !== 'production';

const babelPresetEnvOptions = {
  useBuiltIns: 'usage',
  modules: false,
  corejs: '3.0.1',
};

const babelOptions = {
  presets: [['@babel/preset-env', babelPresetEnvOptions]],
  plugins: ['@babel/plugin-transform-runtime'],
};

const babelReactOptions = {
  presets: [['@babel/preset-env', babelPresetEnvOptions], '@babel/react'],
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
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, './config'),
            },
            plugins: () => {
              const productionPlugins = [postcssPresetEnv(), cssnano()];
              const devPlugins = [postcssPresetEnv()];

              return devMode ? devPlugins : productionPlugins;
            },
          },
        }, {
          loader: 'sass-loader',
          options: {
            data: '@import "variables";',
            includePaths: [
              path.resolve(__dirname, '../frontend/components/App'),
            ],
          },
        },
      ],
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '/resources/images/[name].[ext]',
        },
      }],
    }, {
      test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '/resources/fonts/[hash].[ext]',
        },
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  devtool: devMode ? 'source-map' : 'none',
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
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
