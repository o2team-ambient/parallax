import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './utils/const'

import Parallax from './parallax'

let wrapper = document.querySelector('.o2team_ambient_main')
if (!wrapper) {
  wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'o2team_ambient_main')
  wrapper.setAttribute('id', 'o2team_ambient_main')
  document.body.insertAdjacentElement('beforeend', wrapper)
}
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

// 初始化函数
export default function initAmbient (opts) {
  let parallax = new Parallax(opts)
  // 主函数暴露
  window[O2_AMBIENT_MAIN] = parallax
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient
