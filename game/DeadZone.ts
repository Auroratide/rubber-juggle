import * as PIXI from 'pixi.js'

export class DeadZone extends PIXI.Sprite {
    private renderer: PIXI.Renderer
    private graphics: PIXI.Graphics

    constructor(renderer: PIXI.Renderer) {
        super()

        this.renderer = renderer
        this.graphics = new PIXI.Graphics()
        this.draw()
        this.addChild(this.graphics)
    }

    draw = () => {
        const t = 40
        const g = this.graphics
        const w = this.renderer.width
        const h = this.renderer.height
        g.beginFill(0x000000, 0.667)

        g.drawRect(0, 0, w, t)
        g.drawRect(0, t, t, h - t)
        g.drawRect(w - t, t, t, h - t)
        g.drawRect(t, h - t, w - 2 * t, t)
    }
}