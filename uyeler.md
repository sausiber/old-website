---
layout: page
title: Üyeler
permalink: /uyeler/
---

<!-- Team Section-->
<section id="team" class="bg-light-gray">
    <div class="container-fluid">
        <div class="row">
            {% for member in site.people %}
            <div class="col-lg-4">
                <div class="team-member"><br>
                    <center><img src="http://sausiber.github.io/assets/uyeler/{{ member.pic }}.jpg" class="img-responsive img-circle" alt="">
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