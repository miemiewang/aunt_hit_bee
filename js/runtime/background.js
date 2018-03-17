import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg4.png'
const BG_IMG_SRC2 = 'images/sun.png'
const BG_WIDTH     = 412
const BG_HEIGHT    = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.angle = 0
    this.img2 = new Image()
    this.img2.src = BG_IMG_SRC2
    this.render(ctx)
    this.rotateToCanvas(ctx)
    this.top = 0
    this.right = 0

  }

  update() {
    // this.top += 2
    //this.right += 2

    // if ( this.top >= screenHeight ) {
    //   this.top = 0
    // }
    // if ( this.right >= screenWidth ) {
    //   this.right = 0
    // }
    this.angle += 2
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.right,
      0,
      // -screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.right,
      0,
      // this.top,
      screenWidth,
      screenHeight
    )
  }
  rotateToCanvas(ctx) {
    ctx.save()
    ctx.translate(this.x + 78 / 2, this.y + 78 / 2)
    ctx.rotate(this.angle * Math.PI / 180)
    ctx.drawImage(
      this.img2,
       -78 / 2, 
       -78 / 2, 
       78, 
       78
    )
    ctx.restore()
  }
}
