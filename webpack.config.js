// NodeJS的模块path专门用来处理文件路径
const path = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); //处理html资源
const CopyPlugin = require("copy-webpack-plugin"); // 复制文件
// 封装一个处理绝对路径的方法
function resolve(relative) {
  return path.resolve(__dirname, relative);
}

// 模块出口
module.exports = {
  // -----------------------一、入口
  entry: "./src/index.js",
  // -----------------------二、输出
  output: {
    path: undefined, //输出的目录
    filename: "[name].js", //输出文件名
  },
  // ---------------------- 三、加载器
  module: {
    rules: [
      // 1.处理js资源  babel
      {
        test: /\.jsx?$/,
        include: [resolve("src")], //包含src下面的文件，只检查包含的文件
        use: {
          // 需要下载
          loader: "babel-loader", //解析jsx
          option: {
            // 配置对象
            presets: [
              "@babel/preset-env", //编译普通js语法
              "@babel/preset-react", //编译jsx语法
            ],
            // 插件
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      // 2.处理css资源 style-loader  css-loader
      {
        test: /\.css$/,
        include: [resolve("src")], //检查文件的范围
        use: [
          // 需要下载
          "style-loader",
          "css-loader",
        ],
      },
      // 3.处理图片资源 url-loader
      {
        test: /\.(png|gif|jpe?g|webp)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          optionds: {
            limit: 10 * 1024,
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
      // 4.处理其他资源（字体图标~）  file-loader
      {
        exclude: [/\.jsx?$/, /\.css$/, /\.(png|gif|jpe?g|webp)$/], //排出文件
        use: {
          loader: "file-loader",
          options: {
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  // ---------------------- 四、插件
  plugins: [
    //处理html资源
    new HtmlWebpackPlugin({
      // 配置对象
      template: resolve("public/index.html"),
    }),
    // 复制文件
    new CopyPlugin([
      {
        from: resolve("public"),
        to: resolve("dist"),
        ignore: ["index.html"],
      },
    ]),
  ],
  // ---------------------- 五、自动化：开发服务器
  devServer: {
    contentBase: resolve("public"), //开发服务器将哪个文件暴露出去
    port: 8888,
    host: "localhost",
    compress: true, //压缩
    open: true,
    hot: true,
    quiet: false, //开启静默模式，在终端不打印多余的信息
    clientLogLevel: "none", //在浏览器控制台不打印多余的内容
    proxy: {
      // 配置代理服务器
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
  // -----------------------六、开发环境
  devtool: "cheap-module-source-map",
  // ---------------------- 七、自动补全文件名
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      // 配置路径别名
      "@": resolve("src"),
    },
  },
};
