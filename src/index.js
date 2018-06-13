const vCore = require('./core/leancloud.js')
const domReady = require('./utils/domReady.js')

function ValineFactory(options){
    let root = this
    options && root.init(options)
    return root
}

ValineFactory.prototype.init = function(options){
    let root = this
    root.vCore = vCore(options)
    domReady(()=>{
        let el = options.el || null,
        _el = document.querySelectorAll(el)
        el = el instanceof HTMLElement ? el : (_el[_el.length-1] || null)
        if(!el) throw new Error('Init failed. `el` not found.')
    })
    console.log(root.vCore)
}


function Valine(options){
    return new ValineFactory(options)
}

module.exports = Valine
module.exports.default = Valine