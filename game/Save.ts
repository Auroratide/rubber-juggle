export class Save {
    highscore: SaveValue

    constructor(storage: Storage) {
        this.highscore = new SaveValue(storage, 'com.auroratide.pegglejuggle::highscore', '0')
    }
}

class SaveValue {
    private storage: Storage
    private key: string
    private default: string
    constructor(storage: Storage, key: string, defaultValue: string) {
        this.storage = storage
        this.key = key
        this.default = defaultValue
    }
  
    get = () => this.storage.getItem(this.key) || this.default
  
    set = (value: string) => this.storage.setItem(this.key, value)
}