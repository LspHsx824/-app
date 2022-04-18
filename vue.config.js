const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    // proxy:"http://sg1.api.bing.com/qsonhs.aspx"
    // proxy:"https://suggest.taobao.com"
    // proxy:{
    //   "/demo":{
    //     target:"https://suggest.taobao.com",
    //     pathRewrite:{'^/demo':''}

    //   }
    // }
  }
})
