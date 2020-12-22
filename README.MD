#### loader的含义
   - @babel/core babel核心
   - @babel/preset-env 编译ES6
   - @babel/preset-react    转换JSX；
   - @babel/plugin-transform-runtime 避免 polyfill污染全局变量，减小打包体积
   - @babel/polyfill ES6 内置方法和函数转化垫片
####  插件的作用
   - mini-css-extract-plugin 主要用于提取css
   - optimize-css-assets-webpack-plugin 主要用于压缩、去重
