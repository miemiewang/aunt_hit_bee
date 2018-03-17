import DataManage from './datamanage'
import Player from './player/player'
import BackGround from './runtime/background'
import Animal from './npc/animal.js'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'

let BEE_IMAGE = 'images/bee.png'
let FLY_IMAGE = 'images/fly.png'

let ctx = canvas.getContext('2d')

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
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.recreateAnimal();

  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  // 全局碰撞检测, 碰撞到蜜蜂死掉，碰撞到苍蝇加分

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
    datamanage.bees
      .concat(datamanage.flys)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })
  
    this.gameinfo.renderGameScore(ctx, datamanage.score)
    // 游戏结束停止帧循环
    if (datamanage.gameOver) {
      this.gameinfo.renderGameOver(ctx, datamanage.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (datamanage.gameOver)
      return;
    //this.bg.update()

    if (datamanage.gameOver)
      return;

    datamanage.bees
      .concat(datamanage.flys)
      .forEach((item) => {
        item.update()
      })

    this.collisionDetection()
    this.music.playShoot()
    // 手指触摸结束后碰撞检测
    if(datamanage.touchend){
      this.collisionDetection();
    }
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
      bee.init(BEE_IMAGE)
      datamanage.bees.push(bee)

      let bee1 = datamanage.pool.getItemByClass('bee', Animal)
      bee1.init(BEE_IMAGE)
      datamanage.bees.push(bee1)

      let fly = datamanage.pool.getItemByClass('fly', Animal)
      fly.init(FLY_IMAGE)
      datamanage.flys.push(fly)
  }

  // // 全局碰撞检测, 碰撞到蜜蜂死掉，碰撞到苍蝇加分
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