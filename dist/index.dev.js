(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ATAmbient = factory());
}(this, (function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "@charset \"UTF-8\";\n/* 自定义样式 */\n.o2team_ambient_main {\n  z-index: 999;\n  pointer-events: none;\n  height: 1000px; }\n";
  styleInject(css);

  const id = 'parallax';
  const ID = id.toUpperCase();
  const O2_AMBIENT_MAIN = `O2_AMBIENT_${ID}_MAIN`;
  const O2_AMBIENT_INIT = `O2_AMBIENT_${ID}_INIT`;
  const O2_AMBIENT_CONFIG = `O2_AMBIENT_${ID}_CONFIG`;

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  (function () {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
      window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] || window[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();

  /*! Canvallax, v1.2.1 (built 2015-11-13) https://github.com/shshaw/Canvallax.js @preserve */
  !function(){function a(a,b){return a.zIndex===b.zIndex?0:a.zIndex<b.zIndex?-1:1}function b(){this.width=this.width?this.width:this.image.width,this.height=this.height?this.height:this.image.height;}var c=window,d=document,e=d.documentElement,f=d.body,g=c.requestAnimationFrame||c.mozRequestAnimationFrame||c.webkitRequestAnimationFrame||c.msRequestAnimationFrame||c.oRequestAnimationFrame||function(a){c.setTimeout(a,20);},h=function(){},i={tracking:"scroll",trackingInvert:!1,x:0,y:0,damping:1,canvas:void 0,className:"",parent:document.body,elements:void 0,animating:!0,fullscreen:!0,preRender:h,postRender:h},j=!1,k=0,l=0,m=function(){k=e.scrollLeft||f.scrollLeft,l=e.scrollTop||f.scrollTop;},n=!1,o=0,p=0,q=function(a){o=a.touches?a.touches[0].clientX:a.clientX,p=a.touches?a.touches[0].clientY:a.clientY;};if(!c.CanvasRenderingContext2D)return c.Canvallax=function(){return !1};c.Canvallax=function s(a){if(!(this instanceof s))return new s(a);var b=this;return s.extend(this,i,a),b.canvas=b.canvas||d.createElement("canvas"),b.canvas.className+=" canvallax "+b.className,b.parent.insertBefore(b.canvas,b.parent.firstChild),b.fullscreen?(b.resizeFullscreen(),c.addEventListener("resize",b.resizeFullscreen.bind(b))):b.resize(b.width,b.height),b.ctx=b.canvas.getContext("2d"),b.elements=[],a&&a.elements&&b.addElements(a.elements),b.damping=!b.damping||b.damping<1?1:b.damping,b.render(),b},Canvallax.prototype={_x:0,_y:0,add:function(b){for(var c=b.length?b:arguments,d=c.length,e=0;d>e;e++)this.elements.push(c[e]);return this.elements.sort(a),this},remove:function(a){var b=this.elements.indexOf(a);return b>-1&&this.elements.splice(b,1),this},render:function(){var a=this,b=0,d=a.elements.length,e=0,f=0,h=a.fullscreen||"pointer"!==a.tracking;for(a.animating&&(a.animating=g(a.render.bind(a))),a.tracking&&("scroll"===a.tracking?(j||(j=!0,m(),c.addEventListener("scroll",m),c.addEventListener("touchmove",m)),a.x=k,a.y=l):"pointer"===a.tracking&&(n||(n=!0,c.addEventListener("mousemove",q),c.addEventListener("touchmove",q)),h||(e=a.canvas.offsetLeft,f=a.canvas.offsetTop,h=o>=e&&o<=e+a.width&&p>=f&&p<=f+a.height),h&&(a.x=-o+e,a.y=-p+f)),a.x=!h||a.trackingInvert!==!0&&"invertx"!==a.trackingInvert?a.x:-a.x,a.y=!h||a.trackingInvert!==!0&&"inverty"!==a.trackingInvert?a.y:-a.y),a._x+=(-a.x-a._x)/a.damping,a._y+=(-a.y-a._y)/a.damping,a.ctx.clearRect(0,0,a.width,a.height),a.preRender(a.ctx,a);d>b;b++)a.ctx.save(),a.elements[b]._render(a.ctx,a),a.ctx.restore();return a.postRender(a.ctx,a),this},resize:function(a,b){return this.width=this.canvas.width=a,this.height=this.canvas.height=b,this},resizeFullscreen:function(){return this.resize(c.innerWidth,c.innerHeight)},play:function(){return this.animating=!0,this.render()},pause:function(){return this.animating=!1,this}},Canvallax.createElement=function(){function a(a){var c=b(a);return a._pointCache&&a._pointChecksum===c||(a._pointCache=a.getTransformPoint(),a._pointChecksum=c),a._pointCache}function b(a){return [a.transformOrigin,a.x,a.y,a.width,a.height,a.size].join(" ")}var c=Math.PI/180,d={x:0,y:0,distance:1,fixed:!1,opacity:1,fill:!1,stroke:!1,lineWidth:!1,transformOrigin:"center center",scale:1,rotation:0,preRender:h,render:h,postRender:h,init:h,crop:!1,getTransformPoint:function(){var a=this,b=a.transformOrigin.split(" "),c={x:a.x,y:a.y};return "center"===b[0]?c.x+=a.width?a.width/2:a.size:"right"===b[0]&&(c.x+=a.width?a.width:2*a.size),"center"===b[1]?c.y+=a.height?a.height/2:a.size:"bottom"===b[1]&&(c.y+=a.height?a.height:2*a.size),c},_render:function(b,d){var e=this,f=e.distance||1,g=d._x,h=d._y,i=a(e);return e.preRender.call(e,b,d),e.blend&&(d.ctx.globalCompositeOperation=e.blend),d.ctx.globalAlpha=e.opacity,d.ctx.translate(i.x,i.y),e.scale===!1?(g*=f,h*=f):d.ctx.scale(f,f),e.fixed||d.ctx.translate(g,h),e.scale!==!1&&d.ctx.scale(e.scale,e.scale),e.rotation&&d.ctx.rotate(e.rotation*c),d.ctx.translate(-i.x,-i.y),e.crop&&(b.beginPath(),"function"==typeof e.crop?e.crop.call(e,b,d):b.rect(e.crop.x,e.crop.y,e.crop.width,e.crop.height),b.clip(),b.closePath()),e.outline&&(b.beginPath(),b.rect(e.x,e.y,e.width||2*e.size,e.height||2*e.size),b.closePath(),b.strokeStyle=e.outline,b.stroke()),e.render.call(e,b,d),this.fill&&(b.fillStyle=this.fill,b.fill()),this.stroke&&(this.lineWidth&&(b.lineWidth=this.lineWidth),b.strokeStyle=this.stroke,b.stroke()),e.postRender.call(e,b,d),e},clone:function(a){var a=Canvallax.extend({},this,a);return new this.constructor(a)}};return function(a){function b(a){return this instanceof b?(Canvallax.extend(this,a),this.init.apply(this,arguments),this):new b(a)}return b.prototype=Canvallax.extend({},d,a),b.prototype.constructor=b,b.clone=b.prototype.clone,b}}(),Canvallax.extend=function(a){a=a||{};var b=arguments.length,c=1;for(1===arguments.length&&(a=this,c=0);b>c;c++)if(arguments[c])for(var d in arguments[c])arguments[c].hasOwnProperty(d)&&(a[d]=arguments[c][d]);return a};var r=2*Math.PI;Canvallax.Circle=Canvallax.createElement({size:20,render:function(a){a.beginPath(),a.arc(this.x+this.size,this.y+this.size,this.size,0,r),a.closePath();}}),Canvallax.Element=Canvallax.createElement(),Canvallax.Image=Canvallax.createElement({src:null,image:null,width:null,height:null,init:function(a){this.image=this.image&&1===this.image.nodeType?this.image:a&&1===a.nodeType?a:new Image,b.bind(this)(),this.image.onload=b.bind(this),this.image.src=this.image.src||a.src||a;},render:function(a){this.image&&a.drawImage(this.image,this.x,this.y,this.width,this.height);}});var r=2*Math.PI;Canvallax.Polygon=Canvallax.createElement({sides:6,size:20,render:function(a){var b=this.sides;for(a.translate(this.x+this.size,this.y+this.size),a.beginPath(),a.moveTo(this.size,0);b--;)a.lineTo(this.size*Math.cos(b*r/this.sides),this.size*Math.sin(b*r/this.sides));a.closePath();}}),Canvallax.Rectangle=Canvallax.createElement({width:100,height:100,render:function(a){a.beginPath(),a.rect(this.x,this.y,this.width,this.height),a.closePath();}});}();

  class Parallax {
    constructor({
      textures = [],
      particleNumber = 400,
      width = document.body.clientWidth,
      height = document.body.clientHeight,
      damping = 20,
      isFullScreen = true
    }) {
      this.width = width;
      this.height = height;
      this.particleNumber = particleNumber;
      this.textures = textures;
      this.damping = damping;
      this.isFullScreen = isFullScreen;
      this.init();
    }

    init() {
      this.canvallax = Canvallax({
        damping: this.damping,
        parent: document.querySelector('.o2team_ambient_main'),
        fullscreen: false,
        width: this.width,
        height: this.height
      });

      if (this.isFullScreen) {
        window.addEventListener('resize', () => {
          let width = document.body.clientWidth === this.width ? this.width : document.body.clientWidth;
          let height = document.body.clientHeight === this.height ? this.height : document.body.clientHeight;
          this.canvallax.resize(width, height);
        });
      }

      this.create();
    }

    create() {
      let stars = [],
          number = this.particleNumber,
          i = 0,
          distance,
          width = this.width,
          height = this.height;
      let isTexture = this.textures.length;

      for (; i < number; i++) {
        distance = this._randomRange(0.25, 0.9);
        let obj;

        if (isTexture) {
          let idx = Math.round(this._randomRange(0, this.textures.length - 1));
          obj = Canvallax.Image({
            x: Math.random() * width * (2 - distance),
            y: Math.random() * height * (2 - distance),
            distance: distance,
            size: 2,
            src: this.textures[idx]
          });
        } else {
          obj = Canvallax.Circle({
            x: Math.random() * width * (2 - distance),
            y: Math.random() * height * (2 - distance),
            distance: distance,
            size: 2,
            fill: '#FFF'
          });
        }

        stars.push(obj);
      }

      this.canvallax.add(stars);
    }

    reset() {
      let newConf = window[O2_AMBIENT_CONFIG];
      Object.keys(newConf).forEach(key => {
        if (key === 'textures') {
          Object.keys(newConf['textures']).forEach((tKey, idx) => {
            if (/\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/.test(newConf['textures'][tKey])) {
              this.textures[idx] = newConf['textures'][tKey];
            }
          });
        } else {
          this[key] = newConf[key];
        }
      }); //  this[key] = newConf[key]

      document.querySelector('.o2team_ambient_main').removeChild(this.canvallax.canvas);
      this.init();
    }

    resize(width, height) {
      this.canvallax.resize(width, height);
    }

    _randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }

  }

  let wrapper = document.querySelector('.o2team_ambient_main');

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'o2team_ambient_main');
    wrapper.setAttribute('id', 'o2team_ambient_main');
    document.body.insertAdjacentElement('beforeend', wrapper);
  }

  wrapper.addEventListener('click', () => {
    wrapper.style.display = 'none';
  }); // 初始化函数

  function initAmbient(opts) {
    let parallax = new Parallax(opts); // 主函数暴露

    window[O2_AMBIENT_MAIN] = parallax;
  } // 初始化函数

  window[O2_AMBIENT_INIT] = initAmbient;

  window[O2_AMBIENT_CONFIG] = {
    particleNumber: 20,
    fullScreen: true,
    textures: ['//storage.jd.com/o2images/34cafbecea6d24c062ea5177adbb42d1.png', '//storage.jd.com/o2images/92da6c3db10b3984491a6089f58da2bb.png']
  };

  function rollup_index (opts) {
    opts && Object.keys(window[O2_AMBIENT_CONFIG]).forEach(key => {
      if (typeof opts[key] === 'undefined') return;
      window[O2_AMBIENT_CONFIG][key] = opts[key];
    });
    initAmbient(window[O2_AMBIENT_CONFIG]);
  }

  return rollup_index;

})));
