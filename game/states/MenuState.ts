import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import { Dimensions } from '../Dimensions'
import { PegboardBackground } from '../entity/PegboardBackground'
import PlainText from '../PlainText'
import Positioning from '../Positioning'
import { State } from './State'
import { assets } from '../assets'
import { BoardButton } from '../entity/BoardButton'
import { StateManager } from './StateManager'
import { PlayState } from './PlayState'

export class MenuState extends PIXI.Container implements State {
    static NAME = 'menu'

    private renderer: PIXI.Renderer
    private resources: Resources
    private ticker: PIXI.Ticker
    private stateManager: StateManager

    constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager) {
        super()
        
        this.renderer = renderer
        this.resources = resources
        this.ticker = ticker
        this.stateManager = stateManager
    }

    start = () => {
        const pos = new Positioning(this.renderer)
        const dim = new Dimensions(this.renderer)
        
        // this.background(positioning)
        // this.text(pos, dim, context.score)
        this.background(dim)
        this.text(pos, dim)
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

        this.addChild(bg)
        this.addChild(woodBackTitle)
        this.addChild(woodBackBottom)
    }

    private text = (pos: Positioning, dim: Dimensions) => {
        const title = new PlainText('Peggle Juggle', dim.rem(1.5)).wooden()
        pos.centerX(title)
        pos.y(title, dim.width / 4)

        const credits = new PlainText('By Timothy Foster for GMTK 2021\nMusic: "????"', dim.rem(0.5)).wooden()
        credits.anchor.set(0.5, 1)
        pos.bottomCenter(credits, 9 * dim.tileWidth / 8)

        const highscore = new PlainText(`Highscore: 000000`, dim.rem(1)).wooden()
        pos.centerX(highscore)
        pos.y(highscore, 3 * dim.width / 8 - dim.rem(0.5))

        const play = new BoardButton('Play!', this.resources, dim, () => {
            this.stateManager.transitionTo(PlayState.NAME)
        })
        play.x = dim.tile(4)
        play.y = dim.tile(6)

        this.addChild(title)
        this.addChild(credits)
        this.addChild(highscore)
        this.addChild(play)
    }
}