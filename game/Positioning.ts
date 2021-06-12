import * as PIXI from 'pixi.js'

export default class Positioning {
    private renderer: PIXI.Renderer
    constructor(renderer: PIXI.Renderer) {
        this.renderer = renderer
    }

    center = (obj: PIXI.DisplayObject) => {
        obj.position.set(this.renderer.width / 2, this.renderer.height / 2)
    }

    topCenter = (obj: PIXI.DisplayObject) => {
        obj.position.set(this.renderer.width / 2, 0)
    }

    topRight = (obj: PIXI.DisplayObject, padding: number = 0) => {
        obj.position.set(this.renderer.width - padding, 0)
    }

    bottomCenter = (obj: PIXI.DisplayObject) => {
        obj.position.set(this.renderer.width / 2, this.renderer.height)
    }
}