const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: "only",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just Another Text Editor",
      }),
      new MiniCssExtractPlugin(),
      new GenerateSW({
        swDest: "service-worker.js",
        clientsClaim: true,
        skipWaiting: true,
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JAST",
        description: "My awesome Text Editor!",
        background_color: "#ffffff",
        start_url: "/",
        theme_color: "#225ca3",
        background_color: "#225ca3",
        publicPath: "./",
        orientation: "portrait",
        display: "standalone",
        fingerprints: false,
        crossorigin: null, //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve("./src/images/logo.png"),
            size: "1024x1024", // you can also use the specifications pattern
          },
          {
            src: path.resolve("./src/images/logo.png"),
            size: "1024x1024",
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
