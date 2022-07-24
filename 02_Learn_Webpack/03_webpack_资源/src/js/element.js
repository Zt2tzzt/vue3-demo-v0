/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:49:06
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-10-04 15:10:50
 * @LastEditContent: 
 */
import '../css/style.css';
import '../css/title.less';
import '../css/image.css';
import '../font/iconfont.css'

import wuwuImg from '../img/wuwu.jpg';
 
const divEl = document.createElement('div')
divEl.className = 'title'
divEl.innerHTML = '你好啊，李银河'

// 设置背景图片
const bgDivEl = document.createElement('div')
bgDivEl.className = 'image-bg'

// 设置img元素的src
const imgEl = document.createElement('img')
imgEl.src = wuwuImg

// i元素
const iEl = document.createElement('i')
iEl.className = 'iconfont icon-ashbin'

document.body.appendChild(divEl)
document.body.appendChild(bgDivEl)
document.body.appendChild(imgEl)
document.body.appendChild(iEl)