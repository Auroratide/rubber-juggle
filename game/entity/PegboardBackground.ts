import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import { assets } from '../assets'

export class PegboardBackground extends PIXI.TilingSprite {
    constructor(resources: Resources, renderer: PIXI.Renderer) {
        super(resources[assets.hole].texture, renderer.width, renderer.height)
    }
}