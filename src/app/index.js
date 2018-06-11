import {h,render} from 'preact'
import {App} from './app'
import vUtils from '../utils'
import vCore from '../core'


export default class ValineFactory{
    constructor(options){
        let root = this
        options && root.init(options)
    }
    init(options){
        let root = this
        vUtils.domReady(()=>{
            let el = options.el || null,
                _el = document.querySelectorAll(el)
            el = el instanceof HTMLElement ? el : (_el[_el.length-1] || null)
            if(!el) throw new Error('Init failed. `el` not found.')
            return render(<App vUtils={vUtils} vCore={vCore} options={options}/>,el)
        })
    }

    counter(options){
        let root = this
        if(vCore.isInit()){
            
        }
    }
}

