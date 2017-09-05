require('./Valine.scss');
const md5 = require('blueimp-md5');
import snarkdown from 'snarkdown';
const v2cdn = 'https://cdn.v2ex.com/gravatar/';
const defaultComment = {
    comment: '',
    rid: '',
    nick: 'Guest',
    mail: '',
    link: '',
    ua: navigator.userAgent,
    url: '',
    pin: 0,
    like: 0
};


let defaultPage = {
    pageNo: 1,
    pageSize: 15,
    pagination: false
}

const store = localStorage;
class Valine {
    /**
     * Valine constructor function
     * @param {Object} option 
     * @constructor 
     */
    constructor(option) {
        let _root = this;
        // version
        _root.version = '1.1.7-beta1';

        _root.md5 = md5;
        // Valine init
        !!option && _root.init(option);
    }

    /**
     * Valine Init
     * @param {Object} option 
     */
    init(option) {
        let _root = this;
        try {
            let el = ({}).toString.call(option.el) === "[object HTMLDivElement]" ? option.el : document.querySelectorAll(option.el)[0];
            if (({}).toString.call(el) != '[object HTMLDivElement]') {
                throw `The target element was not found.`;
            }
            _root.el = el;
            _root.el.classList.add('valine');
            let placeholder = option.placeholder || '';
            let eleHTML = `<div class="vwrap"><div class="vedit"><textarea class="veditor vinput" placeholder="${placeholder}"></textarea></div><div class="vcontrol"><div class='vident'><input name="nick" placeholder="称呼" class="vnick vinput" type="text"><input name="link" placeholder="网址(http://)" class="vlink vinput" type="text"><input name="mail" placeholder="邮箱" class="vmail vinput" type="email"></div><div class="vright"><button type="button" class="vsubmit vbtn">回复</button></div></div><div style="display:none;" class="vmark"></div></div><div class="info"><div class="count col"></div></div><div class="vloading"></div><div class="vempty" style="display:none;"></div><ul class="vlist"></ul><div class="vpage txt-center"></div><div class="info"><div class="power txt-right">Powered By <a href="https://github.com/xCss/Valine" target="_blank">Valine</a></div></div>`;
            _root.el.innerHTML = eleHTML;


            // Empty Data
            let vempty = _root.el.querySelector('.vempty');
            _root.nodata = {
                show(txt) {
                    vempty.innerHTML = txt || `还没有评论哦，快来抢沙发吧!`;
                    vempty.setAttribute('style', 'display:block;');
                },
                hide() {
                    vempty.setAttribute('style', 'display:none;');
                }
            }


            // loading
            let _spinner = `<div class="spinner"><div class="r1"></div><div class="r2"></div><div class="r3"></div><div class="r4"></div><div class="r5"></div></div>`;
            let vloading = _root.el.querySelector('.vloading');
            vloading.innerHTML = _spinner;
            // loading control
            _root.loading = {
                show() {
                    vloading.setAttribute('style', 'display:block;');
                    _root.nodata.hide();
                },
                hide() {
                    vloading.setAttribute('style', 'display:none;');
                    _root.el.querySelectorAll('.vcard').length === 0 && _root.nodata.show();
                }
            };
            //_root.nodata.show();

            _root.notify = option.notify || !1;
            _root.verify = option.verify || !1;

            let av = option.av || AV;
            let appId= option.app_id || option.appId;
            let appKey= option.app_key || option.appKey;
            if(!appId || !appKey){
                _root.loading.hide();
                throw '初始化失败，请检查你的appid或者appkey.';
                return;
            }
            av.init({
                appId: appId,
                appKey: appKey
            });
            _root.v = av;
            defaultComment.url = option.path || location.pathname;
            defaultPage.pagination = ({}).toString.call(option.pagination) == "[object Boolean]" ? option.pagination : !1;
            defaultPage.pageSize = isNaN(option.pageSize) ? 15 : option.pageSize;

        } catch (ex) {
            let issue = 'https://github.com/xCss/Valine/issues';
            if (_root.el) _root.nodata.show(`<pre style="color:red;text-align:left;">${ex}<br>Valine:<b>${_root.version}</b><br>反馈：${issue}</pre>`);
            else console && console.log(`%c${ex}\n%cValine%c${_root.version} ${issue}`, 'color:red;', 'background:#000;padding:5px;line-height:30px;color:#fff;', 'background:#456;line-height:30px;padding:5px;color:#fff;');
            return;
        }

        let _mark = _root.el.querySelector('.vmark');
        // alert
        _root.alert = {
            /**
             * {
             *  type:0/1,
             *  text:'',
             *  ctxt:'',
             *  otxt:'',
             *  cb:fn
             * }
             * 
             * @param {Object} o 
             */
            show(o) {
                _mark.innerHTML = `<div class="valert txt-center"><div class="vtext">${o.text}</div><div class="vbtns"></div></div>`;
                let _vbtns = _mark.querySelector('.vbtns');
                let _cBtn = `<button class="vcancel vbtn">${ o && o.ctxt || '我再看看' }</button>`;
                let _oBtn = `<button class="vsure vbtn">${ o && o.otxt || '继续提交' }</button>`;
                _vbtns.innerHTML = `${_cBtn}${o.type && _oBtn}`;
                _mark.querySelector('.vcancel').addEventListener('click', function(e) {
                    _root.alert.hide();
                });
                _mark.setAttribute('style', 'display:block;');
                if (o && o.type) {
                    let _ok = _mark.querySelector('.vsure');
                    Event.on('click', _ok, (e) => {
                        _root.alert.hide();
                        o.cb && o.cb();
                    });
                }
            },
            hide() {
                _mark.setAttribute('style', 'display:none;');
            }
        }


        // Bind Event
        _root.bind();
    }

    /**
     * Bind Event
     */
    bind() {
        let _root = this;

        let expandEvt = (el) => {
            if (el.offsetHeight > 180) {
                el.classList.add('expand');
                Event.on('click', el, (e) => {
                    el.setAttribute('class', 'vcontent');
                })
            }
        }
        let commonQuery = (cb) => {
            let query = new _root.v.Query('Comment');
            query.equalTo('url', defaultComment['url']);
            query.descending('createdAt');
            return query;
        }
        // let initPages = (cb) => {
        //     commonQuery().count().then(count => {
        //         if (count > 0) {
        //             let _vpage = _root.el.querySelector('.vpage');
        //             _root.el.querySelector('.count').innerHTML = `评论(<span class="num">${count}</span>)`;
        //         }
        //     }).catch(ex => {
        //         console.log(ex);
        //     })
        // }
        let query = (pageNo = 1) => {
            _root.loading.show();
            let cq = commonQuery();
            cq.limit('1000');
            cq.find().then(rets => {
                let len = rets.length;
                if (len) {
                    _root.el.querySelector('.vlist').innerHTML = '';
                    for (let i = 0; i < len; i++) {
                        insertDom(rets[i], !0)
                    }
                    // if (defaultPage['pagination']) initPages();
                    // else {
                    _root.el.querySelector('.count').innerHTML = `评论(<span class="num">${len}</span>)`;
                    // }
                }
                _root.loading.hide();
            }).catch(ex => {
                //err(ex)
                _root.loading.hide();
            })
        }
        query();

        let insertDom = (ret, mt) => {

            let _vcard = document.createElement('li');
            _vcard.setAttribute('class', 'vcard');
            _vcard.setAttribute('id', ret.id);
            let _img = `${v2cdn}${md5(ret.get('mail'))}?d=identicon&s=50`;
            _vcard.innerHTML = `<div class="vhead" ><img class="vimg" src='${_img}'><section ><h5><a rel="nofollow" href="${getLink({link:ret.get('link') ,mail:ret.get('mail')})}" target="_blank" >${ret.get("nick")}</a></h5><div class="vcontent">${ret.get("comment")}</div><div class="vfooter"><span class="vtime">${timeAgo(ret.get("createdAt"))}</span><span rid='${ret.id}' at='@${ret.get('nick')}' mail='${ret.get('mail')}' class="vat">回复</span><div></section></div>`;
            let _vlist = _root.el.querySelector('.vlist');
            let _vlis = _vlist.querySelectorAll('li');
            let _vat = _vcard.querySelector('.vat');
            let _as = _vcard.querySelectorAll('a');
            for (let k in _as) {
                if (_as.hasOwnProperty(k)) {
                    let item = _as[k];
                    if (item.getAttribute('class') != 'at') {
                        item.setAttribute('target', '_blank');
                        item.setAttribute('rel', 'nofollow');
                    }
                }
            }
            if (mt) _vlist.appendChild(_vcard);
            else _vlist.insertBefore(_vcard, _vlis[0]);
            let _vcontent = _vcard.querySelector('.vcontent');
            expandEvt(_vcontent);
            bindAtEvt(_vat);

        }

        let mapping = {
            veditor: "comment",
            vnick: "nick",
            vlink: "link",
            vmail: 'mail'
        };
        let inputs = {};
        for (let i in mapping) {
            if (mapping.hasOwnProperty(i)) {
                let _v = mapping[i];
                let _el = _root.el.querySelector(`.${i}`);
                inputs[_v] = _el;
                Event.on('input', _el, (e) => {
                    defaultComment[_v] = HtmlUtil.encode(_el.value.replace(/(^\s*)|(\s*$)/g, ""));
                });
            }
        }

        // cache 
        let getCache = () => {
            let s = store && store.getItem('ValineCache');
            if (!!s) {
                s = JSON.parse(s);
                let m = ['nick', 'link', 'mail'];
                for (let i in m) {
                    let k = m[i];
                    _root.el.querySelector(`.v${k}`).value = s[k];
                    defaultComment[k] = s[k];
                }
            }
        }
        getCache();



        let atData = {
            rmail: '',
            at: ''
        }

        // reset form
        let reset = () => {
            for (let i in mapping) {
                if (mapping.hasOwnProperty(i)) {
                    let _v = mapping[i];
                    let _el = _root.el.querySelector(`.${i}`);
                    _el.value = "";
                    defaultComment[_v] = "";
                }
            }
            atData['at'] = '';
            atData['rmail'] = '';
            defaultComment['rid'] = '';
            defaultComment['nick'] = 'Guest';
            getCache();
        }

        // submit
        let submitBtn = _root.el.querySelector('.vsubmit');
        let submitEvt = (e) => {
            if (submitBtn.getAttribute('disabled')) {
                _root.alert.show({
                    type: 0,
                    text: '再等等，评论正在提交中ヾ(๑╹◡╹)ﾉ"',
                    ctxt: '好的'
                })
                return;
            }
            if (defaultComment.comment == '') {
                inputs['comment'].focus();
                return;
            }
            if (defaultComment.nick == '') {
                defaultComment['nick'] = '小调皮';
            }

            defaultComment.comment = snarkdown(defaultComment.comment);
            let idx = defaultComment.comment.indexOf(atData.at);
            if (idx > -1 && atData.at != '') {
                let at = `<a class="at" href='#${defaultComment.rid}'>${atData.at}</a>`;
                defaultComment.comment = defaultComment.comment.replace(atData.at, at);
            }
            // veirfy
            let mailRet = check.mail(defaultComment.mail);
            let linkRet = check.link(defaultComment.link);
            if (!mailRet.k && !linkRet.k) {
                defaultComment['mail'] = '';
                defaultComment['link'] = '';
                _root.alert.show({
                    type: 1,
                    text: '您的网址和邮箱格式不正确, 是否继续提交?',
                    cb() {
                        if (_root.notify || _root.verify) {
                            verifyEvt(commitEvt)
                        } else {
                            commitEvt();
                        }
                    }
                })
            } else if (!mailRet.k) {
                defaultComment['mail'] = '';
                defaultComment['link'] = linkRet.v;
                _root.alert.show({
                    type: 1,
                    text: '您的邮箱格式不正确, 是否继续提交?',
                    cb() {
                        if (_root.notify || _root.verify) {
                            verifyEvt(commitEvt)
                        } else {
                            commitEvt();
                        }
                    }
                })
            } else if (!linkRet.k) {
                defaultComment['link'] = '';
                defaultComment['mail'] = mailRet.v;
                _root.alert.show({
                    type: 1,
                    text: '您的网址格式不正确, 是否继续提交?',
                    cb() {
                        if (_root.notify || _root.verify) {
                            verifyEvt(commitEvt)
                        } else {
                            commitEvt();
                        }
                    }
                })
            } else {
                defaultComment['mail'] = mailRet.v;
                defaultComment['link'] = linkRet.v;
                if (_root.notify || _root.verify) {
                    verifyEvt(commitEvt)
                } else {
                    commitEvt();
                }
            }
        }

        // setting access
        let getAcl = () => {
            let acl = new _root.v.ACL();
            acl.setPublicReadAccess(true);
            acl.setPublicWriteAccess(false);
            return acl;
        }

        let commitEvt = () => {
            submitBtn.setAttribute('disabled', true);
            _root.loading.show();
            // 声明类型
            let Ct = _root.v.Object.extend('Comment');
            // 新建对象
            let comment = new Ct();
            for (let i in defaultComment) {
                if (defaultComment.hasOwnProperty(i)) {
                    let _v = defaultComment[i];
                    comment.set(i, _v);
                }
            }
            comment.setACL(getAcl());
            comment.save().then((ret) => {
                defaultComment['nick'] != 'Guest' && store && store.setItem('ValineCache', JSON.stringify({
                    nick: defaultComment['nick'],
                    link: defaultComment['link'],
                    mail: defaultComment['mail']
                }));
                let _count = _root.el.querySelector('.num');
                let num = 1;
                try {

                    if (_count) {
                        num = Number(_count.innerText) + 1;
                        _count.innerText = num;
                    } else {
                        _root.el.querySelector('.count').innerHTML = '评论(<span class="num">1</span>)'
                    }
                    insertDom(ret);

                    defaultComment['mail'] && signUp({
                        username: defaultComment['nick'],
                        mail: defaultComment['mail']
                    });

                    atData['at'] && atData['rmail'] && _root.notify && mailEvt({
                        username: atData['at'].replace('@', ''),
                        mail: atData['rmail']
                    });
                    submitBtn.removeAttribute('disabled');
                    _root.loading.hide();
                    reset();
                } catch (error) {
                    console.log(error)
                }
            }).catch(ex => {
                _root.loading.hide();
            })
        }

        let verifyEvt = (fn) => {
            let x = Math.floor((Math.random() * 20) + 1);
            let y = Math.floor((Math.random() * 20) + 1);
            let z = Math.floor((Math.random() * 20) + 1);
            let opt = ['+', '-', 'x'];
            let o1 = opt[Math.floor(Math.random() * 3)];
            let o2 = opt[Math.floor(Math.random() * 3)];
            let expre = `${x}${o1}${y}${o2}${z}`;
            let subject = `${expre} = <input class='vcode vinput' >`;
            _root.alert.show({
                type: 1,
                text: subject,
                ctxt: '取消',
                otxt: '确认',
                cb() {
                    let code = +_root.el.querySelector('.vcode').value;
                    let ret = (new Function(`return ${expre.replace(/x/g, '*')}`))();
                    if (ret === code) {
                        fn && fn();
                    } else {
                        _root.alert.show({
                            type: 1,
                            text: '(T＿T)这么简单都算错，也是没谁了',
                            ctxt: '伤心了，不回了',
                            otxt: '再试试?',
                            cb() {
                                verifyEvt(fn);
                                return;
                            }
                        })
                    }
                }
            })
        }

        let signUp = (o) => {
            let u = new _root.v.User();
            u.setUsername(o.username);
            u.setPassword(o.mail);
            u.setEmail(o.mail);
            u.setACL(getAcl());
            return u.signUp();
        }

        let mailEvt = (o) => {
            _root.v.User.requestPasswordReset(o.mail).then(ret => {}).catch(e => {
                if (e.code == 1) {
                    _root.alert.show({
                        type: 0,
                        text: `ヾ(ｏ･ω･)ﾉ At太频繁啦，提醒功能暂时宕机。<br>${e.error}`,
                        ctxt: '好的'
                    })
                } else {
                    signUp(o).then(ret => {
                        mailEvt(o);
                    }).catch(x => {
                        //err(x)
                    })
                }
            })
        }

        // at event
        let bindAtEvt = (el) => {
            Event.on('click', el, (e) => {
                let at = el.getAttribute('at');
                let rid = el.getAttribute('rid');
                let rmail = el.getAttribute('mail');
                atData['at'] = at;
                atData['rmail'] = rmail;
                defaultComment['rid'] = rid;
                inputs['comment'].value = `${at} ，`;
                inputs['comment'].focus();
            })
        }

        Event.off('click', submitBtn, submitEvt);
        Event.on('click', submitBtn, submitEvt);


    }

}
// const loadAV = (cb) => {
//     let avjs = document.createElement('script');　　　
//     let _doc = document.querySelector('head');　
//     avjs.type = 'text/javascript';　　　　
//     avjs.async = 'async';　　　　
//     avjs.src = '//cdn1.lncld.net/static/js/3.0.4/av-min.js';　　　　
//     _doc.appendChild(avjs);　　　　
//     if (avjs.readyState) { //IE　　　　　　
//         avjs.onreadystatechange = function() {　　　　　　　　
//             if (avjs.readyState == 'complete' || avjs.readyState == 'loaded') {　　　　　　　　　　
//                 avjs.onreadystatechange = null;　　　　　　　　　　
//                 cb && cb();　　　　　　　　
//             }　　　　　　
//         }　　　　
//     } else { //非IE　　　　　　
//         avjs.onload = function() { cb && cb(); }　　　　
//     }
// }

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

const check = {
    mail(m) {
        return {
            k: /[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/.test(m),
            v: m
        };
    },
    link(l) {
        l = l.length > 0 && (/^(http|https)/.test(l) ? l : `http://${l}`);
        return {
            k: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(l),
            v: l
        };
    }
}

const HtmlUtil = {

    // /**
    //  * 
    //  * 将str中的链接转换成a标签形式
    //  * @param {String} str 
    //  * @returns 
    //  */
    // transUrl(str) {
    //     let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    //     return str.replace(reg, '<a target="_blank" href="$1$2">$1$2</a>');
    // },
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
    // var vHour = padWithZeros(date.getHours(), 2);
    // var vMinute = padWithZeros(date.getMinutes(), 2);
    // var vSecond = padWithZeros(date.getSeconds(), 2);
    return `${vYear}-${vMonth}-${vDay}`;
}

const timeAgo = (date) => {
    try {
        var oldTime = date.getTime();
        var currTime = new Date().getTime();
        var diffValue = currTime - oldTime;

        var days = Math.floor(diffValue / (24 * 3600 * 1000));
        if (days === 0) {
            //计算相差小时数
            var leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));
            if (hours === 0) {
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));
                if (minutes === 0) {
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3 / 1000);
                    return seconds + ' 秒前';
                }
                return minutes + ' 分钟前';
            }
            return hours + ' 小时前';
        }
        if (days < 0) return '刚刚';

        if (days < 8) {
            return days + ' 天前';
        } else {
            return dateFormat(date)
        }
    } catch (error) {
        console.log(error)
    }


}

const padWithZeros = (vNumber, width) => {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}

module.exports = Valine;