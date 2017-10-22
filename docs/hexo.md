# Use valine in hexo

In fact, most hexo themes have built-in valine review systems.

## hexo-theme-next

You just need to modify the [_config.yml](https://github.com/iissnan/hexo-theme-next/blob/master/_config.yml#369) file in the theme directory.
```yml
# Valine.
# You can get your appid and appkey from https://leancloud.cn
# more info please open https://github.com/xCss/Valine
valine:
  enable: true 
  appid:  # your leancloud application appid
  appkey:  # your leancloud application appkey
  notify: false # mail notifier , https://github.com/xCss/Valine/wiki
  verify: false # Verification code
  placeholder: Comment input placeholder
```
!> If you want to use other versions of valine, please modify the file [valine.swig](https://github.com/iissnan/hexo-theme-next/blob/master/layout/_third-party/comments/valine.swig).  
Path:`next/layout/_third-party/comments/valine.swig`

## hexo-theme-material
You just need to modify the [_config.yml](https://github.com/viosey/hexo-theme-material/blob/canary/_config.template.yml#L222) file in the theme directory.
```yml
# Comment Systems
# Available value of "use":
#     disqus | disqus_click | changyan | livere | gitment | gitalk | valine
# If you want to use gitment or gitalk,you should get the client_id and client_secret form https://github.com/settings/applications/new
# If you want to use valine,you should get the app_id and app_key form https://leancloud.cn ,more setting please see https://github.com/xCss/Valine
comment:
    use: valine
    ...
    valine_leancloud_appId: # leancloud application app id
    valine_leancloud_appKey: # leancloud application app key
    valine_notify: false # valine mail notify (true/false) https://github.com/xCss/Valine/wiki
    valine_verify: false # valine verify code (true/false)
    valine_placeholder: # valine comment input placeholder(like: Please leave your footprints )
    ...
```
!> If you want to use other versions of valine, please modify the file [common.ejs](https://github.com/viosey/hexo-theme-material/blob/canary/layout/_widget/comment/valine/common.ejs).
Path:`material/layout/_widget/comment/valine/common.ejs`

## hexo-theme-hueman

You just need to modify the [_config.yml](https://github.com/ppoffice/hexo-theme-hueman/blob/master/_config.yml.example#L42) file in the theme directory.
```yml
# Comment
comment:
    ...
    valine: # Valine Comment System https://github.com/xCss/Valine
        on: true # enter true to enable valine
        appId: # enter the leancloud application appId here
        appKey: # enter the leancloud application appKey here
        notify: # enter true to enable <Mail notifier> 
        verify: # enter true to enable <Validation code>
        placeholder: Just go go # enter the comment box placeholder
```
!> If you want to use other versions of valine, please modify the file [valine.ejs](https://github.com/ppoffice/hexo-theme-hueman/blob/master/layout/comment/valine.ejs).
Path:`hueman/blob/master/layout/comment/valine.ejs`

## maupassant-hexo
You just need to modify the [_config.yml](https://github.com/tufu9441/maupassant-hexo/pull/331/files) file in the theme directory.
```yml
...
valine:
  enable: false ## if you want to use Valine comment system, please set the value to true
  appid: ## your leancloud application appid
  appkey: ## your leancloud application appkey
  notify:  ## mail notifier , https://github.com/xCss/Valine/wiki
  verify:  ## Verification code
  placeholder: Just go go ## enter the comment box placeholder
  avatar: 'mm' ## header image style(v1.1.7+) https://github.com/xCss/Valine/wiki
...
```
!> If you want to use other versions of valine, please modify the file [comments.jade](https://github.com/tufu9441/maupassant-hexo/blob/master/layout/_partial/comments.jade).
Path:`maupassant/layout/_partial/comments.jade`

