/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-03-15 17:40:55
 */
/*
 * 导航栏设置
 */
module.exports = [
  { text: '首页', link: '/' },
  { text: '项目简介', link: '/about/' },
  {
    text: '模块一',
    link: '/module-1/'
  },
  {
    text: '模块二',
    items: [
      { text: '数据库', link: '/after-end/sql/' },
      { text: '接口', link: '/after-end/server/' }
    ]
  }
]
