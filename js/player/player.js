import Sprite from '../base/sprite'
import DataManage from '../datamanage'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_WIDTH = 10
const PLAYER_HEIGHT = 10

let datamanage = new DataManage()

export default class Player extends Sprite {
  constructor() {
    super('', PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部左边位置
    this.x = 0
    this.y = screenHeight - this.height - 30

    // 初始化事件监听
    this.initEvent()
  }
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      this.x = e.touches[0].clientX
      this.y = e.touches[0].clientY
      datamanage.touchend = false;
      // if (this.checkIsFingerOnAir(x, y)) {
      //   this.touched = true

      //   this.setAirPosAcrossFingerPosZ(x, y)
      // }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      datamanage.touchend = false;
      // let x = e.touches[0].clientX
      // let y = e.touches[0].clientY

      // if (this.touched)
      //   this.setAirPosAcrossFingerPosZ(x, y)
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      datamanage.touchend = true;
    }).bind(this))
  }
}


