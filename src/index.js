import defaultOptions from './options.js'
import { createCanvasContext2D } from './shared.js'

class focus {
  constructor(options) {
    this.focusMode = false
    this.deltaScrollY = 0
    this.pointrCoords = [0, 0]

    this.options = Object.assign(defaultOptions, options || {})
    this.continuousMode = this.options.continuousMode
    this.container = this.options.container

    const rect = this.container.getBoundingClientRect()
    this.ctx = createCanvasContext2D([rect.width, rect.height])
    this.canvas = this.ctx.canvas

    this.canvas.addEventListener('pointermove', this.pointermove, false)
    window.addEventListener('scroll', this.scroll, false)
    window.addEventListener('keydown', this.keydown, false)
  }

  pointermove = (event) => {
    this.pointrCoords = [event.clientX, event.clientY + window.scrollY]
    this.focusMode && this.render()
  }

  scroll = () => {
    this.pointrCoords[1] += window.scrollY - this.deltaScrollY
    this.deltaScrollY = window.scrollY
    this.focusMode && this.render()
  }

  keydown = (event) => {
    if (event.ctrlKey === true) {
      this.focusMode = !this.focusMode

      if (this.focusMode) {
        this.container.appendChild(this.canvas)
        this.render()
      } else {
        this.container.removeChild(this.canvas)
      }
    }
  }

  keyup = (event) => {
    // TODO: support for continuous mode
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
    const { pointrCoords, canvas, ctx, options } = this

    ctx.beginPath()

    ctx.arc(
      pointrCoords[0],
      pointrCoords[1],
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
    const { pointrCoords, ctx, options } = this

    ctx.beginPath()

    ctx.arc(pointrCoords[0], pointrCoords[1], options.size, 0, 2 * Math.PI)
    ctx.fillStyle = options.focusColor
    ctx.fill()

    ctx.closePath()
  }

  destory() {
    this.canvas.removeEventListener('pointermove', this.pointermove, false)
    this.container.removeChild(this.canvas)
    window.removeEventListener('scroll', this.scroll, false)
    window.removeEventListener('keydown', this.keydown, false)
  }
}

export default focus
