const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'client/index.tsx'),
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'dist', 'client'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
                <html>
                  <body>
                    <div id="root"></div>
                  </body>
                </html>
              `
        }),
        new webpack.EnvironmentPlugin(['GRAPHQL_URI']),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
};
