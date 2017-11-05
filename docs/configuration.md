# 配置项

Valine 支持两种不同的初始化方式。一种是构造方法初始化对象，另一种是调用`init`方法：
```html
<!-- 方法 1 -->
<script>
    new Valine({
        el:'#comment',
        app_id:'your appid',
        app_key:'your appkey'
    })
</script>

<!-- 方法 2 -->
<script>
    var valine = new Valine();
    valine.init({
        el:'#comment',
        app_id:'your appid',
        app_key:'your appkey'
    })
</script>
```

## el
- 类型:`String`
- 默认值:`#comment`
- 必要性:`true`

Valine 的初始化挂载器。可以是一个`CSS 选择器`，也可以是一个实际的`HTML元素`。
```js
new Valine({
    el:'#comment'
})

// or 
new Valine({
    el:document.getElementById('comment')
})
```
!> 在使用时，请保证该元素的唯一性。

## app_id
- 类型:`String`
- 默认值:`null`
- 必要性:`true`

从`LeanCloud`的应用中得到的`appId`.
> 参考[获取appid和appkey](quickstart.md?id=%e8%8e%b7%e5%8f%96appid%e5%92%8cappkey)。

```js
new Valine({
    app_id:'your leancloud appid'
})
```

## app_key
- 类型:`String`
- 默认值:`null`
- 必要性:`true`

从`LeanCloud`的应用中得到的`appKey`.
> 参考[获取appid和appkey](quickstart.md?id=%e8%8e%b7%e5%8f%96appid%e5%92%8cappkey)。

```js
new Valine({
    app_key:'your leancloud appkey'
})
```

## placeholder
- 类型:`String`
- 默认值:`null`
- 必要性:`false`

评论框`占位提示符`。
```js
new Valine({
    placeholder:'Just so so'
})
```

## notify
- 类型:`Boolean`
- 默认值:`false`
- 必要性:`false`

评论回复邮件提醒，请参考[配置](https://github.com/xCss/Valine/wiki/Valine-%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E9%82%AE%E4%BB%B6%E6%8F%90%E9%86%92%E8%AE%BE%E7%BD%AE)。

!> 该功能目前处于测试阶段，请谨慎使用。

```js
new Valine({
    notify:false
})
```

## verify
- 类型:`Boolean`
- 默认值:`false`
- 必要性:`false`

验证码服务。

```js
new Valine({
    verify:false
})
```

## path
- 类型:`String`
- 默认值:`window.location.pathname`
- 必要性:`false`

当前`文章页`路径，用于区分不同的`文章页`，以保证正确读取该`文章页`下的评论列表。可选值：
- `window.location.pathname` (默认值，推荐)
- `window.location.href`
- `自定义` 

!> I. 请保证每个`文章页`路径的唯一性，否则可能会出现不同`文章页`下加载相同评论列表的情况。  
II. 如果值为`window.location.href`，可能会出现随便加`不同参数`进入该页面，而被判断成新页面的情况。

```js
new Valine({
    path:window.location.pathname
})
```
!> `v1.1.5+` 开始支持

## avatar
- 类型:`String`
- 默认值:`mm`
- 必要性:`false`

`Gravatar` 头像展示方式。可选值:
- `''`(空字符串)
- `mm`
- `identicon`
- `monsterid`
- `wavatar`
- `retro`
- `hide` (`v1.1.8-beta+` 开始支持)

更多信息，请查看[头像配置](avatar.md)。

```js
new Valine({
    avatar:`mm`
})
```
!> `v1.1.7+` 开始支持

## guest_info
- 类型:`Array`
- 默认值:`['nick','mail','link']`
- 必要性:`false`

评论者相关属性。

```js
new Valine({
    guest_info:['nick'] // 只想要昵称
})
```
!> `v1.1.8-beta+`开始支持

## pageSize
- 类型:`Number`
- 默认值:`10`
- 必要性:`false`

评论列表分页，每页条数。

```js
new Valine({
    pageSize:10
})
```
!> `v1.1.8-beta2+`开始支持