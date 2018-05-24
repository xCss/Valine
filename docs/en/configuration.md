# Configuration

**valine** Supports two different initialization methods:
```html
<!-- Write the argument in the constructor -->
<script>
    new Valine({
        el:'#comment',
        appId:'your appid',
        appKey:'your appkey'
    })
</script>

<!-- or Call the init method -->
<script>
    var valine = new Valine();
    valine.init({
        el:'#comment',
        appId:'your appid',
        appKey:'your appkey'
    })
</script>
```

## el
- Type:`String`
- Default:`#comment`
- Required:`true`

The DOM element to be mounted on initialization. It can be a CSS selector string or an actual HTMLElement.
```js
new Valine({
    el:'#comment'
})
```
!> Please ensure that the element is unique.

## appId
- Type:`String`
- Default:`null`
- Required:`true`

Application `appId` from `Leancloud`.
```js
new Valine({
    appId:'your leancloud appid'
})
```

## appKey
- Type:`String`
- Default:`null`
- Required:`true`

Application `appKey` from `Leancloud`.
```js
new Valine({
    appKey:'your leancloud appkey'
})
```

## region
- Type:`String`
- Default:`cn`
- Required:`false`

Storage node，Optional value：
- `cn` - Chinese mainland node
- `us` - Overseas node

```js
new Valine({
    region:'cn'
})
```

!> `v1.1.9-beta4` is supported



## placeholder
- Type:`String`
- Default:`null`
- Required:`false`

Comment box placeholders.
```js
new Valine({
    placeholder:'Just so so'
})
```

## notify
- Type:`Boolean`
- Default:`false`
- Required:`false`

Mail notifier, Please refer to the [configuration](https://github.com/xCss/Valine/wiki/Valine-%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E9%82%AE%E4%BB%B6%E6%8F%90%E9%86%92%E8%AE%BE%E7%BD%AE).
```js
new Valine({
    notify:false
})
```

## verify
- Type:`Boolean`
- Default:`false`
- Required:`false`

Validation code.
```js
new Valine({
    verify:false
})
```

## path
- Type:`String`
- Default:`window.location.pathname`
- Required:`false`

Article path(just like duoshuo `thread`), Optional value:
- `window.location.pathname` (recommend)
- `window.location.href`
- customize (Please ensure uniqueness)

```js
new Valine({
    path:window.location.pathname
})
```
!> `v1.1.5+` is supported

## avatar
- Type:`String`
- Default:`mm`
- Required:`false`

`Gravatar` type, Optional value:
- `mm`
- `identicon`
- `monsterid`
- `wavatar`
- `retro`
- `''`(Empty string)

```js
new Valine({
    avatar:`mm`
})
```
!> `v1.1.7+` is supported


## guest_info
- Type:`Array`
- Default:`['nick','mail','link']`
- Required:`false`

Reviewer attributes.

```js
new Valine({
    guest_info:['nick'] // Just want nickname
})
```
!> `v1.1.8-beta+` is supported


## pageSize
- Type:`Number`
- Default:`10`
- Required:`false`

Number of pages per page.

```js
new Valine({
    pageSize:10
})
```
!> `v1.1.8-beta2+` is supported