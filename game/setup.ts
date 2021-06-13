import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import { StateManager } from './states/StateManager'
import { PlayState } from './states/PlayState'
import { GameOverState } from './states/GameOverState'
import { MenuState } from './states/MenuState'

export const setup = (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
    const stateManager = new StateManager()
    const play = new PlayState(renderer, ticker, resources, stateManager)
    const gameOver = new GameOverState(renderer, ticker)
    const menu = new MenuState(renderer, ticker, resources, stateManager)
    stateManager.register(PlayState.NAME, play)
    stateManager.register(GameOverState.NAME, gameOver)
    stateManager.register(MenuState.NAME, menu)

    stage.addChild(play)
    stage.addChild(gameOver)
    stage.addChild(menu)

    // stateManager.firstState(PlayState.NAME)
    // stateManager.firstState(GameOverState.NAME)
    stateManager.firstState(MenuState.NAME)
}
