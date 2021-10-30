require('dotenv').config()
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const webpack = require("webpack");

const DIST_PATH = path.resolve(__dirname, 'dist')
const production = process.env.NODE_ENV === 'production'
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: target === 'node' ? `./server/index.ts` : './client/index.tsx',
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.css$/,
        use: target === 'node' ? ['css-loader/locals'] : ['style-loader', 'css-loader'],
      }
    ],
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      "process.env.GRAPHQL_HTTP_URI": JSON.stringify(process.env.GRAPHQL_HTTP_URI),
      "process.env.GRAPHQL_WS_URI": JSON.stringify(process.env.GRAPHQL_WS_URI),
      "process.env.AUTH_URI": JSON.stringify(process.env.AUTH_URI)
    }),
  ],
})

module.exports = [getConfig('web'), getConfig('node')]