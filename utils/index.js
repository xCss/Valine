/**
 * vUtils
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */
import deepClone from './deepClone'
import detect from './detect'
import {escape,unescape} from './escape'
import domReady from './domReady'

/**
 * Detection target Object is ready
 * @param {Object} o 
 * @param {Function} callback 
 */
function oReady(o, callback) {
    !!o && (callback && callback()) || setTimeout(() => oReady(o, callback), 10)
}

module.exports = {
    oReady,
    detect,
    escape,
    unescape,
    domReady,
    deepClone
}