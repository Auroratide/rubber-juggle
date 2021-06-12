import * as PIXI from 'pixi.js'

export class Dimensions {
    private renderer: PIXI.Renderer

    constructor(renderer: PIXI.Renderer) {
        this.renderer = renderer
    }

    get width() { return this.renderer.width }

    get tileCount() { return 12 }
    get tileWidth() { return this.renderer.width / this.tileCount }
}