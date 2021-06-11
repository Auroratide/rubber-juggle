import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.append(app.view)

app.loader.load(() => {
    const text = new PIXI.Text('Hello world', {
        fill: 0xffffff,
    })

    app.stage.addChild(text)
})
