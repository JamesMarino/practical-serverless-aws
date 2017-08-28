const Webpack = require("webpack");

module.exports = {
    entry: "./index.js",
    target: "node",
    output: {
        filename: "main.js",
        libraryTarget: "commonjs2",
    },
    externals: [
        "aws-sdk"
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
                exclude: [/node_modules/]
            },
        ],
    },
    plugins: [
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        })
    ],
};
