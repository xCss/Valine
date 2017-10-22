# Quick start

## Install
```bash
npm install valine --save
```

## CDN
- `<script src='//unpkg.com/valine@1.1.7/dist/Valine.min.js'></script>`
- `<script src="//cdn.jsdelivr.net/npm/valine@1.1.7/dist/Valine.min.js"></script>`
- `<script src="//cdn.jsdelivr.net/gh/xcss/valine@v1.1.7/dist/Valine.min.js"></script>`
- `<script src="//cdn.jsdelivr.net/gh/xcss/Valine/dist/Valine.min.js"></script>`

--------------------------------

## Usage

### HTML structure

```html
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src='//unpkg.com/valine@1.1.7/dist/Valine.min.js'></script>
<div id="comment"></div>
```
### Options
```js
new Valine({
    el: '#comment' ,
    notify:false, // 邮件提醒 v1.1.4新增
    verify:false, // 验证码 v1.1.4新增
    app_id: 'your leancloud appid',
    app_key: 'your leancloud appkey',
    placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!',
    path:window.location.pathname, // 路径配置 v1.1.5新增，可填window.location.href
    avatar:'mm' // v1.1.7 新增(mm/identicon/monsterid/wavatar/retro/'') https://github.com/xCss/Valine/wiki/avatar-setting-for-valine
});
```
## Get appID/appKey from leancloud
[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in `leancloud`.  
[Click here](https://leancloud.cn/dashboard/applist.html#/newapp) Create new application in `Leancloud`, and you will get `appId`/`appKey`.

!>  **You must first reference the package `av-min.js` in the web page**
```html
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
```

