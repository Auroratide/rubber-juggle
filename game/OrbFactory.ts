import * as PIXI from 'pixi.js'
import { Resources } from './aliases';
import { Dimensions } from './Dimensions';
import { Orb } from './entity/Orb';
import { Pegboard } from "./entity/Pegboard";
import { Velocity } from './math/Velocity';
import { Score } from "./Score";
import { SoundManager } from './SoundManager';

export class OrbFactory {
    private layer: PIXI.Container
    private ticker: PIXI.Ticker
    private board: Pegboard
    private score: Score
    private resources: Resources
    private dimensions: Dimensions
    private sfx: SoundManager

    constructor(layer: PIXI.Container, ticker: PIXI.Ticker, board: Pegboard, score: Score, resources: Resources, dimensions: Dimensions, sfx: SoundManager) {
        this.layer = layer
        this.ticker = ticker
        this.board = board
        this.score = score
        this.resources = resources
        this.dimensions = dimensions
        this.sfx = sfx
    }

    make = (x: number, y: number, vel: Velocity) => {
        const orb = new Orb(x, y, vel, this.ticker, this.board.bands, this.score, this.resources, this.dimensions, this.sfx)
        this.layer.addChild(orb)
        return orb
    }
}