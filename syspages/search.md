---
layout: default_minimal
title: "Search"
description: "Search"
permalink: /search/
sitemap: false
noindex: true
nofollow: true
category: base
---

{% if site.google_search %}
<div id="searchbox2" style="margin:0 auto; display: table;">
<div class="searchcont2">
    <!-- span class="searchicon2"><i class="fa fa-search fa-2x"></i></span -->
    <form role="search" method="get" action="{{ site.url }}/cse/">
        <input id="searchString2" name="searchString2"
               placeholder=" Search" type="text">
    </form>
<script>
  (function() {
    var cx = '008169732783005011647:v7gs_nkd1ve';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>

</div>
</div>
{% else %}
Google Custom Search key is not set in `_config.yml`
{% endif %}
