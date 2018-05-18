/**
 * vUtils
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

let vUtils = {}, win = window, doc = document
/**
 * Detection DOM 
 * @param {Function} callback 
 */
vUtils.domReady = (callback)=>{
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
}
/**
 * Detection target Object is ready
 * @param {Object} o 
 * @param {Function} callback 
 */
vUtils.oReady = (o,callback)=>{
    !!o && (callback && callback()) || setTimeout(()=>vUtils.oReady(o),10) 
}