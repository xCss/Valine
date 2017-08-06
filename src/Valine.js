require('./Valine.scss');

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

const class2type = {};
const toString = class2type.toString;

class Valine {
    /**
     * Valine constructor function
     * @param {Object} option 
     * @constructor 
     */
    constructor(option) {

        // Valine init
        this.init(option);

        // Bind Event
        this.bind();

    }

    /**
     * Valine Init
     * @param {Object} option 
     */
    init(option) {
        let _root = this;
        let av = option.av || _root._av;
        if (av && av.version) {
            av.init({
                appId: option.app_id || option.appId,
                appKey: option.app_key || option.appKey
            });
            _root._av = av;
        }
        try {
            _root.element = toString.call(option.el) === "[object HTMLDivElement]" ? option.el : document.querySelectorAll(option.el)[0];
        } catch (ex) {
            log('The target element does not exist');
            return;
        }
        _root.element.classList.add('valine');

        let eleHTML = `
        <div class="vwrap">
            <div class="vedit">
                <textarea class="veditor vinput" placeholder="请开始你的表演Thanks♪(･ω･)ﾉ"></textarea>
            </div>
            <div class="vcontrol">
                <div class='vident'>
                    <input placeholder="称呼" class="vnick vinput" type="text">
                    <input placeholder="网址" class="vlink vinput" type="text">
                </div>
                <div class="vright">
                    <button type="button" class="vsubmit vbtn">回复</button>
                </div>
            </div>
        </div>
        <ul class="vlist"><li class="vloading"></li><li class="vempty"></li></ul><div class="pd5 txt-right power">Powered By <a href="https://github.com/xCss/Valine" target="_blank">Valine</a></div>`;
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
        let query = new _root._av.Query('Comment');
        query.equalTo('url', location.pathname);
        // query.descending('createdAt');
        query.find().then(ret => {
            _root.loading.hide();
            let _temp = [];
            if (ret.length) {
                _root.nodata.hide();
                ret.forEach(item => {
                    let _vcard = document.createElement('li');
                    _vcard.setAttribute('class', 'vcard');
                    _vcard.setAttribute('data-id', ret.id);
                    _vcard.innerHTML = `<div class="vhead"><a href="${item.get('link') || 'javascript:void(0);'}" target="_blank" data-id="${item.id}" class="vat">${item.get("nick")}</a><span class="vtime">${item.get("createdAt")}</span></div><div class="vcomment">${item.get("comment")}</div>`;
                    let _vlist = _root.element.querySelector('.vlist');
                    let _vlis = _vlist.querySelectorAll('li');
                    _vlist.insertBefore(_vcard, _vlis[0]);
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
            _el.addEventListener('input', function(e) {
                let _temp = this;
                defaultComment[_v] = _temp.value.replace(/(^\s*)|(\s*$)/g, "");
            }, false);
        }
        // reset form
        _root.reset = function() {
            for (var i in mapping) {
                let _v = mapping[i];
                let _el = _root.element.querySelector(`.${i}`);
                _el.value = "";
                defaultComment[_v] = "";
            }
        }
        let vsubmit = _root.element.querySelector('.vsubmit');
        vsubmit.addEventListener('click', function(e) {
            if (defaultComment.comment == '') {
                inputs['comment'].focus();
                return;
            }
            defaultComment.comment = HtmlUtil.encode(defaultComment.comment);
            _root.loading.show();

            // 声明类型
            let Ct = _root._av.Object.extend('Comment');
            // 新建对象
            let comment = new Ct();
            for (let i in defaultComment) {
                let _v = defaultComment[i];
                log(i, _v);
                comment.set(i, _v);
            }
            log(comment);
            log(defaultComment);
            return;
            comment.save().then((ret) => {
                let _vcard = document.createElement('li');
                _vcard.setAttribute('class', 'vcard');
                _vcard.setAttribute('data-id', ret.id);
                _vcard.innerHTML = `<div class="vhead"><a href="${item.get('link') || 'javascript:void(0);'}" target="_blank" data-id="${ret.id}" class="vat">${ret.get('nick')}</a><span class="vtime">${ret.get("createdAt")}</span></div><div class="vcomment">${ret.get('comment')}</div>`;
                let _vlist = _root.element.querySelector('.vlist');
                let _vlis = _vlist.querySelectorAll('li');
                _vlist.insertBefore(_vcard, _vlis[0]);
                _root.reset();
                _root.loading.hide();
                _root.nodata.hide();

            }).catch(ex => {
                log(ex)
                _root.loading.hide();
            })
        }, false)
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

module.exports = Valine;