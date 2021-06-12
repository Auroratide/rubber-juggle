import * as PIXI from 'pixi.js'
import { Angle } from './Angle'
import { Orb } from './Orb'

const app = new PIXI.Application()

document.body.append(app.view)

app.loader.load(() => {
    const text = new PIXI.Text('Hello world', {
        fill: 0xffffff,
    })

    const orb = new Orb(app.ticker)

    app.stage.addChild(text)
    app.stage.addChild(orb)

    setTimeout(() => {
        orb.bounce(Angle.fromDegrees(45))
    }, 4000)
})
