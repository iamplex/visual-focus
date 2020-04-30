import defaultOptions from './options.js'
import { createCanvasContext2D } from './shared.js'

class focus {
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

    // this.canvas.addEventListener('pointermove', this.pointermove, false)
    this.container.addEventListener('pointermove', this.pointermove, false)
    window.addEventListener('scroll', this.scroll, false)

    this.hotKey && window.addEventListener('keydown', this.keydown, false)
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
    if (this.continuousMode === false && event.key === this.hotKey) {
      this.focusMode = !this.focusMode
      this.focusMode ? this.onFocus() : this.offFocus()
    }
  }

  keyup = (event) => {
    // TODO: support for continuous mode
  }

  onFocus() {
    this.container.appendChild(this.canvas)
    this.render()
  }

  offFocus() {
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
    // this.canvas.removeEventListener('pointermove', this.pointermove, false)
    this.container.removeEventListener('pointermove', this.pointermove, false)
    window.removeEventListener('scroll', this.scroll, false)
    window.removeEventListener('keydown', this.keydown, false)

    this.focusMode && this.container.removeChild(this.canvas)
  }
}

export default focus
