const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      'vue/dist/vue.runtime.esm-bundler.js'
    );
  },
})
