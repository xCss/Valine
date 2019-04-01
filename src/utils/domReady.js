let win = window, doc = document

/**
 * Detection DOM is Ready
 * @param {Function} callback 
 */
function domReady(callback) {
    if (doc.readyState === "complete" || (doc.readyState !== "loading" && !doc.documentElement.doScroll))
        setTimeout(() => callback && callback(), 0)
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

module.exports = domReady