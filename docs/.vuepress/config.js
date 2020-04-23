/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-16 23:02:30
 */

module.exports = {
  base:'/web-fedse/',
  title: '诸城重构2.0',
  description: '这里是诸城重构2.0项目文档',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    // lineNumbers: true // 代码块显示行号
  },
  locales: {
    '/': {
      lang: 'zh-CN' // 多语言设置
    }
  },
  themeConfig: {
    //导航栏 logo
    logo: 'http://img.rain7.top/rain7.top.logo.png',

    // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    sidebarDepth: 1,

    // 文档更新时间：每个文件git最后提交的时间
    lastUpdated: '上次更新',

    // 导航栏设置
    nav: require('./thermeConfig/Nav.js'),

    // 侧边栏
    displayAllHeaders: true,
    activeHeaderLinks: true,
    sidebar: 'auto'
    // sidebar: require("./thermeConfig/Sidebar.js")
  },
  plugins: ['@vuepress/back-to-top']
}
