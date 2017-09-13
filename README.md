![](./src/assets/logo.opacity.png)
# Valine [![version](https://img.shields.io/github/release/xCss/Valine.svg?style=flat-square)](https://github.com/xCss/Valine/releases) [![npm downloads](https://img.shields.io/npm/dt/valine.svg?style=flat-square)](https://www.npmjs.com/package/valine) [![build](https://img.shields.io/circleci/project/github/xCss/Valine/master.svg?style=flat-square)](https://circleci.com/gh/xCss/Valine) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat-square)](#donate)  
> A simple comment system based on Leancloud.  
------------------------------
**[Live Demo](https://valine.js.org)**

**[中文教程](https://ioliu.cn/2017/add-valine-comments-to-your-blog/)**

- High speed.
- Safe by default.
- Easy to customize.
- Support [mail notifier](https://github.com/xCss/Valine/wiki/Valine-%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E9%82%AE%E4%BB%B6%E6%8F%90%E9%86%92%E8%AE%BE%E7%BD%AE).
- Support validation code.
- No server-side implementation.
- Support part of the markdown syntax.

**Table of content**
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Contributors](#contributors)
- [Features](#features)
- [Donate](#donate)
- [License](#license)

## Installation
**1. Installation**   
> :warning: **You must first reference the package `av-min.js` in the web page**  

```html
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src="./dist/Valine.min.js"></script>
```
or
```html
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src="//cdn.jsdelivr.net/npm/valine@1.1.6/dist/Valine.min.js"></script>
```
or
```html
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src='//unpkg.com/valine@1.1.6/dist/Valine.min.js'></script>
```
or via [npm](https://www.npmjs.com/package/valine)

**2. Get `appId`/`appKey` from Leancloud**  
[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in `leancloud`.  
[Click here](https://leancloud.cn/dashboard/applist.html#/newapp) Create new application in `Leancloud`, and you will get `appId`/`appKey`.

## Usage
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Valine - A simple comment system based on Leancloud.</title>
    <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
    <script src="./dist/Valine.min.js"></script>
</head>
<body>
    <div class="comment"></div>
    <script>
        new Valine({
            av: AV, // source from av-min.js
            el: '.comment' ,
            notify:false, // 邮件提醒 v1.1.4新增
            verify:false, // 验证码 v1.1.4新增
            app_id: 'your appid',
            app_key: 'your appkey',
            placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!',
            path:window.location.pathname // 路径配置 v1.1.5新增，可填window.location.href
        });
    </script>
</body>
</html>
```

## Options
|      name     |   require   |   base version  |     note    |  
| ------------- | ----------- | --------------- | ----------- |  
|      `av`     |     true    | 1.0.0+          | Leancloud Operation library |  
|      `el`     |     true    | 1.0.0+          | Base element (`unique`) |  
|   `app_id`    |     true    | 1.0.0+          | Your leancloud `appid`  |
|   `app_key`   |     true    | 1.0.0+          | Your leancloud `appkey` |
| `placeholder` |    false    | 1.0.7+          | Comment box placeholder |
|   `notify`    |    false    | 1.1.4+          | [Mail notifier](https://github.com/xCss/Valine/wiki/Valine-%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E9%82%AE%E4%BB%B6%E6%8F%90%E9%86%92%E8%AE%BE%E7%BD%AE) |
|   `verify`    |    false    | 1.1.4+          | Validation code |
|    `path`     |    false    | 1.1.5+          | Article path(just like duoshuo `thread`) |



## Contributors
- [Contributors](https://github.com/xCss/Valine/graphs/contributors)

## Features
- Support for full markdown syntax
- Syntax highlighting
- And more...

## Donate
If you are enjoying this app, please consider making a donation to keep it alive, I will try my best to dedicate more time or even full time to work on it. 😉

| 支付宝 | 微信 | 
| :------: | :------: | 
| <img width="150" src="./src/assets/alipay.png"> | <img width="135" src="./src/assets/wechat.png"> | 

If you are not available for this, simply spreading the word for us would help too!

## License
[GPL-2.0](https://github.com/xCss/Valine/blob/master/LICENSE)
