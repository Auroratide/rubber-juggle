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
import { Dimensions } from '../Dimensions'
import { OrbGenerator } from '../OrbGenerator'
import { OrbFactory } from '../OrbFactory'

export class PlayState extends PIXI.Container implements State {
    static NAME = 'play'

    private renderer: PIXI.Renderer
    private ticker: PIXI.Ticker
    private resources: Resources

    private generator: PegGenerator
    private orbGen: OrbGenerator

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
        const dim = new Dimensions(this.renderer)
        
        const ui = new PIXI.Container()
        this.scoreText = new PlainText(this.score.value().toString().padStart(6, '0'), dim.width / 20, 'center')
        this.scoreText.anchor.set(0.5, 0)
        positioning.topCenter(this.scoreText)

        const deadZone = new DeadZone(this.renderer)
        const board = new Pegboard(this.resources, this.renderer, this.ticker)
        const orb = new Orb(dim.width / 2, dim.width / 4, new Velocity(0, 1), this.ticker, board.bands, this.score)

        for (let i = 0; i < 12; ++i) {
            board.makeRandomPeg()
        }

        ui.addChild(this.scoreText)

        const orbLayer = new PIXI.Container()
        orbLayer.addChild(orb)

        this.addChild(board)
        this.addChild(orbLayer)
        this.addChild(deadZone)
        this.addChild(ui)

        this.ticker.add(this.updateScore)

        this.generator = new PegGenerator(board, this.ticker)
        this.generator.start()

        const orbFactory = new OrbFactory(orbLayer, this.ticker, board, this.score)

        this.orbGen = new OrbGenerator(this.ticker, dim, orbFactory)
        this.orbGen.start()
    }

    stop = () => {
        this.generator.stop()
        this.orbGen.stop()
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