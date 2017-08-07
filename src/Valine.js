require('./Valine.scss');
import snarkdown from 'snarkdown';

const defaultComment = {
    comment: '',
    rid: '',
    nick: 'unknow',
    link: '',
    ua: navigator.userAgent,
    url: location.pathname,
    pin: 0,
    like: 0
};

const log = console.log;
const toString = {}.toString;

class Valine {
    /**
     * Valine constructor function
     * @param {Object} option 
     * @constructor 
     */
    constructor(option) {

        let _root = this;

        window.onload = () => {

            // Valine init
            _root.init(option);

            // Bind Event
            _root.bind();
        }

    }

    /**
     * Valine Init
     * @param {Object} option 
     */
    init(option) {
        let _root = this;
        let av = option.av || _root.v;
        if (av && av.version) {
            av.init({
                appId: option.app_id || option.appId,
                appKey: option.app_key || option.appKey
            });
            _root.v = av;
        }
        try {
            _root.element = toString.call(option.el) === "[object HTMLDivElement]" ? option.el : document.querySelectorAll(option.el)[0];
        } catch (ex) {
            log('The target element does not exist');
            return;
        }
        _root.element.classList.add('valine');
        let placeholder = option.placeholder || 'ヾﾉ≧∀≦)o来啊，快活啊!';
        let eleHTML = `<div class="vwrap"><div class="vedit"><textarea class="veditor vinput" placeholder="${placeholder}"></textarea></div><div class="vcontrol"><div class='vident'><input placeholder="称呼" class="vnick vinput" type="text"><input placeholder="网址" class="vlink vinput" type="text"></div><div class="vright"><button type="button" class="vsubmit vbtn">回复</button></div></div></div><div class="pd5 txt-right power">Powered By <a href="https://github.com/xCss/Valine" target="_blank">Valine</a></div><ul class="vlist"><li class="vloading"></li><li class="vempty"></li></ul>`;
        _root.element.innerHTML = eleHTML;

        // loading
        let _spinner = `<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>`;
        let vloading = _root.element.querySelector('.vloading');
        vloading.innerHTML = _spinner;
        // loading control
        _root.loading = {
            show() {
                vloading.setAttribute('style', 'display:block;');
            },
            hide() {
                vloading.setAttribute('style', 'display:none;');
            }
        };

        // Empty Data
        let vempty = _root.element.querySelector('.vempty');
        vempty.innerText = `还没有评论哦，快来抢沙发吧!`;
        _root.nodata = {
            show() {
                vempty.setAttribute('style', 'display:block;');
            },
            hide() {
                vempty.setAttribute('style', 'display:none;');
            }
        }

        _root.loading.show();
        _root.nodata.hide();
        let query = new _root.v.Query('Comment');
        query.equalTo('url', location.pathname);
        query.ascending('createdAt');
        query.find().then(ret => {
            _root.loading.hide();
            let _temp = [];
            if (ret.length) {
                _root.nodata.hide();
                ret.forEach(item => {
                    let _vcard = document.createElement('li');
                    _vcard.setAttribute('class', 'vcard');
                    _vcard.setAttribute('data-id', item.id);
                    _vcard.innerHTML = `<div class="vhead"><a href="${item.get('link') || 'javascript:void(0);'}" target="_blank" data-id="${item.id}">${item.get("nick")}</a><span class="vtime">${dateFormat(item.get("createdAt"))}</span><span rid='${item.id}' at='${item.get('nick')}' class="vat">回复</span></div><div class="vcomment">${item.get("comment")}</div>`;
                    let _vlist = _root.element.querySelector('.vlist');
                    let _vlis = _vlist.querySelectorAll('li');
                    let _vat = _vcard.querySelector('.vat');
                    _root.bindAt(_vat);
                    _vlist.insertBefore(_vcard, _vlis[1]);
                });
            } else {
                _root.nodata.show();
            }
        }).catch(ex => {
            _root.loading.hide();
            _root.nodata.show();
        })
    }

    /**
     * Bind Event
     */
    bind() {
        let _root = this;

        let mapping = {
            veditor: "comment",
            vnick: "nick",
            vlink: "link"
        };
        let inputs = {};
        for (var i in mapping) {
            let _v = mapping[i];
            let _el = _root.element.querySelector(`.${i}`);
            inputs[_v] = _el;
            _el.addEventListener('input', (e) => {
                defaultComment[_v] = _el.value.replace(/(^\s*)|(\s*$)/g, "");
            });
        }

        // reset form
        _root.reset = () => {
            for (var i in mapping) {
                let _v = mapping[i];
                let _el = _root.element.querySelector(`.${i}`);
                _el.value = "";
                defaultComment[_v] = "";
            }
            defaultComment['nick'] = 'unknow';
            defaultComment['rid'] = '';
        }

        // at event
        _root.bindAt = (el) => {
            el.addEventListener('click', (e) => {
                let at = el.getAttribute('at');
                // let rid = el.getAttribute('rid');
                inputs['comment'].value = `@${at} ，`;
                inputs['comment'].focus();
            })
        }

        // submit
        let vsubmit = _root.element.querySelector('.vsubmit');
        vsubmit.addEventListener('click', (e) => {
            if (defaultComment.comment == '') {
                inputs['comment'].focus();
                return;
            }
            if (defaultComment.nick == '') {
                defaultComment['nick'] = '小调皮';
            }
            defaultComment.comment = snarkdown(defaultComment.comment);
            _root.loading.show();

            // 声明类型
            let Ct = _root.v.Object.extend('Comment');
            // 新建对象
            let comment = new Ct();
            for (let i in defaultComment) {
                let _v = defaultComment[i];
                comment.set(i, _v);
            }
            comment.save().then((ret) => {
                let _vcard = document.createElement('li');
                _vcard.setAttribute('class', 'vcard');
                _vcard.setAttribute('data-id', ret.id);
                _vcard.innerHTML = `<div class="vhead"><a href="${ret.get('link') || 'javascript:void(0);'}" target="_blank" data-id="${ret.id}">${ret.get('nick')}</a><span class="vtime">${dateFormat(ret.get("createdAt"))}</span><span rid='${ret.id}' at='${ret.get('nick')}' class="vat">回复</span></div><div class="vcomment">${ret.get('comment')}</div>`;
                let _vlist = _root.element.querySelector('.vlist');
                let _vlis = _vlist.querySelectorAll('li');
                let _vat = _vcard.querySelector('.vat');
                _root.bindAt(_vat);
                _vlist.insertBefore(_vcard, _vlis[1]);
                _root.reset();
                _root.loading.hide();
                _root.nodata.hide();

            }).catch(ex => {
                _root.loading.hide();
            })
        })
    }

}
const HtmlUtil = {
    /**
     * HTML转码
     * @param {String} str 
     * @return {String} result
     */
    encode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        return s;
    },
    /**
     * HTML解码
     * @param {String} str 
     * @return {String} result
     */
    decode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    }
};

const dateFormat = (date) => {
    var vDay = padWithZeros(date.getDate(), 2);
    var vMonth = padWithZeros(date.getMonth() + 1, 2);
    var vYear = padWithZeros(date.getFullYear(), 2);
    var vHour = padWithZeros(date.getHours(), 2);
    var vMinute = padWithZeros(date.getMinutes(), 2);
    var vSecond = padWithZeros(date.getSeconds(), 2);
    return `${vYear}-${vMonth}-${vDay} ${vHour}:${vMinute}:${vSecond}`;
}

const padWithZeros = (vNumber, width) => {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}

module.exports = Valine;