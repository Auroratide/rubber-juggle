import * as PIXI from 'pixi.js'
import { Pegboard } from './Pegboard'

export class Peg extends PIXI.Sprite {
    private board: Pegboard

    constructor(x: number, y: number, board: Pegboard) {
        super()

        this.x = x
        this.y = y
        this.board = board

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0xff0000)
        graphics.drawCircle(0, 0, 5)

        this.addChild(graphics)

        this.interactive = true
        this.on('mousedown', this.onPress)
        this.on('mouseup', this.onRelease)
    }

    onPress = () => {
        console.log('Pressed a peg')
        this.board.prepareBand(this)
    }

    onRelease = () => {
        console.log('Released a peg')
        this.board.joinPreparedPeg(this)
    }
}