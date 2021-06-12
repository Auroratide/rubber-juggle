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

interface GameOverContext {
    score: Score
}

export class GameOverState extends PIXI.Container implements State {
    static NAME = 'game-over'

    private renderer: PIXI.Renderer
    private ticker: PIXI.Ticker

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker) {
        super()
        
        this.renderer = renderer
        this.ticker = ticker
    }

    start = (context: GameOverContext) => {
        const pos = new Positioning(this.renderer)
        const dim = new Dimensions(this.renderer)
        
        // this.background(positioning)
        // this.text(pos, dim, context.score)
        this.text(pos, dim, new Score(100))
    }
    
    stop = () => {
        this.removeChildren().forEach(child => child.destroy())
    }

    text = (pos: Positioning, dim: Dimensions, score: Score) => {
        const text = new PlainText('All the balloons popped!', dim.unitFont * 1.5)
        pos.centerX(text)
        pos.y(text, dim.width / 4)

        const scoreText = new PlainText(`Score: ${score.value().toString().padStart(6, '0')}`, dim.unitFont)
        pos.centerX(scoreText)
        pos.y(scoreText, 3 * dim.width / 8)

        this.addChild(text)
        this.addChild(scoreText)
    }
}