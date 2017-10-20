# Configuration

**valine** Supports two different initialization methods:
```html
<!-- Write the argument in the constructor -->
<script>
    new Valine({
        av:av,
        el:'#comment',
        app_id:'your appid',
        app_key:'your appkey'
    })
</script>

<!-- or Call the init method -->
<script>
    var valine = new Valine();
    valine.init({
        av:av,
        el:'#comment',
        app_id:'your appid',
        app_key:'your appkey'
    })
</script>
```

## el
- Type:`String`
- Default:`#comment`

The DOM element to be mounted on initialization. It can be a CSS selector string or an actual HTMLElement.
```js
new Valine({
    el:'#comment'
})
```
!> Please ensure that the element is unique.

## app_id
- Type:`String`
- Default:`null`

Application `appId` from `Leancloud`.
```js
new Valine({
    app_id:'your leancloud appid'
})
```

## app_key
- Type:`String`
- Default:`null`

Application `appKey` from `Leancloud`.
```js
new Valine({
    app_key:'your leancloud appkey'
})
```

## placeholder
- Type:`String`
- Default:`null`

Comment box placeholders.
```js
new Valine({
    placeholder:'Just so so'
})
```

## notify
- Type:`Boolean`
- Default:`false`

Mail notifier, Please refer to the [configuration](https://github.com/xCss/Valine/wiki/Valine-%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E9%82%AE%E4%BB%B6%E6%8F%90%E9%86%92%E8%AE%BE%E7%BD%AE).
```js
new Valine({
    notify:false
})
```

## verify
- Type:`Boolean`
- Default:`false`

Validation code.
```js
new Valine({
    verify:false
})
```

## path
- Type:`String`
- Default:`window.location.path`

Article path(just like duoshuo `thread`), Optional value:
- `window.location.path` (recommend)
- `window.location.href`
- customize (Please ensure uniqueness)

```js
new Valine({
    path:window.location.path
})
```
!> `v1.1.5+` is support

## avatar
- Type:`String`
- Default:`mm`

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
!> `v1.1.7+` is support