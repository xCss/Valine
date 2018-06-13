const vCore = require('./core/leancloud.js')
const domReady = require('./utils/domReady.js')
const md5 = require('blueimp-md5')
const marked = require('marked')
const detect = require('./utils/detect')
const timeAgo = require('./utils/timeago')
const xss = require('xss')
var commentXssWhiteList = {"a":["target","href","title", 'class'],"abbr":["title"],"address":[],"area":["shape","coords","href","alt"],"article":[],"aside":[],"audio":["autoplay","controls","loop","preload","src"],"b":[],"bdi":["dir"],"bdo":["dir"],"big":[],"blockquote":["cite"],"br":['class'],"caption":[],"center":[],"cite":[],"code":['class', 'codemark'],"col":["align","valign","span","width"],"colgroup":["align","valign","span","width"],"dd":[],"del":["datetime"],"details":["open"],"div":[],"dl":[],"dt":[],"em":[],"font":["color","size","face"],"footer":[],"h1":[],"h2":[],"h3":[],"h4":[],"h5":[],"h6":[],"header":[],"hr":[],"i":[],"img":["src","alt","title","width","height"],"ins":["datetime"],"li":[],"mark":[],"nav":[],"ol":[],"p":['class'],"pre":['class', 'style'],"s":[],"section":[],"small":[],"span":['class'],"sub":[],"sup":[],"strong":[],"table":["width","border","align","valign"],"tbody":["align","valign"],"td":["width","rowspan","colspan","align","valign"],"tfoot":["align","valign"],"th":["width","rowspan","colspan","align","valign"],"thead":["align","valign"],"tr":["rowspan","align","valign"],"tt":[],"u":[],"ul":[],"video":["autoplay","controls","loop","preload","src","height","width"]}
var contentFilterXss = new xss.FilterXSS({
    whiteList: commentXssWhiteList,
});
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
})

function ValineFactory(options){
    let root = this
    options && root.init(options)
    return root
}

ValineFactory.prototype.init = function(options){
    let root = this
    domReady(()=>{
        let el = options.el || null,
        _el = document.querySelectorAll(el),
        len = _el.length
        el = el instanceof HTMLElement ? el : (_el[len-1] || null)
        if(!el) throw new Error('Init failed. `el` not found.')
        let core = root.vCore
        root.vCore = core && core.initialized && core || vCore(options)
        root.el = el
        console.log(root)
    })
}


function Valine(options){
    return new ValineFactory(options)
}

module.exports = Valine
module.exports.default = Valine