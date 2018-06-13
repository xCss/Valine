/**
 * vEmojis
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

const vEmojis = {
    ready:true
}

vEmojis._emojis = [
    {"name":"point_up","code":"261D","rate":0},
    {"name":"fist","code":"270A","rate":0},
    {"name":"hand","code":"270B","rate":0},
    {"name":"eyes","code":"1F440","rate":0},
    {"name":"ear","code":"1F442","rate":0},
    {"name":"nose","code":"1F443","rate":0},
    {"name":"lips","code":"1F444","rate":0},
    {"name":"tongue","code":"1F445","rate":0},
    {"name":"point_up_2","code":"1F446","rate":0},
    {"name":"point_down","code":"1F447","rate":0},
    {"name":"point_left","code":"1F448","rate":0},
    {"name":"point_right","code":"1F449","rate":0},
    {"name":"facepunch","code":"1F44A","rate":0},
    {"name":"wave","code":"1F44B","rate":0},
    {"name":"ok_hand","code":"1F44C","rate":0},
    {"name":"+1","code":"1F44D","rate":0},
    {"name":"-1","code":"1F44E","rate":0},
    {"name":"clap","code":"1F44F","rate":0},
    {"name":"cupid","code":"1F498","rate":0},
    {"name":"sparkling_heart","code":"1F496","rate":0},
    {"name":"open_hands","code":"1F450","rate":0},
    {"name":"grinning","code":"1F600","rate":0},
    {"name":"grin","code":"1F601","rate":0},
    {"name":"joy","code":"1F602","rate":0},
    {"name":"smiley","code":"1F603","rate":0},
    {"name":"smile","code":"1F604","rate":0},
    {"name":"sweat_smile","code":"1F605","rate":0},
    {"name":"laughing","code":"1F606","rate":0},
    {"name":"innocent","code":"1F607","rate":0},
    {"name":"smiling_imp","code":"1F608","rate":0},
    {"name":"wink","code":"1F609","rate":0},
    {"name":"blush","code":"1F60A","rate":0},
    {"name":"yum","code":"1F60B","rate":0},
    {"name":"relieved","code":"1F60C","rate":0},
    {"name":"heart_eyes","code":"1F60D","rate":0},
    {"name":"sunglasses","code":"1F60E","rate":0},
    {"name":"smirk","code":"1F60F","rate":0},
    {"name":"neutral_face","code":"1F610","rate":0},
    {"name":"expressionless","code":"1F611","rate":0},
    {"name":"unamused","code":"1F612","rate":0},
    {"name":"sweat","code":"1F613","rate":0},
    {"name":"pensive","code":"1F614","rate":0},
    {"name":"confused","code":"1F615","rate":0},
    {"name":"confounded","code":"1F616","rate":0},
    {"name":"kissing","code":"1F617","rate":0},
    {"name":"kissing_heart","code":"1F618","rate":0},
    {"name":"kissing_smiling_eyes","code":"1F619","rate":0},
    {"name":"kissing_closed_eyes","code":"1F61A","rate":0},
    {"name":"stuck_out_tongue","code":"1F61B","rate":0},
    {"name":"stuck_out_tongue_winking_eye","code":"1F61C","rate":0},
    {"name":"stuck_out_tongue_closed_eyes","code":"1F61D","rate":0},
    {"name":"disappointed","code":"1F61E","rate":0},
    {"name":"worried","code":"1F61F","rate":0},
    {"name":"angry","code":"1F620","rate":0},
    {"name":"rage","code":"1F621","rate":0},
    {"name":"cry","code":"1F622","rate":0},
    {"name":"persevere","code":"1F623","rate":0},
    {"name":"triumph","code":"1F624","rate":0},
    {"name":"disappointed_relieved","code":"1F625","rate":0},
    {"name":"frowning","code":"1F626","rate":0},
    {"name":"anguished","code":"1F627","rate":0},
    {"name":"fearful","code":"1F628","rate":0},
    {"name":"weary","code":"1F629","rate":0},
    {"name":"sleepy","code":"1F62A","rate":0},
    {"name":"tired_face","code":"1F62B","rate":0},
    {"name":"grimacing","code":"1F62C","rate":0},
    {"name":"sob","code":"1F62D","rate":0},
    {"name":"open_mouth","code":"1F62E","rate":0},
    {"name":"hushed","code":"1F62F","rate":0},
    {"name":"cold_sweat","code":"1F630","rate":0},
    {"name":"scream","code":"1F631","rate":0},
    {"name":"astonished","code":"1F632","rate":0},
    {"name":"flushed","code":"1F633","rate":0},
    {"name":"sleeping","code":"1F634","rate":0},
    {"name":"dizzy_face","code":"1F635","rate":0},
    {"name":"no_mouth","code":"1F636","rate":0},
    {"name":"mask","code":"1F637","rate":0},
    {"name":"pray","code":"1F64F","rate":0}
]

vEmojis.sort = function(){
    return vEmojis._emojis
}


/**
 * String.fromCodePoint polyfill
 */
var fromCodePoint;
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
    fromCodePoint = function () {
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

module.exports = vEmojis