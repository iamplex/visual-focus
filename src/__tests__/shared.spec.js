import { createCanvasContext2D, dpr } from '../shared.js'

describe('shared', function () {
  it('create a context', function () {
    const ctx = createCanvasContext2D([0, 0])
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D)
  })

  it('create context.canvas with hack style', function () {
    const ctx = createCanvasContext2D([0, 0])
    const canvas = ctx.canvas

    expect(canvas.style.position).toEqual('absolute')
    expect(canvas.style.top).toEqual(0 + 'px')
    expect(canvas.style.display).toEqual('block')
    expect(canvas.style.cursor).toEqual('none')
  })

  it('create context.canvas with custom size', function () {
    const size = [300, 150]
    const ctx = createCanvasContext2D(size)
    const canvas = ctx.canvas

    expect(canvas.style.width).toEqual(size[0] + 'px')
    expect(canvas.style.height).toEqual(size[1] + 'px')
    expect(canvas.width).toEqual(size[0] * dpr)
    expect(canvas.height).toEqual(size[1] * dpr)
  })

  it('sets context scale with dpr', function () {
    const matrix = createCanvasContext2D([0, 0]).getTransform()

    expect(matrix.a).toEqual(dpr)
    expect(matrix.m11).toEqual(dpr)
    expect(matrix.d).toEqual(dpr)
    expect(matrix.m22).toEqual(dpr)
  })
})
