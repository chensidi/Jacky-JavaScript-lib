const createZan = (canvasDom: HTMLCanvasElement) => {
  const ctx = canvasDom.getContext('2d')
  initCanvas(canvasDom, ctx!)
  createManyRects(ctx!, canvasDom, 66)
}

function initCanvas(
  canvasDom: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const { width, height } = canvasDom
  ctx!.clearRect(0, 0, width, height)
  ctx!.fillStyle = 'rgba(255, 255, 255, 0)'
  ctx!.fillRect(0, 0, width, height)
}

function changeAnimation(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  pos: { x: number; y: number },
  i: number,
  count: number
) {

  const angle = getAngle(60, 120, i, count)
  let { x, y } = pos
  const { height } = canvasDom
  const color = getColors()
  const minOpacity = 0.6,
    maxOpacity = 1,
    maxInc = 0.04,
    minInc = 0.01
  
  let initSpeedX = Math.cos(angle * Math.PI / 180) * 10 * (
    1 - Math.floor(i / 10) * 0.1 
  ),
    initSpeedY = Math.abs(Math.sin(angle * Math.PI / 180) * 10) * (
      1 - Math.floor(i / 10) * 0.1
    ) + getRandom(1, 3)

  const upG = -0.6,
        downG = -0.2
    
  let curOpacity = minOpacity
  const [drawHandle, clearHandle] = getDrawHandle(ctx)
  const startShow = () => {
    clearHandle(x, y)
    const inc = Math.random() * (maxInc - minInc) + minInc
    curOpacity += inc
    if (curOpacity >= maxOpacity) {
      curOpacity = maxOpacity
    }
    const style = `rgba(${color}, ${curOpacity})`
    ctx.fillStyle = style
    const {
      x: _x,
      y: _y
    } = move(initSpeedX, initSpeedY, upG)
    initSpeedX = _x
    initSpeedY = _y
    x = Math.floor(initSpeedX + x)
    y = Math.floor(y - initSpeedY)
    drawHandle(x, y)
    if (initSpeedY <= 0) {
      startHide()
    } else {
      window.requestAnimationFrame(startShow)
    }
  }

  const startHide = () => {
    clearHandle(x, y)
    const dec = Math.random() * (maxInc - minInc) + minInc
    curOpacity -= dec
    if (curOpacity <= minOpacity) {
      curOpacity = minOpacity
    }
    const style = `rgba(${color}, ${curOpacity})`
    ctx.fillStyle = style
    const {
      x: _x,
      y: _y
    } = move(initSpeedX, initSpeedY, downG)
    initSpeedX = _x
    initSpeedY = _y
    x = Math.floor(initSpeedX + x)
    y = Math.floor(y - initSpeedY)
    drawHandle(x, y)
    if (y >= height * 0.9) {
      clearHandle(x, y)
      return
    } else {
      window.requestAnimationFrame(startHide)
    }
  }

  window.requestAnimationFrame(startShow)
}

function createManyRects(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  num: number
) {
  const pos = getRandomPostion(canvasDom)
  for (let i = 0; i < num; i++) {
    changeAnimation(ctx, canvasDom, pos, i, num)
  }
}

function getRandomPostion(canvasDom: HTMLCanvasElement) {
  const { width, height } = canvasDom
  const x = getRandom(width / 2 - 25, width / 2 + 25)
  const y = getRandom(height - 50, height)

  return { x, y }
}

function getRandom(min: number, max: number, point = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(point)
}

function move(speedX: number, speedY: number, g: number) {
  if (speedX > 0) {
    speedX -= 0.02
    if (speedX <= 0) {
      speedX = 0
    }
  }
  if (speedX < 0) {
    speedX += 0.02
    if (speedX >= 0) {
      speedX = 0
    }
  }
  return {
    x: speedX,
    y: speedY + g
  }  
}

const colors = [
  '25, 137, 250',
  '7, 193, 96',
  '238, 10, 36',
  '255, 151, 106',
  '114, 50, 221'
]
function getColors() {
  const idx = getRandom(0, colors.length)
  return colors[idx]
}

function getAngle(start: number, end: number, idx: number, count: number) {
  const itemAngle = (end - start) / count * (count / 10)
  return itemAngle * (idx % 10) + start + getRandom(-6, 6)
}

function getDrawHandle(ctx: CanvasRenderingContext2D) {
  const num = Math.random() > 0.6
  if (num) {
    return [(x: number, y: number) => ctx.fillRect(x, y, 6, 6), (x: number, y: number) => ctx.clearRect(x, y, 6, 6)]
  }
  const drawCircle = (x: number, y: number) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x, y, 3, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
  }
  const clearCircle = (x: number, y: number) => {
    ctx.clearRect(x - 3, y - 3, 6, 6)
  }
  return [drawCircle, clearCircle]
}

export {
  createZan,
}
