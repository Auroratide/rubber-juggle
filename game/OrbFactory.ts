import * as PIXI from 'pixi.js'
import { Orb } from './entity/Orb';
import { Pegboard } from "./entity/Pegboard";
import { Velocity } from './math/Velocity';
import { Score } from "./Score";

export class OrbFactory {
    private layer: PIXI.Container
    private ticker: PIXI.Ticker
    private board: Pegboard
    private score: Score

    constructor(layer: PIXI.Container, ticker: PIXI.Ticker, board: Pegboard, score: Score) {
        this.layer = layer
        this.ticker = ticker
        this.board = board
        this.score = score
    }

    make = (x: number, y: number, vel: Velocity) => {
        const orb = new Orb(x, y, vel, this.ticker, this.board.bands, this.score)
        this.layer.addChild(orb)
        return orb
    }
}