export const dpr = window.devicePixelRatio || 1

export function create_canvas_context_2d(size) {
  const context = document.createElement('canvas').getContext('2d')

  context.canvas.style.position = 'fixed'
  context.canvas.style.top = 0
  context.canvas.style.display = 'block'
  context.canvas.style.cursor = 'none'
  context.canvas.style.zIndex = 99999

  context.canvas.style.width = size[0] + 'px'
  context.canvas.style.height = size[1] + 'px'
  context.canvas.width = size[0] * dpr
  context.canvas.height = size[1] * dpr
  context.scale(dpr, dpr)

  return context
}
