import * as PIXI from 'pixi.js'
import { Dimensions } from './Dimensions'
import { Pegboard } from './entity/Pegboard'
import { Angle } from './math/Angle'
import { Vector } from './math/Vector'
import { Velocity } from './math/Velocity'
import { OrbFactory } from './OrbFactory'
import { RepeatingTask } from './RepeatingTask'
import { Score } from './Score'

export class OrbGenerator {
    private ticker: PIXI.Ticker
    private task: RepeatingTask
    private factory: OrbFactory
    private dimensions: Dimensions

    private generation: number
    
    constructor(ticker: PIXI.Ticker, dimensions: Dimensions, factory: OrbFactory) {
        this.ticker = ticker
        this.dimensions = dimensions
        this.factory = factory
        this.generation = 0

        this.task = new RepeatingTask(ticker, () => {
            this.generation += 1
            const angle = Angle.fromRadians(Math.random() * Math.PI * 2)
            const v = new Vector(-Math.cos(angle.radians), -Math.sin(angle.radians)).normalized().scaleBy(Math.min(3, 1 + this.generation * 0.25))

            this.factory.make(
                Math.cos(angle.radians) * dimensions.width / 3 + dimensions.width / 2,
                Math.sin(angle.radians) * dimensions.width / 3 + dimensions.width / 2,
                new Velocity(v.x, v.y),
            )
        }, () => 10000)
    }

    start = () => {
        this.task.start()
    }

    stop = () => {
        this.task.stop()
    }

    progress = () => this.task.progress()
}