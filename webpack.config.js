const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  console.log(MiniCssExtractPlugin.loader);
  const config = {
    entry: "./src/main.js",
    output: {
      filename: "main.js",
      path: resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.less$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)(\?.*)?$/,
          use: [
              {
                  loader: "file-loader",
                  options: {
                      // publicPath:
                      //     "/",
                      outputPath: "",
                      name: "[name].[ext]",
                      esModule: false,
                  },
              },
          ],
      },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };

  return config;
};
