const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//简化了HTML文件的创建,生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
module.exports = {
    mode:'development',
    entry:'./index.js',
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader', //把css插入到header中style标签中。
                    {
                        loader:'css-loader', //用于在js中加载css
                        options:{ //当css文件中有引用了其他css的时候，需要设置这个optitons
                            importLoaders: 1,
                            sourceMap: true 
                        }
                    },
                    {
                        loader:'postcss-loader', //为了浏览器的兼容性，为样式加前缀
                        options:{
                            sourceMap: true,
                            postcssOptions:{
                                plugins:[
                                    'autoprefixer',
                                ]
                            }
                        }
                    }
                       
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader', //把css插入到header中style标签中。
                    {
                        loader:'css-loader', //用于在js中加载css
                        options:{ //当css文件中有引用了其他css的时候，需要设置这个optitons
                            importLoaders: 1,
                            sourceMap: true 
                        }
                    },
                    {
                        loader:'postcss-loader', //为了浏览器的兼容性，为样式加前缀
                        options:{
                            sourceMap: true,
                            postcssOptions:{
                                plugins:[
                                    'autoprefixer',
                                ]
                            }
                        }
                    },
                    {
                        loader:'less-loader', //把less转成css
                        options:{
                            sourceMap: true
                        }
                    }
                       
                ]
            },
            {
                test: /\.html$/,//抽取公共部分的html代码,解析img插入的图片 
                use:[
                    'html-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,//打包图片资源
                use:[
                    {
                        loader:'url-loader',//超过一定大小，转base64
                        options: {
                            limit: 8192,
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,//打包图片资源
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name: '[path][name].[ext]',//为图片重命名
                            publicPath: 'assets',   
                        }
                    }
                ]
            },
            {
                exclude:/\.(css|js|html|less)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name: '[path][name].[ext]',//为其他资源重命名  
                        }
                    }
                ]
            }

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'//复制项目中的文件，并自动引入打包输出的资源
        }),
    ],
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        port:'3000',
        open: true
    }
}