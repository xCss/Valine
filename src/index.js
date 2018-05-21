const {h,render} = require('preact')
const {ValineComponent} = require('./components')
const vUtils = require('./utils')
const vCore = require('./core')
// require('./index.scss')

function ValineFactory(options){
    let root = this
    root.vCore = vCore
    options && root.init(options)
}

ValineFactory.prototype.init = (options)=>{
    vUtils.domReady(()=>{
        let el = options.el || null,
            _el = document.querySelectorAll(el)
        el = el instanceof HTMLElement ? el : (_el[_el.length-1] || null)
        if(!el) throw new Error('Init failed. `el` not found.')
        return render(<ValineComponent vUtils={vUtils} vCore={vCore} options={options}/>,el)
    })

}


function Valine(options){
    return new ValineFactory(options)
}

module.exports = Valine

module.exports.default = Valine