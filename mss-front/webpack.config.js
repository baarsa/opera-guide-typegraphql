require('dotenv').config()
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require("webpack");
const {
  createLoadableComponentsTransformer,
} = require('typescript-loadable-components-plugin')

const DIST_PATH = path.resolve(__dirname, 'dist')
const isProduction = process.env.NODE_ENV === 'production'

const getConfig = target => ({
  name: target,
  mode: isProduction ? 'production' : 'development',
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
        use: [
          {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: (program) => ({
                before: [createLoadableComponentsTransformer(program, {})],
              }),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: target === 'node' ? ['null-loader'] : ['style-loader', 'css-loader'],
      }
    ],
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        coreJs: {
          test: /[\\/]node_modules[\\/]core-js[\\/]/,
          name: 'coreJs',
          chunks: 'all',
        },
        apollo: {
          test: /[\\/]node_modules[\\/]@apollo[\\/]/,
          name: 'apollo',
          chunks: 'all',
        },
        otherVendor: {
          test: /[\\/]node_modules[\\/]((?!(react|react-dom|core-js|@apollo)).*)[\\/]/,
          name: 'otherVendor',
          chunks: 'all',
        },
      },
    },
  },
  externals:
    target === 'node' ? [nodeExternals({ allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i], })] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: '[name].js',
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
    ...( isProduction || target === 'node' ? [] : [new BundleAnalyzerPlugin({ openAnalyzer: false })])
  ],
})

module.exports = [getConfig('web'), getConfig('node')]