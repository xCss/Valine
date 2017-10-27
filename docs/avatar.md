# 头像设置
Valine 使用的是[Gravatar](http://cn.gravatar.com/) 作为评论列表头像(感谢`gravatar.cat.net`提供的镜像服务)。  
目前有以下7种可选值:  

参数值|表现形式|备注
:-:|:-:|-
空字符串`''`|![Gravatar官方图形](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40)|Gravatar官方图形
`mm`|![神秘人(一个灰白头像)](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40&d=mm)|神秘人(一个灰白头像)
`identicon`|![抽象几何图形](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40&d=identicon)|抽象几何图形(根据邮箱或昵称生成)
`monsterid`|![小怪物](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40&d=monsterid)|小怪物
`wavatar`|![用不同面孔和背景组合生成的头像](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40&d=wavatar)|用不同面孔和背景组合生成的头像(根据邮箱或昵称生成)
`retro`|![八位像素复古头像](https://gravatar.cat.net/avatar/adb831a7fdd83dd1e2a309ce7591dff8?s=40&d=retro)|八位像素复古头像(根据邮箱或昵称生成)
`hide`|&nbsp;|不显示头像

!> 参数值`hide`在版本`v1.1.8-beta`开始支持。

!> 如果参数`avatar`的值不等于列表中的任意一种，则默认为`mm`。

```js
new Valine({
    ...
    avatar:'' // (''/mm/identicon/monsterid/wavatar/retro/hide)
});
```