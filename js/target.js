import DataManage from './datamanage'
import Player from './player/aunt'
import BackGround from './runtime/background'
import Animal from './npc/animal.js'

let ctx = canvas.getContext('2d')

ctx.fillStyle = "rgb(200,0,0)";
ctx.fillRect(10, 10, 55, 50);

ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fillRect(30, 30, 55, 50);
let datamanage = new DataManage()

export default class Target {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()
    this.bindLoop = this.loop.bind(this)
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  restart() {
    datamanage.reset()
    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.recreateAnimal();

  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)

    datamanage.bees
      .concat(datamanage.flys)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    if (datamanage.gameOver) {
      // this.gameinfo.renderGameOver(ctx, databus.score)

      // if (!this.hasEventBind) {
      //   this.hasEventBind = true
      //   this.touchHandler = this.touchEventHandler.bind(this)
      //   canvas.addEventListener('touchstart', this.touchHandler)
      // }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    //this.bg.update()

    if (datamanage.gameOver)
      return;

    datamanage.bees
      .concat(datamanage.flys)
      .forEach((item) => {
        item.update()
      })

    this.collisionDetection()
  }

  loop() {
    datamanage.frame++;
    this.update();
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  recreateAnimal() {
      let bee = datamanage.pool.getItemByClass('bee', Animal)
      bee.init()
      datamanage.bees.push(bee)

      let bee1 = datamanage.pool.getItemByClass('bee', Animal)
      bee1.init()
      datamanage.bees.push(bee1)

      let fly = datamanage.pool.getItemByClass('fly', Animal)
      fly.init()
      datamanage.flys.push(fly)
  }

  // 全局碰撞检测
  collisionDetection() {

    for (let i = 0, il = datamanage.bees.length; i < il; i++) {
      let bee = datamanage.bees[i]

      if (this.player.isCollideWith(bee)) {
        datamanage.gameOver = true

        break
      }
    }

    for (let i = 0, il = datamanage.flys.length; i < il; i++) {
      let fly = datamanage.flys[i]

      if (this.player.isCollideWith(fly)) {
        datamanage.score ++
        this.restart()
        break
      }
    }
  }
}