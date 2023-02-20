const signPanel = (
  dom: HTMLElement,
  { width = 300, height = 500, color = 'blue', penWidth = 1, bg = 'white' } = {}
) => {
  const canvasDom = document.createElement('canvas')
  canvasDom.width = width
  canvasDom.height = height
  const ctx = canvasDom.getContext('2d')
  dom.appendChild(canvasDom)
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
      if (down) {
        const { x, y } = e
        const [_x, _y] = getPosition(canvasDom, x, y)
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
  }

  function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function getPosition(canvasDom: HTMLCanvasElement, x: number, y: number) {
  const { left, top } = canvasDom.getBoundingClientRect()
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

export {
  signPanel,
}

/* 
  exp:
  signPanel(document.getElementById('dom'), { color: 'red', penWidth: 2, bg: 'rgba(0, 2, 0, 1)' })
*/
