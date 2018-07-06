import 'canvallax' 
import { O2_AMBIENT_CONFIG } from './utils/const';

export default class Parallax {
  constructor ({
    textures = [],
    particleNumber = 400,
    width = document.body.clientWidth,
    height = document.body.clientHeight,
    damping = 20,
    isFullScreen = true
  }) {
    this.width = width
    this.height = height
    this.particleNumber = particleNumber
    this.textures = textures
    this.damping = damping
    this.isFullScreen = isFullScreen

    this.init()
    
  }

  init () {  
    this.canvallax = Canvallax({ 
      damping: this.damping, 
      parent: document.querySelector('.o2team_ambient_main'),
      fullscreen: false,
      width: this.width,
      height: this.height
    })

    if (this.isFullScreen) {
      window.addEventListener('resize', () => {
        let width = document.body.clientWidth === this.width ? this.width : document.body.clientWidth
        let height = document.body.clientHeight === this.height ? this.height : document.body.clientHeight
        this.canvallax.resize(width, height)
      })
    }

    this.create()
  }

  create () {  
    let stars = [],
        number = this.particleNumber,
        i = 0,
        distance,
        width = this.width,
        height = this.height
    
    let isTexture = this.textures.length 

    for (; i < number; i++) {
      distance = this._randomRange(0.25, 0.9)
      let obj
      if (isTexture) {        
        let idx = Math.round(this._randomRange(0, this.textures.length - 1))
        
        obj = Canvallax.Image({
          x: Math.random() * width * (2 - distance),
          y: Math.random() * height * (2 - distance),
          distance: distance,
          size: 2,
          src: this.textures[idx]
        })
      } else {
        obj = Canvallax.Circle({
          x: Math.random() * width * (2 - distance),
          y: Math.random() * height * (2 - distance),
          distance: distance,
          size: 2,
          fill: '#FFF'
        })
      }

      stars.push(obj)
    }

    this.canvallax.add(stars)
  }

  reset () {
    let newConf = window[O2_AMBIENT_CONFIG]
    
    Object.keys(newConf).forEach(key => {
      if (key === 'textures') {
        Object.keys(newConf['textures']).forEach((tKey, idx) => {
          if (/\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/.test(newConf['textures'][tKey])) {
            this.textures[idx] = newConf['textures'][tKey]
          } 
        })
      } else {
        this[key] = newConf[key]
      }  
    })

   //  this[key] = newConf[key]
    
    document.querySelector('.o2team_ambient_main').removeChild(this.canvallax.canvas)
    this.init()
  }

  resize (width, height) {
    this.canvallax.resize(width, height)
  }

  _randomRange (min, max) {
    return Math.random() * (max - min) + min
  }
}