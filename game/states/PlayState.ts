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
import { Score } from '../Score'

export class PlayState extends PIXI.Container implements State {
    static NAME = 'play'

    private renderer: PIXI.Renderer
    private ticker: PIXI.Ticker
    private resources: Resources

    private generator: PegGenerator

    private score: Score
    private scoreText: PlainText

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources) {
        super()

        this.renderer = renderer
        this.ticker = ticker
        this.resources = resources
    }

    start = () => {
        this.score = new Score()
        const positioning = new Positioning(this.renderer)
        
        const ui = new PIXI.Container()
        this.scoreText = new PlainText(this.score.value().toString().padStart(6, '0'), 24, 'center')
        this.scoreText.anchor.set(0.5, 0)
        positioning.topCenter(this.scoreText)

        const deadZone = new DeadZone(this.renderer)
        const board = new Pegboard(this.resources, this.renderer)
        const orb = new Orb(240, 120, new Velocity(0, 0.5), this.ticker, board.bands, this.score)

        for (let i = 0; i < 12; ++i) {
            board.makeRandomPeg()
        }

        ui.addChild(this.scoreText)

        this.addChild(board)
        this.addChild(orb)
        this.addChild(deadZone)
        this.addChild(ui)

        this.ticker.add(this.updateScore)

        this.generator = new PegGenerator(480, 480, board, this.ticker)
        this.generator.start()
    }

    stop = () => {
        this.generator.stop()
        this.ticker.remove(this.updateScore)
        this.removeChildren().forEach(child => {
            if(child instanceof PIXI.Container) {
                child.destroy({ children: true })
            } else {
                child.destroy()
            }
        })
    }

    updateScore = () => {
        this.scoreText.text = this.score.value().toString().padStart(6, '0')
    }
}