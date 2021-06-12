import { State } from "./State"

export class StateManager {
    private currentState: string = ''
    private states: { [name: string]: State } = {}
    constructor() {}

    register = (name: string, state: State) => {
        this.states[name] = state
    }

    firstState = (state: string, context: any = {}) => {
        this.currentState = state
        this.states[this.currentState].start(context)
    }

    transitionTo = (state: string, context: any = {}) => {
        this.states[this.currentState].stop()
        this.currentState = state
        this.states[this.currentState].start(context)
    }
}