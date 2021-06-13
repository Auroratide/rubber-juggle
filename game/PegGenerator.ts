import * as PIXI from 'pixi.js'
import { Pegboard } from './entity/Pegboard'
import { RepeatingTask } from './RepeatingTask'
import { SoundManager } from './SoundManager'

export class PegGenerator {
    private board: Pegboard
    private task: RepeatingTask

    constructor(board: Pegboard, ticker: PIXI.Ticker) {
        this.board = board
        this.task = new RepeatingTask(ticker, () => {
            this.board.makeRandomPeg()
            this.board.killOldestPeg()
        }, () => Math.random() * 2500 + 2500)
    }

    start = () => {
        this.task.start()
    }

    stop = () => {
        this.task.stop()
    }
}