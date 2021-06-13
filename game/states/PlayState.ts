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
import { StateManager } from './StateManager'
import { GameOverState } from './GameOverState'
import { Save } from '../Save'
import { NewBalloonBar } from '../entity/NewBalloonBar'
import { SoundManager } from '../SoundManager'

export class PlayState extends PIXI.Container implements State {
    static NAME = 'play'

    private renderer: PIXI.Renderer
    private ticker: PIXI.Ticker
    private resources: Resources
    private save: Save

    private generator: PegGenerator
    private orbGen: OrbGenerator

    private score: Score
    private scoreText: PlainText

    private orbLayer: PIXI.Container
    private stateManager: StateManager
    private sfx: SoundManager

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager, save: Save, sfx: SoundManager) {
        super()

        this.renderer = renderer
        this.ticker = ticker
        this.resources = resources
        this.stateManager = stateManager
        this.save = save
        this.sfx = sfx
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
        const board = new Pegboard(this.resources, this.renderer, this.ticker, this.sfx)
        const orb = new Orb(dim.width / 2, dim.width / 4, new Velocity(0, 1), this.ticker, board.bands, this.score, this.resources, dim, this.sfx)

        for (let i = 0; i < 12; ++i) {
            board.makeRandomPeg()
        }

        board.pegs[0].gonnaDieSoon()

        ui.addChild(this.scoreText)

        this.orbLayer = new PIXI.Container()
        this.orbLayer.addChild(orb)

        this.addChild(board)
        this.addChild(this.orbLayer)
        this.addChild(deadZone)
        this.addChild(ui)

        this.ticker.add(this.updateScore)

        this.generator = new PegGenerator(board, this.ticker)
        this.generator.start()

        const orbFactory = new OrbFactory(this.orbLayer, this.ticker, board, this.score, this.resources, dim, this.sfx)

        this.orbGen = new OrbGenerator(this.ticker, dim, orbFactory)
        this.orbGen.start()

        const bar = new NewBalloonBar(this.orbGen, this.resources, this.ticker, dim)
        bar.y = dim.width - dim.tileWidth
        ui.addChild(bar)

        this.ticker.add(this.checkForGameOver)
    }

    stop = () => {
        this.generator.stop()
        this.orbGen.stop()
        this.ticker.remove(this.updateScore)
        this.ticker.remove(this.checkForGameOver)
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

    checkForGameOver = () => {
        if (this.orbLayer.children.length === 0) {
            if (this.score.value() > parseInt(this.save.highscore.get()))
                this.save.highscore.set(this.score.value().toString())

            this.stateManager.transitionTo(GameOverState.NAME, {
                score: this.score
            })
        }
    }
}