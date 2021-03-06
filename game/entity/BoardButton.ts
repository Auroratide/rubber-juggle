import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import { assets } from '../assets'
import PlainText from '../PlainText'
import { Angle } from '../math/Angle'
import { Dimensions } from '../Dimensions'
import { SoundManager } from '../SoundManager'

export class BoardButton extends PIXI.Container {
    private static ROTATION = Angle.fromDegrees(30)

    private action: () => void

    private board: PIXI.Sprite
    private text: PlainText
    private sfx: SoundManager

    constructor(text: string, resources: Resources, dim: Dimensions, sfx: SoundManager, action: () => void) {
        super()
        this.action = action
        
        const empty = new PIXI.Sprite()
        this.sfx = sfx

        this.board = new PIXI.Sprite(resources[assets.wood.button].texture)
        this.board.anchor.set(0.0555, 0.166)
        
        this.text = new PlainText(text, dim.rem(1.25)).wooden()
        this.text.x = this.board.width / 2 - 20
        this.text.y = this.board.height / 2 - 20

        const rect = this.board.getBounds()
        empty.width = rect.width
        empty.height = rect.height
        empty.anchor.set(0.0555, 0.166)
        
        this.board.rotation = BoardButton.ROTATION.radians
        empty.rotation = this.board.rotation

        this.addChild(empty) // makes it so hovering over the bottom isn't jittery
        this.addChild(this.board)
        this.board.addChild(this.text)

        this.board.x = dim.tileWidth / 4
        this.board.y = dim.tileWidth / 4
        
        empty.x = dim.tileWidth / 4
        empty.y = dim.tileWidth / 4

        this.interactive = true
        this
            .on('mouseover', this.onHover)
            .on('mouseout', this.offHover)
            .on('mouseup', this.onRelease)
            .on('touchend', this.onRelease)
    }

    private onHover = () => {
        this.board.rotation = Angle.fromDegrees(20).radians
    }

    private offHover = () => {
        this.board.rotation = BoardButton.ROTATION.radians
    }

    private onRelease = () => {
        this.sfx.click.play()
        this.action()
    }
}