import * as PIXI from 'pixi.js'
import { Renderer } from 'pixi.js'
import { setup } from './setup'
import { assets } from './assets'
import * as WebFont from 'webfontloader'

WebFont.load({
    google: {
        families: [assets.font]
    },
    fontloading: () => {
        let el = document.createElement('p')
        el.style.fontFamily = assets.font
        el.style.fontSize = '0'
        el.style.visibility = 'hidden'
        el.innerHTML = '.'
    
        document.body.appendChild(el)
    },
    active: () => setTimeout(start, 100),
})

function start() {
    const app = new PIXI.Application({
        width: 960,
        height: 960,
        antialias: true,
    })
    
    document.body.append(app.view)
    
    app.loader
        .add(assets.hole) // wow I just realized how close this looks to a certain other word
        .add(assets.tack)
        .add(assets.balloon.idle[0])
        .add(assets.balloon.pop[0])
        .add(assets.balloon.pop[1])
        .add(assets.balloon.pop[2])
        .load(setup(app.stage, app.renderer as Renderer, app.ticker))
}

