# 快速开始

## HTML 片段

请在需要评论框的`文章页`内相应位置引入下面的HTML代码：

```html
<head>
    ...
    <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
    <script src='//unpkg.com/valine@1.1.7/dist/Valine.min.js'></script>
    ...
</head>
<body>
    ...
    <div id="comment"></div>
</body>
```

## 获取appid和appkey

请先[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)：

![](https://ws1.sinaimg.cn/large/006qRazegy1fkwo2fpoetj30h40coaak.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`appid`和`appkey`了：

![](https://ws1.sinaimg.cn/large/006qRazegy1fkwo6w2b6uj30xe0etjt4.jpg)

!> 为了您的数据安全，请注意设置自己的`安全域名`：

![设置安全域名](https://ws1.sinaimg.cn/large/006qRazegy1fkxqmddfh1j30qd0go40h.jpg)

## 配置

修改初始化对象中的`app_id`和`app_key`的值为上面刚刚获取到的值即可(其他可以默认)。

```js
new Valine({
    el: '#comment' ,
    notify:false, 
    verify:false, 
    app_id: '这里填上面获得的appid',
    app_key: '这里填上面获得的appkey',
    placeholder: 'just go go',
    path:window.location.pathname, 
    avatar:'mm' 
});
```
更多信息请查看[配置项](configuration.md)。

## npm安装

Valine 现已发布到[npm](https://www.npmjs.com/package/valine)，可以直接用命令安装：

```bash
npm install valine --save
```