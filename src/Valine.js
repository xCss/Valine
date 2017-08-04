require('./Valine.scss');
class Valine {
    /**
     * Valine constructor function
     * @param {Object} opts 
     * @constructor 
     */
    constructor(opts, AV) {
        // let avScript = document.createElement('script');
        // avScript.src = '//cdn1.lncld.net/static/js/3.0.4/av-min.js';
        // let s = document.getElementsByTagName("script")[0];
        // s.parentNode.insertBefore(avScript, s);
        if (AV && AV.version) {
            this._av = AV;
            this._av.init({
                appId: opts.app_id,
                appKey: opts.app_key
            })
        }
    }
}

module.exports = Valine;