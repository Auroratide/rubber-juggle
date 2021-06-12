export class Score {
    private score: number

    constructor(initial: number = 0) {
        this.score = initial
    }

    value = () => Math.round(this.score)

    add = (amount: number) => {
        this.score += amount
    }
}