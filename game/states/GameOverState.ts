import * as PIXI from 'pixi.js'
import { Dimensions } from '../Dimensions'
import PlainText from '../PlainText'
import Positioning from '../Positioning'
import { Score } from '../Score'
import { State } from './State'
import { PegboardBackground } from '../entity/PegboardBackground'
import { Resources } from '../aliases'
import { StateManager } from './StateManager'
import { assets } from '../assets'
import { BoardButton } from '../entity/BoardButton'
import { PlayState } from './PlayState'
import { MenuState } from './MenuState'

interface GameOverContext {
    score: Score
}

export class GameOverState extends PIXI.Container implements State {
    static NAME = 'game-over'

    private renderer: PIXI.Renderer
    private resources: Resources
    private ticker: PIXI.Ticker
    private stateManager: StateManager

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager) {
        super()
        
        this.renderer = renderer
        this.ticker = ticker
        this.resources = resources
        this.stateManager = stateManager
    }

    start = (context: GameOverContext) => {
        const pos = new Positioning(this.renderer)
        const dim = new Dimensions(this.renderer)
        
        this.background(dim)
        this.text(pos, dim, context.score ?? new Score(0))
    }
    
    stop = () => {
        this.removeChildren().forEach(child => child.destroy())
    }

    private background = (dim: Dimensions) => {
        const bg = new PegboardBackground(this.resources, this.renderer)
        const woodBackTitle = new PIXI.Sprite(this.resources[assets.wood.title].texture)
        woodBackTitle.x = dim.tile(2)
        woodBackTitle.y = dim.tile(2)

        const woodBackBottom = new PIXI.Sprite(this.resources[assets.wood.bottom].texture)
        woodBackBottom.x = dim.tile(2)
        woodBackBottom.y = dim.tile(10)

        const deadzone = new PIXI.Graphics()
        deadzone.beginFill(0x000000, 0.75)
        deadzone.drawRect(0, 0, dim.width, dim.width)

        this.addChild(bg)
        this.addChild(deadzone)
    }

    text = (pos: Positioning, dim: Dimensions, score: Score) => {
        const text = new PlainText('All the balloons popped!', dim.rem(1.5))
        pos.centerX(text)
        pos.y(text, dim.width / 4)

        const scoreText = new PlainText(`Score: ${score.value().toString().padStart(6, '0')}`, dim.rem(1))
        pos.centerX(scoreText)
        pos.y(scoreText, 3 * dim.width / 8)

        const play = new BoardButton('Retry', this.resources, dim, () => {
            this.stateManager.transitionTo(PlayState.NAME)
        })
        play.x = dim.tile(2)
        play.y = dim.tile(6)

        const menu = new BoardButton('Menu', this.resources, dim, () => {
            this.stateManager.transitionTo(MenuState.NAME)
        })
        menu.x = dim.tile(7)
        menu.y = dim.tile(6)

        this.addChild(text)
        this.addChild(scoreText)
        this.addChild(play)
        this.addChild(menu)
    }
}