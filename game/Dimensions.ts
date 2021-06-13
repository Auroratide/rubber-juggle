import * as PIXI from 'pixi.js'

export class Dimensions {
    private renderer: PIXI.Renderer

    constructor(renderer: PIXI.Renderer) {
        this.renderer = renderer
    }

    get width() { return this.renderer.width }

    get tileCount() { return 12 }
    get tileWidth() { return this.renderer.width / this.tileCount }

    get unitFont() { return this.width / 20 }
    rem = (n: number) => this.unitFont * n

    tile = (x: number) => x * this.tileWidth
}