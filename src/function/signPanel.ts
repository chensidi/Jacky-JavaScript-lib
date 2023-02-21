const signPanel = (
  dom: HTMLElement,
  { width = 300, height = 500, color = 'blue', penWidth = 1, bg = 'white' } = {}
) => {
  const wrap = document.createElement('div')
  const canvasDom = document.createElement('canvas')
  canvasDom.width = width
  canvasDom.height = height
  const eraser = createCanvasEraser(wrap)
  const ctx = canvasDom.getContext('2d')
  wrap.appendChild(canvasDom)
  const tools = createTools(ctx!, { width, penWidth, bg })
  dom.appendChild(wrap)
  dom.appendChild(tools)
  initCanvas(canvasDom, ctx!, bg)
  listenMouse(canvasDom, ctx!)

  ctx!.lineWidth = penWidth
  ctx!.strokeStyle = color

  function listenMouse(
    canvasDom: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    let down = false

    canvasDom.addEventListener('mousedown', e => {
      const { x, y } = e
      down = true
      ctx.beginPath()
      const [_x, _y] = getPosition(canvasDom, x, y)
      ctx.moveTo(_x, _y)
    })
    canvasDom.addEventListener('mousemove', e => {
      const { x, y } = e
      const [_x, _y] = getPosition(canvasDom, x, y)
      if (down) {
        drawLine(ctx, _x, _y)
      }
    })
    canvasDom.addEventListener('mouseup', e => {
      down = false
      ctx.closePath()
    })
    canvasDom.addEventListener('mouseleave', () => {
      down = false
      ctx.closePath()
    })
    wrap.addEventListener('mousemove', e => {
      const { x, y } = e
      const [_x, _y] = getPosition(canvasDom, x, y)
      let $x = _x - 17.5
      let $y = _y - 17.5
      $x <= 0 && ($x = 0)
      $y <= 0 && ($y = 0)
      $x >= width - 35 && ($x = width - 35)
      $y >= height - 35 && ($y = height - 35)
      eraser.style.left = $x + 'px'
      eraser.style.top = $y + 'px'
      if (down) {
        drawLine(ctx, _x, _y)
      }
    })
    wrap.addEventListener('mouseleave', () => {
      eraser.style.display = 'none'
      down = false
    })
    wrap.addEventListener('mousedown', () => {
      down = true
    })
  }

  function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

let rect: DOMRect | null = null
function getPosition(canvasDom: HTMLCanvasElement, x: number, y: number) {
  if (!rect) {
    rect = canvasDom.getBoundingClientRect()
  }
  const { left, top } = rect
  return [x - left, y - top]
}

function initCanvas(
  canvasDom: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  bg: string
) {
  const { width, height } = canvasDom
  ctx!.clearRect(0, 0, width, height)
  ctx!.fillStyle = bg
  ctx!.fillRect(0, 0, width, height)
}

// 画笔颜色
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'grey']
// 创建画笔工具栏
function createTools(
  ctx: CanvasRenderingContext2D,
  {
    width,
    penWidth,
    bg,
    eraser,
  }: {
    width: number
    penWidth: number
    bg: string
    eraser?: HTMLElement
  }
) {
  const tools = document.createElement('div')
  tools.style.cssText = `
    width: ${width}px;
    height: 50px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  `
  // 生成不同颜色画笔
  colors.forEach(color => {
    const pen = document.createElement('div')
    pen.style.cssText = `
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: ${color};
      cursor: pointer;
      transition: all .3s;
    `
    pen.addEventListener('click', () => {
      ctx.strokeStyle = color
      ctx.lineWidth = penWidth
      const pens = tools.getElementsByTagName('div')
      Array.from(pens).forEach(item => {
        item.style.transform = ``
      })
      pen.style.transform = `scale(1.25)`
    })
    tools.appendChild(pen)
  })

  // 生成橡皮擦
  tools.appendChild(
    createEraser(ctx, {
      bg,
      eraserDom: eraser,
    })
  )
  return tools
}

function createEraser(
  ctx: CanvasRenderingContext2D,
  {
    bg,
    eraserDom,
  }: {
    bg: string
    eraserDom?: HTMLElement
  }
) {
  const eraser = document.createElement('div')
  eraser.style.cssText = `
    width: 35px;
    height: 35px;
    background: pink;
    cursor: pointer;
  `
  eraser.title = '橡皮擦'

  eraser.addEventListener('click', () => {
    ctx.strokeStyle = bg
    ctx.lineWidth = 35
    if (eraserDom) {
      eraserDom.style.display = ''
    }
  })

  return eraser
}

function createCanvasEraser(canvasDom: HTMLElement) {
  canvasDom.style.cssText = `
    position: relative;
  `
  const eraser = document.createElement('div')
  eraser.style.cssText = `
    width: 35px;
    height: 35px;
    background: grey;
    position: absolute;
    display: none;
  `
  canvasDom.appendChild(eraser)
  return eraser
}

export {
  signPanel,
}
