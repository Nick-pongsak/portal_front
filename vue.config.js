// vue.config.js

const path = require('path');
module.exports = {
  assetsDir: './',
  // assetsDir: './assets',
  devServer: {
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/auth': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true,
      },
      '/api/*': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true,
      },
    }
  }
}


// vue.config.js
// module.exports = {
//   devServer: {
//     disableHostCheck: true,
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     },
//     proxy: {
//       '/auth': {
//         target: 'http://10.7.200.229',
//         // target: 'http://dev-corp-plan.dhas.com:5000',
//         ws: true,
//         changeOrigin: true,
//       },
//       '/api/*': {
//         target: 'http://10.7.200.229',
//         // target: 'http://dev-corp-plan.dhas.com:5000',
//         ws: true,
//         changeOrigin: true,
//       },
//     }
//   }
// }