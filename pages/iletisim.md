---
layout: page
permalink: iletisim/
title: İletişim
show_meta: false
published: true
description: "İletişim"
comments: false
mathjax: false
noindex: false
sitemap:
    priority: 0.5
    changefreq: 'monthly'
    lastmod: 2016-02-13
tags:
  - "foo boo"
  - "driving directions"
  - address
---


| - | :- |
| <i class="fa fa-facebook"></i> | [{{ site.owner.facebook }}](https://facebook.com/{{ site.owner.facebook }})  | 
| - | :- |
| <i class="fa fa-twitter"></i> | [@{{ site.owner.twitter }}](https://twitter.com/{{ site.owner.twitter }})  | 
| - | :- |
| <i class="fa fa-envelope"></i> | sausiber[AT]gmail[DOT]com   | 
| - | :- |
| <i class="fa fa-paper-plane">  | https://t.me/sausiber | 
| - | :- |

<a href="https://twitter.com/share" class="twitter-share-button" data-via="{{ site.owner.twitter }}" data-size="small" data-dnt="true">Tweet</a> <a href="javascript:window.print()" class="social-icons" title="Printer friendly format"><i class="fa fa-print"></i></a>

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

{% if site.twitter_widget_id %}
<div class="text-tweets">
<div class="tweets">
  <a class="twitter-timeline" 
  href="https://twitter.com/SauSiber">Tweets by SauSiber</a> 
  <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
 </div>
<script>
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
</script>
</div>
{% else %}
Twitter stream will show up here if `twitter_widget_id` is present is `_config.yml`
{% endif %}
