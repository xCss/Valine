require('./Valine.scss');
import snarkdown from 'snarkdown';

const defaultComment = {
    at: '',
    comment: '',
    rid: '',
    nick: 'unknow',
    mail: '',
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
        let eleHTML = `<div class="vwrap"><div class="vedit"><textarea class="veditor vinput" placeholder="${placeholder}"></textarea></div><div class="vcontrol"><div class='vident'><input placeholder="称呼" class="vnick vinput" type="text"><input placeholder="网址(http://)" class="vlink vinput" type="text"><input placeholder="邮箱" class="vmail vinput" type="text"></div><div class="vright"><button type="button" class="vsubmit vbtn">回复</button></div></div><div style="display:none;" class="vmark"></div></div><div class="pd5 txt-right power">Powered By <a href="https://github.com/xCss/Valine" target="_blank">Valine</a></div><ul class="vlist"><li class="vloading"></li><li class="vempty"></li></ul>`;
        _root.element.innerHTML = eleHTML;

        // loading
        let _spinner = `<div class="spinner"><div class="r1"></div><div class="r2"></div><div class="r3"></div><div class="r4"></div><div class="r5"></div></div>`;
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
        query.descending('updatedAt');
        query.limit('1000');
        query.find().then(ret => {
            _root.loading.hide();
            let _temp = [];
            if (ret.length) {
                _root.nodata.hide();
                for (let i = ret.length - 1; i > -1; i--) {
                    let item = ret[i];
                    let _vcard = document.createElement('li');
                    _vcard.setAttribute('class', 'vcard');
                    _vcard.setAttribute('id', item.id);
                    _vcard.innerHTML = `<div class="vhead" ><a href="${getLink({link:item.get('link') ,mail:item.get('mail')})}" target="_blank" >${item.get("nick")}</a><span class="vtime">${dateFormat(item.get("updatedAt"))}</span><span rid='${item.id}' at='@${item.get('nick')}' class="vat">回复</span></div><div class="vcomment">${item.get("comment")}</div>`;
                    let _vlist = _root.element.querySelector('.vlist');
                    let _vlis = _vlist.querySelectorAll('li');
                    let _vat = _vcard.querySelector('.vat');
                    let _a = _vcard.querySelectorAll('a');
                    _a.forEach(item => {
                        item.setAttribute('target', '_blank');
                    })
                    _root.bindAt(_vat);
                    _vlist.insertBefore(_vcard, _vlis[1]);
                }
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
            vlink: "link",
            vmail: 'mail'
        };
        let inputs = {};
        for (var i in mapping) {
            let _v = mapping[i];
            let _el = _root.element.querySelector(`.${i}`);
            inputs[_v] = _el;
            _el.addEventListener('input', (e) => {
                defaultComment[_v] = HtmlUtil.encode(HtmlUtil.transUrl(_el.value.replace(/(^\s*)|(\s*$)/g, "")));
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
            defaultComment['at'] = '';
        }

        let _mark = _root.element.querySelector('.vmark');
        // alert
        _root.alert = {
            show(txt, cb) {
                let _confirm = `<div class="valert txt-center"><div class="vtext">${txt}</div><div><button class="vcancel vbtn">我再看看</button><button class="vsure vbtn">继续提交</button></div></div>`;
                _mark.innerHTML = _confirm;
                _mark.querySelector('.vcancel').addEventListener('click', function(e) {
                    _root.alert.hide();
                });
                let _ok = _mark.querySelector('.vsure');
                _mark.setAttribute('style', 'display:block;');
                Event.on('click', _ok, e => {
                    cb && cb();
                    _root.alert.hide();
                });
            },
            hide() {
                _mark.setAttribute('style', 'display:none;');
            }
        }

        // submit
        let submitBtn = _root.element.querySelector('.vsubmit');
        let submitEvt = (e) => {
            if (defaultComment.comment == '') {
                inputs['comment'].focus();
                return;
            }
            if (defaultComment.nick == '') {
                defaultComment['nick'] = '小调皮';
            }

            defaultComment.comment = snarkdown(defaultComment.comment);
            let idx = defaultComment.comment.indexOf(defaultComment.at);
            if (idx > -1 && defaultComment.at != '') {
                let at = `<a href='#${defaultComment.rid}'>${defaultComment.at}</a>`;
                defaultComment.comment = defaultComment.comment.replace(defaultComment.at, at);
            }
            // veirfy
            let mailRet = verify.mail(defaultComment.mail);
            let linkRet = verify.link(defaultComment.link);
            if (!mailRet.k && !linkRet.k) {
                _root.alert.show('您的网址和邮箱格式不正确, 是否继续提交?', commitEvt)
            } else if (!mailRet.k) {
                defaultComment['link'] = linkRet.v;
                _root.alert.show('您的邮箱格式不正确, 是否继续提交?', commitEvt)
            } else if (!linkRet.k) {
                defaultComment['mail'] = mailRet.v;
                _root.alert.show('您的网址格式不正确, 是否继续提交?', commitEvt)
            } else {
                defaultComment['mail'] = mailRet.v;
                defaultComment['link'] = linkRet.v;
                commitEvt()
            }
        }

        let commitEvt = () => {
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
                _vcard.setAttribute('id', ret.id);
                _vcard.innerHTML = `<div class="vhead" ><a href="${getLink({link:ret.get('link') ,mail:ret.get('mail')})}" target="_blank" >${ret.get('nick')}</a><span class="vtime">${dateFormat(ret.get("updatedAt"))}</span><span rid='${ret.id}' at='@${ret.get('nick')}' class="vat">回复</span></div><div class="vcomment">${ret.get('comment')}</div>`;
                let _vlist = _root.element.querySelector('.vlist');
                let _vlis = _vlist.querySelectorAll('li');
                let _a = _vcard.querySelectorAll('a');
                _a.forEach(item => {
                    item.setAttribute('target', '_blank');
                })
                let _vat = _vcard.querySelector('.vat');
                _root.bindAt(_vat);
                _vlist.insertBefore(_vcard, _vlis[1]);
                _root.reset();
                _root.loading.hide();
                _root.nodata.hide();

            }).catch(ex => {
                _root.loading.hide();
            })
        }

        // at event
        let atEvt = (el, cb) => {
            Event.off('click', el, cb)
            Event.on('click', el, cb)
        }
        _root.bindAt = (el) => {
            atEvt(el, (e) => {
                let at = el.getAttribute('at');
                let rid = el.getAttribute('rid');
                defaultComment['at'] = at;
                defaultComment['rid'] = rid;
                inputs['comment'].value = `${at} ，`;
                inputs['comment'].focus();
            })
        }

        Event.off('click', submitBtn, submitEvt);
        Event.on('click', submitBtn, submitEvt);


    }

}

const Event = {
    on(type, el, handler, capture) {
        if (el.addEventListener) el.addEventListener(type, handler, capture || false);
        else if (el.attachEvent) el.attachEvent(`on${type}`, handler);
        else el[`on${type}`] = handler;
    },
    off(type, el, handler, capture) {
        if (el.removeEventListener) el.removeEventListener(type, handler, capture || false);
        else if (el.detachEvent) el.detachEvent(`on${type}`, handler);
        else el[`on${type}`] = null;
    },
    // getEvent(e) {
    //     return e || window.event;
    // },
    // getTarget(e) {
    //     return e.target || e.srcElement;
    // },
    // preventDefault(e) {
    //     e = e || window.event;
    //     e.preventDefault && e.preventDefault() || (e.returnValue = false);
    // },
    // stopPropagation(e) {
    //     e = e || window.event;
    //     e.stopPropagation && e.stopPropagation() || (e.cancelBubble = true);
    // }
}




const getLink = (target) => {
    return target.link || (target.mail && `mailto:${target.mail}`) || 'javascript:void(0);';
}

const verify = {
    mail(m) {
        return {
            k: /[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/.test(m),
            v: m
        };
    },
    link(l) {
        l = /^(http|https)/.test(l) ? l : `http://${l}`;
        return {
            k: /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(l),
            v: l
        };
    }
}

const HtmlUtil = {

    /**
     * 
     * 将str中的链接转换成a标签形式
     * @param {String} str 
     * @returns 
     */
    transUrl(str) {
        let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return str.replace(reg, '<a target="_blank" href="$1$2">$1$2</a>');
    },
    /**
     * HTML转码
     * @param {String} str 
     * @return {String} result
     */
    encode(str) {
        return !!str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;") : '';
    },
    /**
     * HTML解码
     * @param {String} str 
     * @return {String} result
     */
    decode(str) {
        return !!str ? str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"") : '';
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