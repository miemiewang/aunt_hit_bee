import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataManage {

  constructor() {
    if (instance)
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame = 0
    this.score = 0
    this.bees = []
    this.flys = []
    this.gameover = false
    this.touchend = false
  }

  /**
   * 回收蜜蜂，进入对象池
   * 此后不进入帧循环
   */
  removeBee(bee) {
    let temp = this.bees.shift()

    temp.visible = false

    this.pool.recover('bee', bee)
  }

  removeFly(fly) {
    let temp = this.flys.shift()

    temp.visible = false

    this.pool.recover('fly', fly)
  }
}