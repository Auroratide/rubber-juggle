import { sound } from '@pixi/sound'
import { assets } from './assets'

export class SoundManager {
    click: Sound
    thimp: Sound
    place: Sound
    pop: Sound
    thump: Sound

    constructor() {
        this.click = new Sound('click', assets.sfx.click)
        this.thimp = new Sound('thimp', assets.sfx.thimp)
        this.place = new Sound('place', assets.sfx.place)
        this.pop = new Sound('pop', assets.sfx.pop)
        this.thump = new Sound('thump', assets.sfx.thump)
    }
}

class Sound {
    key: string

    constructor(key: string, asset: string) {
        this.key = key
        sound.add(key, asset)
    }

    play = () => sound.play(this.key)
}