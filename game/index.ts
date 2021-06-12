import * as PIXI from 'pixi.js'
import { Angle } from './Angle'
import { Band } from './Band'
import { Orb } from './Orb'
import { Peg } from './Peg'
import { Pegboard } from './Pegboard'
import { PegGenerator } from './PegGenerator'
import { Velocity } from './Velocity'

const app = new PIXI.Application({
    width: 480,
    height: 480,
})

document.body.append(app.view)

app.loader.load(() => {
    const text = new PIXI.Text('Hello world', {
        fill: 0xffffff,
    })
    
    const board = new Pegboard()
    const orb = new Orb(app.ticker, board.bands)

    const peg1 = board.makePeg(150, 300)
    const peg2 = board.makePeg(350, 250)
    board.makePeg(300, 100)
    board.makePeg(50, 100)

    app.stage.addChild(text)
    app.stage.addChild(board)
    app.stage.addChild(orb)

    const generator = new PegGenerator(480, 480, board, app.ticker)
    generator.start()
})
