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

/**
 * String.fromCodePoint polyfill
 */
if (!String.fromCodePoint) {
    var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        var ret;
        try {
            var object = {};
            var _ = Object.defineProperty;
            ret = _(object, object, object) && _;
        } catch (e) {}
        return ret;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function () {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;
        if (!length) {
            return '';
        }
        var result = '';
        while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                codePoint < 0 || // not a valid Unicode code point
                codePoint > 0x10FFFF || // not a valid Unicode code point
                floor(codePoint) != codePoint // not an integer
            ) {
                throw RangeError('Invalid code point: ' + codePoint);
            }
            if (codePoint <= 0xFFFF) { // BMP code point
                codeUnits.push(codePoint);
            } else {
                // Astral code point; split in surrogate halves
                // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                highSurrogate = (codePoint >> 10) + 0xD800;
                lowSurrogate = (codePoint % 0x400) + 0xDC00;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    if (defineProperty) {
        defineProperty(String, 'fromCodePoint', {
            'value': fromCodePoint,
            'configurable': true,
            'writable': true
        });
    } else {
        String.fromCodePoint = fromCodePoint;
    }
}

let vUtils = 

module.exports = {
    oReady,
    detect,
    escape,
    unescape,
    domReady,
    deepClone
}