'use strict'
const path = require('path')
// const defaultSettings = require('./src/config/index.ts')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = 'iForms' // page title
const port = 9191 // dev port
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios'
}
// cdn
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js',
      'https://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js',
      'https://unpkg.com/vuex@3.1.2/dist/vuex.min.js',
      'https://unpkg.com/axios@0.19.0/dist/axios.min.js',
      'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.1/js.cookie.min.js'
    ]
  }
}
module.exports = {
  publicPath: './', // router hash 模式使用
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/app/', //router history模式使用 需要区分生产环境和开发环境，不然build会报错
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      // externals里的模块不打包
      Object.assign(config, {
        name: name,
        externals: externals
      })
    }
    // 为开发环境修改配置...
    // if (process.env.NODE_ENV === 'development') {
    // }
  },
  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          libs: {
            name: 'chunk-libs',
            chunks: 'initial', // only package third parties that are initially dependent
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
