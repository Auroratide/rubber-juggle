import * as PIXI from 'pixi.js'
import { Orb } from '../Orb'
import { Pegboard } from '../Pegboard'
import { State } from './State'
import { PegGenerator } from '../PegGenerator'

export class PlayState extends PIXI.Container implements State {
    static NAME = 'play'

    private ticker: PIXI.Ticker
    private generator: PegGenerator
    
    constructor(ticker: PIXI.Ticker) {
        super()

        this.ticker = ticker
    }

    start = () => {
        const board = new Pegboard()
        const orb = new Orb(this.ticker, board.bands)

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