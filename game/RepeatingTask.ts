import * as PIXI from 'pixi.js'

export class RepeatingTask {
    private ticker: PIXI.Ticker
    private task: () => void
    private delay: () => number

    private n: number
    private nextDelay: number

    constructor(ticker: PIXI.Ticker, task: () => void, delay: () => number) {
        this.ticker = ticker
        this.task = task
        this.delay = delay

        this.n = 0
        this.nextDelay = this.delay()
    }

    start = () => {
        this.ticker.add(this.tickTask)
    }

    stop = () => {
        this.n = 0
        this.ticker.remove(this.tickTask)
    }

    progress = () => this.n / this.nextDelay

    private tickTask = (dt: number) => {
        this.n += 1 / 60 * dt * 1000

        if (this.n >= this.nextDelay) {
            this.n = 0;
            this.nextDelay = this.delay()
            this.task()
        }
    }
}