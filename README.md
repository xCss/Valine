![](./src/images/logo.opacity.png)
# Valine [![version](https://img.shields.io/github/release/xCss/Valine.svg?style=flat-square)](https://github.com/xCss/Valine/releases) [![npm downloads](https://img.shields.io/npm/dt/valine.svg?style=flat-square)](https://www.npmjs.com/package/valine) [![build](https://img.shields.io/circleci/project/github/xCss/Valine/master.svg?style=flat-square)](https://circleci.com/gh/xCss/Valine) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat-square)](#donate)
> A simple comment system based on Leancloud.  
------------------------------
**[Live Demo](https://xcss.github.io/Valine/)**

[中文教程](https://ioliu.cn/2017/add-valine-comments-to-your-blog/)

- High speed.
- Safe by default.
- Easy to customize.
- No server-side implementation.
- Support part of the markdown syntax.

**Table of content**
- [Installation](#installation)
- [Useage](#useage)
- [Contributors](#contributors)
- [Features](#features)
- [Donate](#donate)
- [License](#license)

## Installation
**1. Installation**   
> :warning: **You must first reference the package AV in the web page**  
> `<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>`
```html
<script src="./dist/Valine.min.js"></script>
```
or
```html
<script src="https://xcss.github.io/Valine/dist/Valine.min.js"></script>
```
or via `npm`
```bash
npm install valine --save
```
```js
import Valine from 'valine'
```
**2. Get `appId`/`appKey` from Leancloud**  
[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in `leancloud`.  
[Click here](https://leancloud.cn/dashboard/applist.html#/newapp) Create new application in `Leancloud`, and you will get `appId`/`appKey`.

## Useage
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
            app_id: 'your appid',
            app_key: 'your appkey',
            // [v1.0.7 new]留言框占位提示文字
            placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!'
        });
    </script>
</body>
</html>
```
## Contributors
- [Contributors](https://github.com/xCss/Valine/graphs/contributors)

## Features
- Support for full markdown syntax
- Syntax highlighting
- And more...

## Donate
If you are enjoying this app, please consider making a donation to keep it alive, I will try my best to dedicate more time or even full time to work on it. 😉

- [Donate via Wechat](https://ws1.sinaimg.cn/large/006qRazegy1fibhig0ywqj30es0erabm.jpg)
- [Donate via Alipay](https://ws1.sinaimg.cn/large/006qRazegy1fibhifhhfnj30ix0io0tt.jpg)

If you are not available for this, simply spreading the word for us would help too!

## License
[GPL-2.0](https://github.com/xCss/Valine/blob/master/LICENSE)