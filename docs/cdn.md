# CDN

推荐使用 [unpkg](https://unpkg.com/) —— 能及时获取到最新版。

## 获取最新版本

根据 UNPKG 的规则，不指定特定版本号时将引入最新版。

```html
<script src="//unpkg.com/valine/dist/Valine.min.js"></script>
```

## 获取指定版本

如果担心频繁地版本更新又可能引入未知 Bug，我们也可以使用具体的版本。规则是 `//unpkg.com/valine@VERSION/dist/Valine.min.js`

```html
<script src="//unpkg.com/valine@1.1.7/dist/Valine.min.js"></script>
```

!> 指定 *VERSION* 为 `latest` 可以强制每次都请求最新版本。

## 其他 CDN

- https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js (国内外都支持)