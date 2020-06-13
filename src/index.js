import default_options from './options.js'
import { create_canvas_context_2d } from './shared.js'

class vfocus {
  constructor(options) {
    this.global = window

    this.focus_mode = false
    this.pointer_coord = [0, 0]

    this.options = Object.assign(default_options, options || {})

    this.container = document.documentElement
    this.size = this.options.Size || default_options.Size
    this.hot_key = this.options.HotKey
    this.continuous_mode = this.options.ContinuousMode

    // use window outer size with fixed position
    this.ctx = create_canvas_context_2d([
      this.global.outerWidth,
      this.global.outerHeight,
    ])
    this.canvas = this.ctx.canvas

    // initial event
    this.canvas.addEventListener('pointermove', this.pointer_move, false)

    if (this.hot_key) {
      this.global.addEventListener('keydown', this.key_down, false)

      if (this.continuous_mode) {
        this.global.addEventListener('keyup', this.key_up, false)
      }
    }
  }

  pointer_move = (event) => {
    this.pointer_coord = [event.clientX, event.clientY]
    this.focus_mode && this.render()
  }

  key_down = (event) => {
    if (event.key === this.hot_key) this.trigger_mode()
  }

  key_up = (event) => {
    if (this.continuous_mode && event.key === this.hot_key) this.trigger_mode()
  }

  trigger_mode() {
    this.focus_mode = !this.focus_mode
    this.focus_mode ? this.mount() : this.unmount()
  }

  // TODO: Can't get pointer coord before init pointermove event, so focus position always on [0, 0] when first mount
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
    this.render_background()
    this.render_focus()
  }

  render_background() {
    const { pointer_coord, size, canvas, ctx, options } = this

    ctx.beginPath()

    ctx.arc(pointer_coord[0], pointer_coord[1], size, 0, 2 * Math.PI)
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = options.BackgroundColor
    ctx.fill('evenodd')

    ctx.closePath()
  }

  render_focus() {
    const { pointer_coord, size, ctx, options } = this

    ctx.beginPath()

    ctx.arc(pointer_coord[0], pointer_coord[1], size, 0, 2 * Math.PI)
    ctx.fillStyle = options.FocusColor
    ctx.fill()

    ctx.closePath()
  }

  destory() {
    this.container.removeEventListener('pointermove', this.pointer_move, false)
    this.global.removeEventListener('keydown', this.key_down, false)
    this.global.removeEventListener('keyup', this.key_up, false)

    this.focus_mode && this.unmount()
  }
}

export default vfocus
