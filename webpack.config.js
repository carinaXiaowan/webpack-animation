const path = require('path');

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
            }
        ]
    },
    plugins:[
        
    ]
}