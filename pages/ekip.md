---
layout: page
title: Biz
permalink: ekip/
show_meta: true
# imagefeature path is relative to images/ directory.

published: true
description: "SaüSiber Takım"
category: views
comments: false
mathjax: false
noindex: false
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2017-05-26
# tags will be used as html meta keywords.    

---
<!-- Team Section -->
<section id="team" class="bg-light-gray">
    <div class="container">
        <div class="row">
            {% for member in site.people %}
            <div class="col-sm-4">
                <div class="team-member"><br>
                    <center><img src="http://sausiber.org/images/team/{{ member.pic }}.jpg" class="img-responsive img-circle" alt="">
                    <p class="text-muted"><h4>{{ member.name }}</h4>  {{member.position}}  --  
                        {% for network in member.social %}
                            <a href="{{ network.url }}">
                                <i class="fa fa-{{ network.title }}"></i>
                            </a>
                        {% endfor %}
                    </p>
                    </center> 
                </div>
            </div>
            {% endfor %}
        </div>
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 text-center">
                <p class="large text-muted"></p>
            </div>
        </div>
    </div>
</section>