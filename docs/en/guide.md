# Quick start

## HTML structure

Please include the following HTML code in the appropriate location on the article page that requires the comment box:

```html
<head>
    ...
    <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
    <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
    ...
</head>
<body>
    ...
    <div id="comment"></div>
</body>
```

## Get appID/appKey from leancloud
[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in `leancloud`.  
[Click here](https://leancloud.cn/dashboard/applist.html#/newapp) Create new application in `Leancloud`, and you will get `appId`/`appKey`.

## Options
```js
new Valine({
    el: '#comment' ,
    notify:false, 
    verify:false, 
    appKd: 'your leancloud appid',
    appKey: 'your leancloud appkey',
    placeholder: 'Just go go',
    path:window.location.pathname,
    avatar:'mm' 
});
```

See the [Configuration](configuration.md) for more details.

## Install from npm
```bash
npm install valine --save
```
