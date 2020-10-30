const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'client/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
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
        })
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
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 1234,
        compress: true,
        hot: true,
    }
};
