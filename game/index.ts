import * as PIXI from 'pixi.js'
import { Renderer } from 'pixi.js'
import { setup } from './setup'
import { assets } from './assets'

const app = new PIXI.Application({
    width: 480,
    height: 480,
})

document.body.append(app.view)

app.loader
    .add(assets.hole)
    .load(setup(app.stage, app.renderer as Renderer, app.ticker))
