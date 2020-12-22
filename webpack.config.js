const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //简化了HTML文件的创建,生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次打包清除之前的打包信息
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//压缩，去重
module.exports = {
  mode: "development",
  entry: {
    index: "./src/js/index.js",
    about: "./src/js/about.js",
    animate: "./src/js/animate.js",
    base: "./src/js/base.js",
  },
  output: {
    filename: "js/[name].[contentHash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader", //把css插入到header中style标签中。
          {
            loader: "css-loader", //用于在js中加载css
            options: {
              //当css文件中有引用了其他css的时候，需要设置这个optitons
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader", //为了浏览器的兼容性，为样式加前缀
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", //把css插入到header中style标签中。
          {
            loader: "css-loader", //用于在js中加载css
            options: {
              //当css文件中有引用了其他css的时候，需要设置这个optitons
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader", //为了浏览器的兼容性，为样式加前缀
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "less-loader", //把less转成css
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/, //抽取公共部分的html代码,解析img插入的图片
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/, //打包图片资源
        use: [
          {
            loader: "url-loader", //超过一定大小，转base64
            options: {
              limit: 8192,
              esModule: false, //关闭es6模块化
              outpath: "images",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/, //打包图片资源
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]", //为图片重命名
              outpath: "images",
            },
          },
        ],
      },
      {
        exclude: /\.(css|js|html|less)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]", //为其他资源重命名
              outpath: "medias",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash:5].css",
      // chunkFilename: "assets/css/[name].[hash:5].css",
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      // cssProcessorOptions: cssnanoOptions,
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            normalizeUnicode: false,
          },
        ],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: "首页",
      template: "./public/index.html", //复制项目中的文件，并自动引入打包输出的资源，模板文件，即需要打包和拷贝到build目录下的html文件
      filename: "index.html",
      chunks: ["index", "base"],
    }),
    new HtmlWebpackPlugin({
      title: "关于我们",
      template: "./public/about.html", //复制项目中的文件，并自动引入打包输出的资源，模板文件，即需要打包和拷贝到build目录下的html文件
      filename: "about.html",
      chunks: ["about", "base"],
    }),
    new HtmlWebpackPlugin({
      title: "动画",
      template: "./public/animate.html", //复制项目中的文件，并自动引入打包输出的资源，模板文件，即需要打包和拷贝到build目录下的html文件
      filename: "animate.html",
      chunks: ["animate", "base"],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: "3000",
    open: true,
  },
};
