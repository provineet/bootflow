import webpack from "webpack";
// import TerserPlugin from "terser-webpack-plugin";

export default {
  mode: "production",
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "./maps/[name].min.map",
    }),
  ],
  //   optimization: {
  //     minimizer: [
  //       new TerserPlugin({
  //         terserOptions: {
  //           format: {
  //             comments: false,
  //           },
  //         },
  //         extractComments: true,
  //       }),
  //     ],
  //   },
};
