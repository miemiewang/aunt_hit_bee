import DataManage from './datamanage'
import Player from './player/aunt'
import BackGround from './runtime/background'

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

  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
    this.player.drawToCanvas(ctx)
    this.player.rotateToCanvas(ctx)
  }
  // 游戏逻辑更新主函数
  update() {
    //this.bg.update()
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
}