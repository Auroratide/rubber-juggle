import * as PIXI from 'pixi.js'
import { Angle } from './Angle'
import { Band } from './Band'
import { Orb } from './Orb'
import { Peg } from './Peg'

const app = new PIXI.Application()

document.body.append(app.view)

app.loader.load(() => {
    const text = new PIXI.Text('Hello world', {
        fill: 0xffffff,
    })

    const bands: Band[] = []

    const orb = new Orb(app.ticker, bands)
    const peg1 = new Peg(150, 300)
    const peg2 = new Peg(350, 300)
    const band = new Band(peg1, peg2)
    bands.push(band)

    app.stage.addChild(text)
    app.stage.addChild(orb)

    app.stage.addChild(peg1)
    app.stage.addChild(peg2)
    app.stage.addChild(band)
})
