import * as PIXI from 'pixi.js'

export class Peg extends PIXI.Sprite {
    constructor(x: number, y: number) {
        super()

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0xff0000)
        graphics.drawCircle(0, 0, 5)

        this.addChild(graphics)

        this.x = x
        this.y = y
    }
}