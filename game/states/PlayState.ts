import * as PIXI from 'pixi.js'
import { Orb } from '../entity/Orb'
import { Pegboard } from '../entity/Pegboard'
import { State } from './State'
import { PegGenerator } from '../PegGenerator'
import { Velocity } from '../math/Velocity'
import { DeadZone } from '../DeadZone'
import { Resources } from '../aliases'
import PlainText from '../PlainText'
import Positioning from '../Positioning'

export class PlayState extends PIXI.Container implements State {
    static NAME = 'play'

    private renderer: PIXI.Renderer
    private ticker: PIXI.Ticker
    private resources: Resources

    private generator: PegGenerator

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources) {
        super()

        this.renderer = renderer
        this.ticker = ticker
        this.resources = resources
    }

    start = () => {
        const positioning = new Positioning(this.renderer)
        
        const ui = new PIXI.Container()
        const scoreText = new PlainText('000000', 24, 'center')
        scoreText.anchor.set(0.5, 0)
        positioning.topCenter(scoreText)

        const deadZone = new DeadZone(this.renderer)
        const board = new Pegboard(this.resources, this.renderer)
        const orb = new Orb(240, 120, new Velocity(0, 0.5), this.ticker, board.bands)

        for (let i = 0; i < 12; ++i) {
            board.makeRandomPeg()
        }

        ui.addChild(scoreText)

        this.addChild(board)
        this.addChild(orb)
        this.addChild(deadZone)
        this.addChild(ui)

        this.generator = new PegGenerator(480, 480, board, this.ticker)
        this.generator.start()
    }

    stop = () => {
        this.generator.stop()
        this.removeChildren().forEach(child => {
            if(child instanceof PIXI.Container) {
                child.destroy({ children: true })
            } else {
                child.destroy()
            }
        })
    }
}