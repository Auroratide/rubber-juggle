import * as PIXI from 'pixi.js'
import { Pegboard } from './entity/Pegboard'
import { RepeatingTask } from './RepeatingTask'
import { SoundManager } from './SoundManager'

export class PegGenerator {
    private board: Pegboard
    private task: RepeatingTask
    private generation: number

    constructor(board: Pegboard, ticker: PIXI.Ticker) {
        this.board = board
        this.generation = 0
        this.task = new RepeatingTask(ticker, () => {
            this.generation += 1
            this.board.makeRandomPeg()
            this.board.killOldestPeg()
        }, () => Math.random() * 2500 + 2500 - Math.min(1500, this.generation * 50))
    }

    start = () => {
        this.task.start()
    }

    stop = () => {
        this.task.stop()
    }
}