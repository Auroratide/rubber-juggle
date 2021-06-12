import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import { StateManager } from './states/StateManager'
import { PlayState } from './states/PlayState'

export const setup = (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
    const stateManager = new StateManager()
    const play = new PlayState(ticker)
    stateManager.register(PlayState.NAME, play)

    stage.addChild(play)

    stateManager.firstState(PlayState.NAME)
}
