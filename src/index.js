import defaultOptions from './options.js'
import { createCanvasContext2D } from './shared.js'

class vfocus {
  constructor(options) {
    this.focusMode = false
    this.deltaScrollY = 0
    this.pointrCoord = [0, 0]

    this.options = Object.assign(defaultOptions, options || {})
    this.container = this.options.container
    this.hotKey = this.options.hotKey
    this.continuousMode = this.options.continuousMode

    const rect = this.container.getBoundingClientRect()
    this.ctx = createCanvasContext2D([rect.width, rect.height])
    this.canvas = this.ctx.canvas

    this.container.addEventListener('pointermove', this.pointermove, false)
    window.addEventListener('scroll', this.scroll, false)

    if (this.hotKey) window.addEventListener('keydown', this.keydown, false)
    if (this.hotKey && this.continuousMode)
      window.addEventListener('keyup', this.keyup, false)
  }

  pointermove = (event) => {
    this.pointrCoord = [event.clientX, event.clientY + window.scrollY]
    this.focusMode && this.render()
  }

  scroll = () => {
    this.pointrCoord[1] += window.scrollY - this.deltaScrollY
    this.deltaScrollY = window.scrollY
    this.focusMode && this.render()
  }

  keydown = (event) => {
    if (event.key === this.hotKey) this.triggerMode()
  }

  keyup = (event) => {
    if (this.continuousMode && event.key === this.hotKey) this.triggerMode()
  }

  triggerMode() {
    this.focusMode = !this.focusMode
    this.focusMode ? this.mount() : this.unmount()
  }

  mount() {
    this.render()
    this.container.appendChild(this.canvas)
  }

  unmount() {
    this.container.removeChild(this.canvas)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  render() {
    this.clear()
    this.renderBackground()
    this.renderFocus()
  }

  renderBackgroundWithoutFocus() {
    const { canvas, ctx, options } = this

    ctx.beginPath()

    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = options.backgroundColor
    ctx.fill('evenodd')

    ctx.closePath()
  }

  renderBackground() {
    const { pointrCoord, canvas, ctx, options } = this

    ctx.beginPath()

    ctx.arc(
      pointrCoord[0],
      pointrCoord[1],
      options.size || defaultOptions.size,
      0,
      2 * Math.PI
    )
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = options.backgroundColor
    ctx.fill('evenodd')

    ctx.closePath()
  }

  renderFocus() {
    const { pointrCoord, ctx, options } = this

    ctx.beginPath()

    ctx.arc(pointrCoord[0], pointrCoord[1], options.size, 0, 2 * Math.PI)
    ctx.fillStyle = options.focusColor
    ctx.fill()

    ctx.closePath()
  }

  destory() {
    this.container.removeEventListener('pointermove', this.pointermove, false)
    window.removeEventListener('scroll', this.scroll, false)
    window.removeEventListener('keydown', this.keydown, false)
    window.addEventListener('keyup', this.keyup, false)

    this.focusMode && this.unmount()
  }
}

export default vfocus
