const path = require("path");
const webpack = require("webpack");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");


// LaTeX macros go here
const LATEX_MACROS = {
  "\\bpm": "\\begin{pmatrix}",
  "\\epm": "\\end{pmatrix}",
  "\\bbR": "\\mathbb{R}",
  "\\baug": "\\begin{pmatrix}\\begin{array}",
  "\\eaug": "\\end{array}\\end{pmatrix}",
  "\\to": "\\rightarrow",
}

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.mdx?$/,
        use: [
          "babel-loader",
          {
            loader: "@mdx-js/loader",
            options: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                [rehypeKatex, { macros: LATEX_MACROS }]
              ],
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".mdx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    watchContentBase: true,
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hot: true
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
};

