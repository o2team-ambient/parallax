/*
 * 控制面板初始化代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.message = '视差滚动'
      this.backgroundColor = '#000'
      this.fullScreen = true
      
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.play = () => {
        window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      this.isShowController && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      let widCtrl, heiCtrl, sizeFolder
      
      gui.add(otherConfig, 'fullScreen').name('全屏展示').onFinishChange(val => {
        this.config.fullScreen = val  
        this.resetCanvas()

        if (!val) {
          sizeFolder = gui.addFolder('尺寸')
          widCtrl = sizeFolder.add(otherConfig, 'width').name('宽度').onFinishChange(val => {
            this.config.width = val
            this.resetCanvas()
          })
          heiCtrl = sizeFolder.add(otherConfig, 'height').name('高度').onFinishChange(val => {
            this.config.height = val 
            this.resetCanvas()
          })
          sizeFolder.open()
        } else {
          if (widCtrl && heiCtrl) {
            gui.removeFolder(sizeFolder)
          }  
        }
      })
      // gui.add(otherConfig, 'play').name('播放 / 暂停')
      config.particleNumber && gui.add(config, 'particleNumber', 3, 1000, 1).name('粒子数量').onFinishChange(val => {
        // window[O2_AMBIENT_INIT]()
        this.resetCanvas()
      })
      this.gui = gui
      this.setGUIzIndex(2)
      this.initTextureGUI()
    }

    initTextureGUI () {
      const gui = this.gui
      const textures = this.config.textures
      const texturesFolder = gui.addFolder('纹理')
      textures && Object.keys(textures).forEach((key, idx) => {
        const textureController = texturesFolder.add(textures, key).name(`纹理${idx + 1}`)
        textureController.onFinishChange(val => {
          this.resetCanvas({textures: {val, idx}})
        })
      })

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
