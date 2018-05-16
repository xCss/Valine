// const h = require('preact').h
// const render = require('preact').render
// const Component = require('preact').Component
// const Core = require('./core')

import {h,render} from 'preact'

class ValineFactory {
    constructor(options = {}) {
        let root = this
        //root.Core = Core
        root.options = options
        if(options && options.appId){
            root.ready(()=>root.init(options))
        }
        return root
    }

    ready(callback) {
        let win = window, doc = document
        // don't use "interactive" on IE <= 10 (it can fired premature)
        if (doc.readyState === "complete" || (doc.readyState !== "loading" && !doc.documentElement.doScroll))
            setTimeout(() => callback && callback() , 0)
        else {
            let handler = () => {
                doc.removeEventListener("DOMContentLoaded", handler, false)
                win.removeEventListener("load", handler, false)
                callback && callback()
            }
            doc.addEventListener("DOMContentLoaded", handler, false)
            win.addEventListener("load", handler, false)
        }
        return this
    }

    init(options = {}){
        console.log(options)
        // return render()
    }
}

class Valine{
    constructor(options = {}){
        return new ValineFactory(options)
    }
}

module.exports = Valine

module.exports.default = Valine