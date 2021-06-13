import * as PIXI from 'pixi.js'
import { Dimensions } from './Dimensions'
import { Pegboard } from './entity/Pegboard'
import { Angle } from './math/Angle'
import { Velocity } from './math/Velocity'
import { OrbFactory } from './OrbFactory'
import { RepeatingTask } from './RepeatingTask'
import { Score } from './Score'

export class OrbGenerator {
    private ticker: PIXI.Ticker
    private task: RepeatingTask
    private factory: OrbFactory
    private dimensions: Dimensions
    
    constructor(ticker: PIXI.Ticker, dimensions: Dimensions, factory: OrbFactory) {
        this.ticker = ticker
        this.dimensions = dimensions
        this.factory = factory

        this.task = new RepeatingTask(ticker, () => {
            const angle = Angle.fromRadians(Math.random() * Math.PI * 2)
            this.factory.make(
                Math.cos(angle.radians) * dimensions.width / 3 + dimensions.width / 2,
                Math.sin(angle.radians) * dimensions.width / 3 + dimensions.width / 2,
                new Velocity(-Math.cos(angle.radians), -Math.sin(angle.radians)),
            )
        }, () => 12000)
    }

    start = () => {
        this.task.start()
    }

    stop = () => {
        this.task.stop()
    }

    progress = () => this.task.progress()
}