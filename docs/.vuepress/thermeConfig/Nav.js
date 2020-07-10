/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-03-15 17:40:55
 */
/*
 * 导航栏设置
 */
module.exports = [{
    text: '首页',
    link: '/'
}, {
    text: '项目简介',
    link: '/about/'
}, {
    text: '目录',
    items: [{
        text: '模块一',
        link: '/module-1/'
    }, {
        text: '模块二',
        link: '/module-2/'
    }, {
        text: '彻底掌握 H5 新特性和 Hybrid 混合开发',
        link: '/module-3/'
    }]
}]