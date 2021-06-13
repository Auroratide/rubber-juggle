import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import { StateManager } from './states/StateManager'
import { PlayState } from './states/PlayState'
import { GameOverState } from './states/GameOverState'

export const setup = (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
    const stateManager = new StateManager()
    const play = new PlayState(renderer, ticker, resources)
    const gameOver = new GameOverState(renderer, ticker)
    stateManager.register(PlayState.NAME, play)
    stateManager.register(GameOverState.NAME, gameOver)

    stage.addChild(play)
    stage.addChild(gameOver)

    stateManager.firstState(PlayState.NAME)
    // stateManager.firstState(GameOverState.NAME)
}
