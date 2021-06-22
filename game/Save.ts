export class Save {
    highscore: SaveValue

    constructor(storage: Storage) {
        this.highscore = new SaveValue(storage, 'com.auroratide.rubberjuggle::highscore', '0')
        
        // We should keep high scores already created by players of olde
        const legacyName = 'com.auroratide.pegglejuggle::highscore'
        if (storage.getItem(legacyName)) {
            this.highscore.set(storage.getItem(legacyName))
            storage.removeItem(legacyName)
        }
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