import Animation from '../base/animation'
import DataManage from '../datamanage.js'

const ENEMY_IMG_SRC = 'images/fly.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40

const __ = {
  speed: Symbol('speed')
}

let dataManage = new DataManage()

export default class Animal extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.num = 0
    this.startx = 0
    this.startY = 0
    this.maxvalue = 0
    this.speed = 0
    this.multipleNumX = 0
    this.multipleNumY = 0
    this.numSpeed = 0
  }

  init() {

    this.x = 0
    this.y = Math.floor(Math.random() * window.innerHeight) + 200
    this.startx = this.x
    this.starty = this.y
    this.num = 0
    this.maxvalue = Math.floor(Math.random() * 50)
    this.speed = Math.floor(Math.random() * 2) + 3
    this.multipleNumX = Math.floor(Math.random() * 2) + 2
    this.multipleNumY = Math.floor(Math.random() * 2) + 2
    this.numSpeed = Math.floor(Math.random() * 2) + 2
    this.visible = true
  }

  update() {
    if (this.x > window.innerWidth ||
      this.y > window.innerHeight ||
      this.y < 0) {
      this.x = 0
      this.y = Math.floor(Math.random() * window.innerHeight)
      this.startx = this.x
      this.starty = this.y
      this.num = 0
      this.maxvalue = Math.floor(Math.random() * 50) + 1
      this.speed = Math.floor(Math.random() * 2) + 2
      this.multipleNumX = Math.floor(Math.random() * 2) + 2
      this.multipleNumY = Math.floor(Math.random() * 2) + 2
      this.numSpeed = Math.floor(Math.random() * 3) + 2
    }

    this.num = this.num + this.numSpeed

    this.x = this.startx + this.multipleNumX * (this.num * Math.PI / 180) * this.maxvalue
    this.y = this.starty + this.multipleNumY * Math.sin(this.num * Math.PI / 180) * this.maxvalue

  }

} 