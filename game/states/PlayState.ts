import * as PIXI from 'pixi.js'
import { Orb } from '../Orb'
import { Pegboard } from '../Pegboard'
import { State } from './State'
import { PegGenerator } from '../PegGenerator'
import { Velocity } from '../Velocity'
import { Resources } from '../aliases'

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
        const board = new Pegboard(this.resources, this.renderer)
        const orb = new Orb(240, 120, new Velocity(0, 0.5), this.ticker, board.bands)

        for (let i = 0; i < 12; ++i)
            board.makePeg(Math.random() * 480, Math.random() * 480)

        this.addChild(board)
        this.addChild(orb)

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