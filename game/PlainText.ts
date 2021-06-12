import * as PIXI from 'pixi.js'
import { TextStyleAlign } from 'pixi.js'
import { assets } from './assets'

export default class PlainText extends PIXI.Text {
    constructor(text: string, size: number = 32, align: TextStyleAlign = 'center', width?: number) {
        super(text, {
            fontFamily : assets.font,
            fontSize: size,
            fill: 0xffffff,
            align: align,
            wordWrap: true,
            wordWrapWidth: width
        })

        this.resolution = 2
        this.anchor.set(0.5)
    }
}