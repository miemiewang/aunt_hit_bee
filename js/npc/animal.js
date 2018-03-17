import Animation from '../base/animation'
import DataBus from '../databus'
import DataManage from '../datamanage.js'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 20
const ENEMY_HEIGHT = 20

const __ = {
  speed: Symbol('speed')
}

let dataManage = new DataManage()

export default class Animal extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.xspeed = 0
    this.yspeed = 0
    // this.init(ENEMY_IMG_SRC)
  }

  init(image) {
    this.x =  window.innerWidth / 2
    this.y = window.innerHeight / 2
    this.img.src = image

    this.visible = true
  }

  update() {
    this.xspeed = Math.floor(Math.random() * 5) - 2
    this.yspeed = Math.floor(Math.random() * 5) - 2

    this.x +=this.xspeed
    this.y +=this.yspeed
    // // 对象回收
    // if (this.x < 0)
    //   dataManage.removeBee(this)
  }

} 