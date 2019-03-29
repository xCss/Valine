var unescapeMap = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#x60;'
};
for (var key in escapeMap) {
    unescapeMap[escapeMap[key]] = key;
}

var reUnescapedHtml = /[&<>"'`]/g
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#x60);/g
var reHasEscapedHtml = RegExp(reEscapedHtml.source)

function escape(s) {
    return (s && reHasUnescapedHtml.test(s)) ?
        s.replace(reUnescapedHtml, (chr) => escapeMap[chr]) :
        s
}

function unescape(s) {
    return (s && reHasEscapedHtml.test(s)) ?
        s.replace(reEscapedHtml, (entity) => unescapeMap[entity]) :
        s
}

module.exports = {
    escape,
    unescape
}