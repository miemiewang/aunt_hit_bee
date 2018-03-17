/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width=  0, height = 0, touchend = false, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y
    this.angle = 0
    this.visible = true
    this.touchend = touchend
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return
      console.log(this.x+'y' +this.y)
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  rotateToCanvas(ctx) {
    if (!this.touchend) return false;
    if (this.angle > 90) {
      this.angle = 90
      //this.touchend = false;
    }
    this.angle += 2;
    ctx.save()
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    ctx.rotate(this.angle * Math.PI / 180)
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    ctx.restore()
  }
  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if ( !this.visible || !sp.visible )
      return false

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  )
  }
}
