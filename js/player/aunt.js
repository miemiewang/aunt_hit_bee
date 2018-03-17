import Sprite from '../base/sprite'
import DataManage from '../datamanage'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 80

let datamanage = new DataManage()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部左边位置
    this.x = 0
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在拍子上了
    this.touchend = false
    // 触摸开始时间
    this.start = 0
    // 触摸移动时间
    this.move = 0
    // 触摸结束时间
    this.end = 0
    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在拍子上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在拍子上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation)
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      // this.width = PLAYER_WIDTH
      // this.height = PLAYER_HEIGHT
      // this.angle = 0
      // this.y = screenHeight - this.height - 30
      // this.touchend = false;
      // datamanage.touchend = false;
      this.start = new Date()
      console.log(10);
    }).bind(this))
    canvas.addEventListener('touchmove', ((e) => {
      // this.move = new Date()
      // this.touchend = false;
      // datamanage.touchend = false;
      // this.setBatSize(this.start, this.move)
    }).bind(this))
    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      // this.touchend = true;
      // datamanage.touchend = true;
    }).bind(this))
  }
  // 设置拍子大小
  setBatSize(x, y) {
    // let interval = (y - x)/500;
    // 向上拉伸拍子
    // this.height += interval;
    // this.y -= interval;
  }
}