---
layout: post
title: Kablosuz Ağlarda Authentication / Association-Flood Saldırısı
comments: true
---

Bir istemci Access Point'e bağlanmak istediği zaman birkaç paket alışverişini yerine getirir.
Bu saldırıda saldırgan çok sayıda ve farklı mac adresleri üzerinden hedef AP e authentication paketleri gönderir.AP, paket alışverişini tamamlayabilmek için aldığı paketleri bir süre saklamak durumundadır.Eğer AP in saklayamayacağı veya yanıtlayamayacağı kadar paket gönderilirse AP e bağlı olan istemciler internet erişimi sağlayamayacak, ağa bağlanmak isteyen yeni istemciler de bağlanamayacaktır.

<center><img class="size-full wp-image-160 aligncenter" src="https://ogunal.com/wp-content/uploads/2017/10/auth.png" alt="" width="471" height="583" /></center>

&nbsp;

Öncelikle hedef ağın mac adresini öğrenmek için ağ kartı monitor moda alınır.
<pre lang="bash">ifconfig wlan1 down
iwconfig wlan1 mode monitor
ifconfig wlan1 up
</pre>
Ardından airodump-ng aracı ile ortamdaki paketler dinlenir ve hedefin mac adresi bulunur.
<pre lang="bash">airodump-ng wlan1
</pre>
<center><img class="size-full wp-image-163 aligncenter" src="http://sausiber.org/images/wifi-auth/11" alt="" width="873" height="460" /></center>

Hedef AP'in mac adresini öğrendildikten sonra farklı mac adresleri ile sürekli olarak authentication istekleri gönderilerek saldırı başlatılır.
<pre lang="bash">mdk3 wlan1 a -a 26:E3:14:4B:65:26 -m
</pre>
mdk3 aracı kendi içerisinde çok sayıda gerçek mac adresi barındırmaktadır.Her istekte farklı bir mac adresi kullanılmaktadır.
<center><img class="size-full wp-image-166 aligncenter" src="http://sausiber.org/images/wifi-auth/mdk3.png" alt="" width="576" height="458" /></center>

Saldırının sonucunda ağ içerisinde bulunan istemci içerideki yoğunluktan ötürü internete çıkamamaktadır.
<center><img class="size-full wp-image-167 aligncenter" src="http://sausiber.org/images/wifi-auth/cl.png" alt="" width="263" height="426" /></center>

Wireshark ile authentication paketleri filtrelendiğinde 1 dakika 47 saniye içerisinde 20.000 den fazla authentication isteği gönderildiği görülür.
<center><img class="size-large wp-image-169 aligncenter" src="http://sausiber.org/images/wifi-auth/wire.png" alt="" width="1024" height="505" /></center>

&nbsp;

Ayrıca gönderilen paketlere bakıldığında her birinin farklı bir mac adresinden gönderildiği görülür.

<center><img class="alignnone size-large wp-image-171" src="http://sausiber.org/images/wifi-auth/wire2.png" alt="" width="1024" height="314" /></center>

&nbsp;

<strong>Saldırının Etkisi:</strong>
<ul>
 	<li><span style="font-weight: 400;">Gelen paketlerin fazlalığı cihazın işlem gücünün büyük kısmını bu paketleri yanıtlamaya ayırmasına neden olur.Böylece ağdaki istemciler internete erişmekte sorun yaşar.</span><span style="font-weight: 400;"> </span></li>
 	<li><span style="font-weight: 400;">Ağa bağlanmak isteyen yeni istemci başarısız olur.</span></li>
</ul>
<b>Saldırıya Karşı Yapılabilecekler:</b>
<ul>
 	<li><span style="font-weight: 400;"> AP in yerini değiştirmek.(AP saldırgandan fiziksel olarak uzak tutulursa paketlerin ulaşma oranı düşebilir.)</span></li>
</ul>
<b>Saldırıyı Başarısız Kılabilen Durumlar:</b>
<ul>
 	<li><span style="font-weight: 400;"> Sahte MAC adresleri.Bazı cihazlar istekte bulunan mac adreslerinin gerçek olup olmadığını kontrol edebiliyor.Bu durumda spoof edilen mac adreslerinin gerçek dünyada kullanılan mac adresleri olması gerekir.</span></li>
 	<li><span style="font-weight: 400;"> Ağ kartının sürekli kanal değiştirmesi.Saldırı yapılırken kanal numarası hedef ap ile aynı olmalıdır.</span></li>
 	<li><span style="font-weight: 400;"> Hedef AP ile aradaki fiziksel uzaklığın fazla olması.</span></li>
</ul>

<b>Yazar</b> <br>
Ömer GÜNAL
