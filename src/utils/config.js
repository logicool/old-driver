/**
 * Created by Gaohan on 2017/5/11.
 */

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: 'http://192.168.1.112:8899/',
  openPages: ['/login'],
  api: {
    pageList: '/page/:page',
    details: '/detail/:id',
  },
};
