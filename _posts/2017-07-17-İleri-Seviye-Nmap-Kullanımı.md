Bu yazımda <strong>Penetration Test</strong> lerde(<em>Sızma testleri</em>) sıklıkla kullanılan "<strong><em>Nmap</em></strong>" adlı araçtan bahsetmek istiyorum. Ne işe yaradığından bahsedelim ilk önce.<!--more-->

<em>Nmap</em>, ağdaki <strong>cihazlara</strong> ve <strong>cihazların portlarına</strong> çeşitli paketler gönderip ve cevaplara bakarak cihazın açık olup olmadığını, açık olan portlar üzerinde hangi <em>servislerin</em> çalıştığını, cihazların hangi <em>işletim sistemini</em> kullandığını öğrenmemize olanak sağlayan <em>open-source</em> bir araçtır. Bu saydığım özelliklerin yanı sıra Nmap'in çok kullanışlı farklı özellikleri de bulunuyor. <strong>Firewall detection</strong>, <strong>Vullnerability Scanning</strong> (<em>Zafiyet taraması</em>), <strong>Exploitation</strong> (<em>Zafiyetleri istismar etme</em>) ve <strong>NSE Scriptleri</strong> sayesinde (Yazı sonunda değineceğim) daha bir çok özelliği içerisinde bulunduruyor.

Eğer kaynak kodlarına bakmak isterseniz <a href="https://github.com/nmap/nmap">buradan</a> ulaşabilirsiniz.
<h3>Kurulum</h3>
<em>Rethat, Debian ve Arch</em> based<em> linux dağıtımlarının</em> paket depolarında nmap bulunuyor. Dağıtımın kendi package manager ından yükleyebilirsiniz.
<blockquote>
<h4><strong>Yum:</strong></h4>
<em><span class="command">#yum install nmap</span></em>
<h4>Apt-get:</h4>
#apt-get install nmap
<h4>Pacman:</h4>
#pacman -S nmap</blockquote>
Eğer paket yöneticinizle ilgili bir sorun varsa yada kendiniz kurmak isterseniz <a href="https://nmap.org/download.html">Nmap'in download</a> sayfasından rpm halini indirip kendinizde kurabilirsiniz. Eğer <em>Windows</em> işletim sistemini kullanıyorsanız <a href="https://nmap.org/download.html">Nmap'in dowload </a>sayfasından yükleme talimatlarına bakabilirsiniz.
<h2>Hedef Belirtme (Target Specification)</h2>
Nmap'i en basit olarak kullanmak için bir hedef belirtmememiz gerekiyor. Hedef olarak bir web adresi, IP adresi verebileceğinizin yanı sıra bir ağ da verebiliriz. Nmap'in kendi sayfasında yazana göre aslında büyük ağları taramak için tasarlanmış fakat tekli hedeflerde de son derece iyi bir sonuç veriyor. Çok uzatmadan bir hedefi nasıl belirteceğimize geçelim.
<blockquote>#nmap google.com

#nmap 192.168.1.1

#nmap 192.168.1.0/24</blockquote>
Hedef belirtmek için argüman olarak vermemiz yeterli. Eğer Nmap' e sadece hedef verirseniz ve herhangi bir opsiyon belirtmezseniz <strong>Nmap default olarak en çok kullanılan 1000 porta SYN taraması yapar</strong>.

<img class="size-full wp-image-266" src="http://sausiber.org/images/nmap/nmap-scan-1.png" alt="" width="577" height="339" />

Gördüğünüz gibi<em> Nmap</em>' e sadece hedef verdiğimizde <em>en çok kullanılan</em> ilk <em>1000 porta SYN taraması</em> yaptı ve bize açık olan portları ve portlarda çalışan servisleri getirdi. Böyle teker teker bütün network ü taramak zahmetli bir iş. Bunun içinde Nmap le <em>192.168.1.0/24</em> subnet ini tek seferde "<strong>nmap 192.168.1.0/24</strong>" şeklinde tarayabiliyoruz.

<img class="aligncenter wp-image-267" src="http://sausiber.org/images/nmap/nmap-scan-2.png" alt="" width="310" height="18" />

Bütün subnet i tarattığımızda nmap bize açık olan makineleri ve açık olan makinelerdeki açık portları bize listeliyor.

Farzedinki elinizde açık olan hostların IP adreslerinin yazılı olduğu bir txt var. Nmap bunu da düşünmüş ve<strong> -iL</strong> parametresi ile elinizde bulunan hostların yazılı olduğu dosyayı hedef olarak nmap' e verebiliyorsunuz.

<img class="aligncenter size-full wp-image-268" src="http://sausiber.org/images/nmap/nmap-scan-3.png" alt="" width="368" height="21" />

Peki ya bütün ağı tararken taramasını istemediğiniz bir host varsa? Nmap te çareler tükenmez. "<strong>--exclude</strong>" ve "<strong>--excludefile</strong>" parametreleri ile nmap e taramasını istemediğiniz hedefleri belirtebilirsiniz.

<img class="size-full wp-image-269" src="http://sausiber.org/images/nmap/nmap-scan-4.png" alt="" width="602" height="19" />

Belirli aralıklardaki IP adreslerinide tarayabilirsiniz.

<img class="aligncenter size-full wp-image-270" src="http://sausiber.org/images/nmap/nmap-scan-5.png" alt="" width="372" height="25" />

Yani bu komut sadece<strong> 192.168.1.39</strong> ve <strong>192.168.1.40</strong> IP adreslerini tarayacaktır.
<h2>Hedef Keşfi (Host Discovery)</h2>
Nmap ile ağda bulunan hostları bulabiliyoruz ve Nmap bunu bize birden fazla seçenek ile yapabilme olanağı sunuyor. Birden fazla seçenek sunmasındaki neden bazı işletim sistemleri bazı tekniklere cevap vermemesidir. Örneğin <strong>güncel Windows işletim sistemleri ping taramasına cevap vermemektedir</strong>, bu yüzden hostun up olup olmadığını bulmak için farklı bir tarama yapmamız gerekiyor.

<img class="size-full wp-image-272" src="http://sausiber.org/images/nmap/nmap-host-discovery.png" alt="" width="826" height="233" /> 

Nmap bize <strong>ICMP echo request</strong> ile host keşfi yapabilme seçeneği sunarken aynı zamanda <strong>SYN/ACK/UDP</strong> paketlerini belli <em>portlara</em> göndererekte host keşfi yapabilmemizi sağlıyor.

Hiç bir parametre belirtmezsek (yani sadece hedef belirtirsek) nmap host keşfi için <strong>ICMP echo request, 443 portuna TCP SYN paketi, 80 portuna TCP ACK paketi ve ICMP timestamp request</strong> yaparak host keşfi yapıyor.
<ul>
 	<li><strong>-sL</strong>: Herhangi bir paket göndermeden bütün IP adreslerini listeler. Açık olan olmayan bütün adresleri. Daha önce hiç işime yaramadı, belki sizin yarar.</li>
 	<li><strong>-sn</strong>: Bu parametre nmap e host keşfi yaptıktan sonra port taraması yapmamasını söyler. Normalde nmap host u keşfettikten sonra açık olan hostlara port taraması yapar, bu parametre nmap e bunu yapmamasını söyler. Yetkisiz bir kullanıcı tarama yaptığında nmap sadece <strong>80 ve 443 portlarına TCP SYN</strong> paketlerini gönderir. Yetkili bir kullanıcı ile yaptığınızda <strong>ARP istekleri</strong> gönderir.</li>
 	<li><strong>-Pn</strong>:<strong> Host keşfini yapmaz</strong> (bütün hostları açık olarak kabul eder). Port taramasını hızlandırmak için bu seçeneği kullanabilirsiniz. Eğer açık olduğunu bildiğiniz bir host a nse scriptlerini kullanacaksanız <em>-Pn</em> ve <em>-sn</em> parametrelerini kullanarak işleminizi iyice hızlandırabilirsiniz.</li>
 	<li><strong>-PS</strong>: Belirlenen portlara <strong>TCP SYN</strong> paketleri göndererek host keşfi yapar. Örneğin 22, 80 ve 443 portlarına SYN paketleri ile host discovery yapmak istersek şöyle bir komut kullanmamız gerekirdi : "<strong>nmap -PS 22,80,443 192.168.1.0/24</strong>"</li>
 	<li><strong>-PA</strong>: Bir önceki TCP SYN gibi bu sefer <strong>TCP ACK</strong> paketlerini belli portlara göndererek host discovery yapar. SYN ve ACK paketleri göndermek <em>firewall</em> ları geçme ihtimalinizi arttırır.</li>
 	<li><strong>-PU</strong>:<strong> UDP paket</strong>leri göndererek host discovery yapar. Firewall ları geçme ihtimaliniz artar fakat <em>UDP</em> protokolü gereği paketinizin gittiği garanti olmadığı için hata ihtimali yüksek olur, çok gerekli olmadığı sürece önermem ben.</li>
 	<li><strong>-PE; -PM; -PP</strong>: <strong>ICMP paket</strong>leri göndererek host discovery yapar.</li>
 	<li><strong>-PA</strong>: Tüm ağa <strong>ARP request</strong> gönderir, eğer <strong>ARP response</strong> gelirse hostun up olduğu belli olur ve başka deneme yapması gerekmez.</li>
 	<li>-n: Nmap bazen <em>DNS çözümleme</em> yapar. Biz Nmap ten DNS çözümleme yapmasını engellemek istersek bu parametreyi kullanabiliriz. İşlemimizi hızlandırır.</li>
 	<li>-R: Bu seferde DNS çözümlemesi yapmasını istersek bu parametreyi kullanabiliriz.</li>
</ul>
Gördüğünüz gibi sadece host discovery ile ilgili bir sürü seçenek bulunuyor. Nmap'in avantajı gerektiği yerde gerektiği seçeneği kullanarak en doğru ve en kolay yoldan sonuca ulaşmaktır.

Bahsetmediğim bir-iki parametresi daha bulunuyor fakat onlar çokta önemli değil, eğer işiniz düşerse "<strong>nmap --help</strong>" yazarak bakabilirsiniz.
<h2>Port Taraması (Port Scanning)</h2>
<em>Nmap</em>'in bunca özelliğinin içinde <em>port taraması</em>da mevcuttur. Nmap ilk geliştirilmeye başlandığından itibaren bu özelliğinin bulunmasının yanı sıra artık nmap in ana özelliklerinden biri haline gelmiştir.

Nmap port tarama sonucunu sadece<em> açık/kapalı</em> yerine port tarama sonucunu <strong>6 kategoriye</strong> ayırıyor. Bunlar:<em><strong> open</strong></em>/<strong><em>closed</em></strong>/<strong><em>filtered</em></strong>/<strong><em>unfiltered</em></strong>/<em><strong>open|filtered</strong></em> ve <strong><em>close|filtered</em></strong>

<img class="size-full wp-image-274" src="http://sausiber.org/images/nmap/nmap-port-scan.png" alt="" width="288" height="209" />
<ul>
 	<li><strong>open</strong>: Tarama sonuçlarında open port görmek bize o portta bir servis çalışıyor ve bu port üzerinde bir filtreleme işlemi olmadığını gösteriyor. Sızma testi sırasında filtreli bir port görmek istemeyiz bu yüzden durumu open olan bir port görmek bizim işimize yarar.</li>
 	<li><strong>closed</strong>: Tarama sonucunda close port görmemiz o portun erişilebilir (Yanlış anlaşılmasın erişilebilir olmasından kastım paket gönderip cevap alabildiğimiz için) fakat o port üzerinde hiç bir servis/uygulama çalışmadığı için bir şey yapamayacağımız anlamına gelir. Tabiki Nmap bu özellikten şu şekilde faydalanıyor: <em><strong>eğer bir port closed durumundaysa bu o hostun açık olduğu anlamına gelir</strong></em>, yani nmap bu özelliği <em>host discovery</em> kısmında da kullanıyor.</li>
 	<li><strong>filtered</strong>: Bunun anlamı Nmap'in o portun açık olup olmadığını anlayamadığıdır. Örneğin firewall o porta giden/gelen veriyi engelliyor da olabilir yada host açık değildir ve paketler ulaşmıyordur. Nmap doğrulamak için bir kaç paket daha göndermeyi dener, buda tarama hızını yavaşlatır.</li>
 	<li><strong>unfiltered</strong>: Portun erişilebilir fakat Nmap'in portun açık yada kapalı olduğunu anlayamadığı zaman verdiği sonuçtur. Bunu çözmek için o porta<em> SYN/FIN</em> taraması yapabilirsiniz.</li>
 	<li><strong>open|filtered</strong>: Nmap'in o portun açık yada filtered olduğunu anlayamadığı zaman verdiği sonuçtur.</li>
 	<li><strong>closed|filtered</strong>: Nmap'in o portun kapalı yada filtered olduğunu anlayamadığı zaman verdiği sonuçtur.</li>
</ul>
Nmap te bazı taramaları kullanabilmeniz için yetkili bir kullanıcı ile çalıştırmanız gerekiyor, bunun sebebi nmap in raw packet kullanmasıdır.

<strong>Nmap, default olarak en çok kullanılan 1000 porta SYN taraması yapmaktadır. </strong>Siz bütün portlara yada belirli portlara istediğiniz taramayı yapmak isterseniz Nmap'in bize sunduğu birçok parametreyi kullanabilirsiniz. İlk önce port tarama türlerine bakalım.
<ul>
 	<li><strong><em>SYN taraması (-sS)</em></strong> belirli portlara<em> SYN flag i set</em> edilip gönderilerek ve gelen cevaba bakarak yapılan bir taramadır. Sızma testlerinde bu tarama<em> sıklıkla</em> kullanılır. Bunun 2 tane sebebi var. İlk olarak SYN taramasında sadece bir paket gönderildiğinden tarama <strong>hızlı</strong> bir şekilde gerçekleşir, ikincisi ise <strong>3 lü el sıkışma tamamlanmadığı için</strong> firewall/IPS gibi yapılar tarafından engellenmez ve <em>loglarda kayıt bırakmaz (Üçlü el sıkışmanın ne olduğunu bilmiyorsanız <a href="http://umuttosun.com/three-way-handshake/">buradaki </a>yazımdan okuyabilirsiniz.). </em></li>
</ul>
<blockquote><img class="aligncenter size-full wp-image-275" src="http://sausiber.org/images/nmap/nmap-port-scan-2.png" alt="nmap syn scan" width="718" height="401" /></blockquote>
<ul>
 	<li><strong>TCP connect (-sT)</strong> taramasının <em>SYN</em> taramasından farkı ise<em> üçlü el sıkışma tamamlanıyor</em>. Bunun avantajı üçlü el sıkışma tamamlandığı için o port üzerinde çalışan servis bilgilerini daha detaylı/doğru bir şekilde alabiliyoruz. Dezavantajı ise log larda kayıt bırakıyoruz ve firewall/IPS tarafından engellenme ihtimalimiz artıyor.</li>
</ul>
<blockquote><img class="aligncenter size-full wp-image-276" src="http://sausiber.org/images/nmap/nmap-port-scan-3.png" alt="" width="383" height="23" /></blockquote>
<ul>
 	<li><em><strong>UDP taramasında (-sU)</strong></em> nmap <em>TCP</em> yerine <em>UDP</em> protokolünü kullanıyor. <em>Protokol gereği paketlerin gittiğinin garantisi olmadığı için bu tarama tipi yavaştır.</em> Ama UDP portları çok umursanmadığı için bu portlar üzerinde çok güvenlik önlemi alınmaz. Bu da sızma testi uzmanına bir avantaj sağlar. Bu taramada mantık olarak şöyle oluyor: Nmap hedefteki portlara UDP paketleri gönderiyor. Eğer<em><strong> ICMP port unreachable error</strong></em> dönerse nmap <strong><em>portun kapalı</em></strong> olduğunu anlıyor. Diğer ICMP unreachable error lardan biri gelirse portu<em> filtered</em> olarak işaretliyor. Geri dönmeyen paket olursa nmap bir daha gönderiyor ve eğer yine geri dönüş olmaz ise <em>open|filtered</em> olarak gösteriliyor. UDP taramasındaki bir diğer önemli olay ise işletim sistemleri <em>ICMP port unreachable</em> mesajını <em>belirli bir sayıda</em> gönderiyor buda doğru bir sonuç almamızı engelliyor.</li>
</ul>
[caption id="attachment_277" align="aligncenter" width="379"]<img class="size-full wp-image-277" src="http://sausiber.org/images/nmap/nmap-port-scan-4.png" alt="" width="379" height="23" /> nmap udp scan[/caption]
<ul>
 	<li><strong>TCP NULL/FIN/Xmas (-sN/-sF/-sX)</strong> taramaları TCP protokolündeki <em>flag lari değiştirerek</em> portların <em>open</em> yada <em>closed</em> olduğunu anlamak için kullanılır. Bu taramaların kullanılmasındaki neden ise flag leri set ettiğinden göze batma olasılığını düşürüyor ve  beklenmedik bir yerden yaptığı için engellenme olasılığıda düşük. Sistemler taranırken SYN/RST/ACK bitlerini içermeyen herhangi bir paket bağlantı noktası kapatıldığında RST ile sonuçlanır, bağlantı noktası açıksa hiç bir yanıt alınmaz.<em><strong>Null scan</strong> de hiçbir bit set edilmez.</em> (<strong>-sN</strong>)
<em><strong>FIN scan</strong> de sadece FIN bit i set edilir.</em> (<strong>-sF</strong>)
<em><strong>Xmas scan</strong> de FIN, PSH ve URG flag leri set edilir.</em> (<strong>-sX</strong>)

<img class="size-large wp-image-278" src="http://sausiber.org/images/nmap/nmap-fin-scan.png" alt="" width="750" height="328" /> 

Gördüğünüz gibi bir taraftan nmap <em>FIN taraması</em> yaptığımda sağ tarafta <strong><em>tcpdump</em></strong> çıktılarından "Flags" kısmında FIN flag inin set edildiğini görebiliyoruz.</li>
 	<li><em><strong>TCP ACK (-sA)</strong></em> taramasında ise bu sefer ACK flag ini set edip gönderiyoruz. Bu taramayı portun <em>açık yada kapalı olduğunu anlamak için değilde</em> firewall gibi yapıların olup olmadığını anlamak için kullanıyoruz.</li>
</ul>
<blockquote>

<img class="size-full wp-image-280" src="http://sausiber.org/images/nmap/nmap-ack-scan.png" alt="" width="694" height="218" />

Görüldüğü gibi portun açık olup olmadığını belirlemedi.</blockquote>
<ul>
 	<li><strong><em>--scanflags </em></strong>parametresiyle istediğimiz flag i set edip gönderebiliyoruz. Nmap bize gerçekten geniş bir tarama seçeneği sunuyor. İhtiyacımız ve doğru olan yöntemi seçmek ise bize kalıyor. Bu parametrenin detaylarına help ten ulaşabilirsiniz.</li>
 	<li><strong><em>Idle scan (-sI ) </em></strong>sayesinde zombie hostlarınızdan tarama yapabilirsiniz. Gerçek IP adresinizi gizlemek için kullanılabilir.</li>
</ul>
Port tarama tekniklerimiz genel olarak böyle fakat dikkatinizi çekmiştirki biz hiç hangi portların taranacağını belirtmedik. Yani nmap hep 1000 portu taradı. Kurnaz bir sys admin servislerini kullanılmayan başka portlara taşıdıysa nmap taramasında bunu görmemiz zor olacak. Bununda önüne geçmek için biz elle nmap'in hangi portları taraması gerektiğini belirtebiliyoruz. Yine birkaç parametre ile işimiz kolaylaşıyor.
<ul>
 	<li><em><strong>-p</strong> </em>parametresi ile hangi portları tarayacağını elimizle belirtebiliyoruz.</li>
</ul>
<blockquote>Örnek olarak 1 den 100 e kadar olan portları taramak istersek "<strong>nmap 192.168.1.40 -p 1-100</strong>"

Sadece 22,80 ve 443 portlarını taramak istersek "<strong>nmap 192.168.1.40 -p 22,80,443</strong>"</blockquote>
<ul>
 	<li><strong>--exclude-ports</strong> parametresi ile taramasını istemediğimiz portları taramadan çıkartabiliyoruz.</li>
</ul>
<blockquote>1 den 100 e kadar fakat 80. portu taramasını istemezsek "<strong>nmap 192.168.1.40 -p 1-100 --exclude-ports 80</strong>"</blockquote>
<ul>
 	<li><strong>-F</strong> parametresi ile nmap in default olarak en çok kullanılan 1000 portu taraması yerine en çok kullanılan 100 portu taramasını sağlayabiliriz. Tarama sonucunun hızlı olmasını istiyorsanız kullanılabilir fakat bütün portları taramayacağı için diğer sonuçları göremezsiniz.</li>
</ul>
<blockquote>"<strong>nmap 192.168.1.40 -F</strong>"</blockquote>
<ul>
 	<li><strong>--top-ports </strong>parametresi sayesinde en çok kullanılan portlar arasından kaç tanesinin kullanılacağını seçebiliyorsunuz.</li>
</ul>
<blockquote>Örnek olarak en çok kullanılan 10 portu taramak isterseniz "<strong>nmap 192.168.1.40 --top-ports 10</strong>"</blockquote>
<ul>
 	<li><strong>-p-</strong> parametresi ile bütün portları tarayabilirsiniz. Tarama süresi uzayabilir fakat açık olan portu atlamamış olursunuz.</li>
</ul>
Port belirleme parametreleride bu kadardı. İsterseniz tarama seçenekleriyle port belirleme seçeneklerini karıştırarak örnek yapalım.

Farzedinki ben <em>192.168.1.40</em> IP adresindeki hostun up olduğunu biliyorum ve DNS çözümleme yapmasını istemiyorum. Tarama olarakta SYN scan olsun ve en çok kullanılan 5 portu tarayıp bana versin istiyorum. Bunun için <em><strong>-sS</strong></em>,<em><strong> -Pn, -n ve --top-ports</strong> </em>parametrelerini kullanmam gerekiyor.

<img class="size-full wp-image-281" src="http://sausiber.org/images/nmap/nmap-example1.png" alt="" width="702" height="293" />

Sonuçtanda görüldüğü gibi demekki<strong> en çok kullanılan ilk 5 port 21, 22, 23, 80 ve 443</strong> müş. Nmap bizim için bu portlara SYN taraması yaptı ve açık ve kapalı olma durumlarına göre listeledi.

Sizinde bu parametreleri karıştırıp denemenizi öneririm.
<h2>Servis &amp; Versiyon ve İşletim Sistemi Keşfi (Service &amp; Version and OS Detection)</h2>
Nmap ile kolay bir şekilde servis ve o servisin versiyonunu keşfedebiliyoruz. Nmap o port üzerinde çalışan servisi <strong>/usr/share/nmap/nmap-services</strong> dosyasından buluyor. Fakat doğru bir sonuç olması için versiyon bilgilerini ve çalışan servisin doğrulamasını o port üzerinden gelen cevaba göre <strong>/usr/share/nmap/nmap-service-probes</strong> database inden karşılaştırarak buluyor. Dosyanın ne kadar büyük olduğunu <strong>wc</strong> komutu ile görebiliyoruz.

<img class="size-full wp-image-283" src="http://sausiber.org/images/nmap/nmap-service-probe.png" alt="" width="596" height="41" /> 

Gelelim versiyon keşfinin nasıl yapıldığına.

<strong>-sV</strong> parametresi ile nmap daha önceden bahsettiğim <strong>/usr/share/nmap/nmap-service-probes</strong> <em>database</em> inden gelen cevaba göre karşılaştırıp versiyon bilgisini tahmin etmeye çalışıyor. Nmap dökümantasyonunda <strong>-A</strong> parametresini alternatif olarak kullanabileceğimiz yazılmış fakat -A parametresi, versiyon keşfinin yanı sıra <em>işletim sistemi keşfi+script taraması</em> da yaptığından eğer sadece versiyon taraması yapmak istersek işlemimizi bir hayli uzatacaktır. Burada değinmem gereken en önemli nokta nmap version taraması yaparken 3 lü el sıkışmayı tamamlamak durumunda kalıyor. Bu yüzden firewall lar tarafından engellenme ihtimalimiz artıyor ve bağlantı kurduğumuz için log larda gözüküyor.

<img class="size-full wp-image-284" src="http://sausiber.org/images/nmap/nmap-version-detection.png" alt="" width="1022" height="528" /> 

Nmap'in en bilindik özelliklerinden biri ise<strong> işletim sistemi keşfidir.</strong> Nmap bunu <em>açık olan portların numaralarına + window size uzunluğuna  ve gelen paketlerdeki fingerprintlere</em> bakarak bulmaya çalışıyor. Bu fingerprintler <strong>/usr/share/nmap/nmap-os-db</strong> database inde bulunuyor ve Nmap dökümantasyonunda yazana göre <strong>2,600 den fazla bilindik işletim sistemi</strong> <strong>fingerprinti</strong> bulunuyor.

<em>OS discovery'i</em> <strong>-O</strong> parametresi ile yapabiliyoruz ve eğer nmap işletim sistemini bulamazsa yada hatalı bir şekilde bulursa verdiği linkten bunu bildirip geliştirilmesinde katkı sağlayabiliyoruz.

<img class="size-full wp-image-285" src="http://sausiber.org/images/nmap/nmap-os-discovery.png" alt="nmap os discovery" width="973" height="530" />
<h2>Nmap Scripting Engine (NSE)</h2>
Eveet, gelelim Nmap'in bize sağladığı en iyi özelliğe.

Yazının başında Nmap'in zafiyet taraması ve exploit edebilmesinden bahsetmiştim hatırladınız mı? İşte Nmap bunu <em><strong>NSE scriptleri</strong> </em>ile yapıyor. Nmap'in içerisinde şuanlık <em><strong>567 adet NSE scripti</strong></em> bulunmakta. Bunlar yardımı ile zafiyet taraması, discovery ve exploit işlemlerini yapabilirsiniz. Nmap'in güzel olaylarından birisi <em><strong>open-source</strong></em> olması. Bunun sayesinde kendimizde NSE scripti yazabiliyoruz. Bu scriptlere ulaşmak isterseniz <em><strong>/usr/share/nmap/scripts </strong></em>dizininden ulaşabilirsiniz.

Bu scriptlerin ne işe yaradıklarını istediğiniz bir editörle (vim, nano yada arayüzlü bir editör, tamamen size kalmış) açıp, açıklamaları okuyup ne işe yaradıklarını ve nasıl kullanıldıklarını öğrenebilirsiniz.

Örneğin <strong>os discovery</strong> için kullanılan <strong>smb-os-discovery.nse</strong> scriptine bakalım.

<img class="aligncenter size-large wp-image-287" src="http://sausiber.org/images/nmap/nmap-nse-os-discovery-1024x358.png" alt="" width="750" height="262" />

Açıklamaları okuduğumuzda bu scriptin <strong>smb protokolünü</strong> kullanarak <strong>işletim sistemi keşfi</strong> yaptığını öğrendik ve yukarıdaki fotoğraftan görüldüğü gibi nasıl kullanabileceğimizide gösteriyor. İsterseniz elimizi kirletip bir deneyelim.
<ul>
 	<li>Hangi script i kullanacağımızı nmapte <strong>--script</strong> parametresi ile belirtiyoruz.</li>
 	<li>Script argümanı olarak vereceklerimizi<strong> --script-args</strong> parametresi ile belirtiyoruz.</li>
 	<li>Daha detaylı olarak bakmak isterseniz<a href="https://nmap.org/book/man-nse.html"> buradan </a>bakabilirsiniz.</li>
</ul>
&nbsp;

<img class="size-full wp-image-288" src="http://sausiber.org/images/nmap/nmap-nse-script.png" alt="" width="708" height="549" />

Görüldüğü üzere başarılı bir şekilde script çalışıp bize işletim sistemi bilgilerini getirdi.

İşinize yarayacak bir kaç scripti <a href="https://hackertarget.com/7-nmap-nse-scripts-recon/">buradan</a> bulabilirsiniz. NSE script konusunu fazla uzatmak istemiyorum çünkü tamamen ayrı bir yazı olabilecek nitelikte. Dediğim gibi eğer aradığınız bir script i bulamazsanız kendinize yazabilirsiniz.
<h2>İleri Düzey Kullanım (Advanced)</h2>
Bunca saydığım özelliklerin yanı sıra sızma testi sırasında işinize yarayacak, bazen hayati bir önem taşıyabilecek bir kaç özellikten daha bahsetmek istiyorum son olarak.

Bazen firewall gibi yapılar ardı ardına gelen paketleri kötü amaçlı gördüğünden engelleyebiliyor. Bunun önüne geçmek için nmap te tarama hızını (<strong>-T parametresi ile</strong>) ayarlayabiliyoruz. T parametresine<strong> 0' dan 6' ya kadar</strong> numara verebiliyoruz.
<ul>
 	<li><strong>0 (paranoid)</strong>: Bu hıza ayarladığımızda paketler arasındaki süre 5 dakikaya kadar çıkar.</li>
 	<li><strong>1 (sneaky)</strong>: Bu hızla paketler arası süre 15 saniyeye kadar çıkar.</li>
 	<li><strong>2 (polite)</strong>: Paketler arası süre 0.4 saniye olur.</li>
 	<li><strong>3 (normal)</strong>: Default olarak kullanılan mod.</li>
 	<li><strong>4 (aggressive)</strong>: Agresif mod. Hızlı ve güvenilir bir ağda olduğunuzu varsayıp ona göre tahmin yapar.</li>
 	<li><strong>5 (insane)</strong>: Bu mod doğru sonuç uğruna hızlı bir sonuç almanıza olanak sağlar. Yani mümkün olabilecek en hızlı şekilde size sonuç verir fakat sonuçlar tam olarak doğru olmayabilir.</li>
</ul>
<img class="size-full wp-image-289" src="http://sausiber.org/images/nmap/nmap-ileri.png" alt="" width="700" height="400" />
<ul>
 	<li><strong>-D</strong> parametresi ile yem verebilirsiniz. Nmap tarama yaparken aynı anda farklı IP adresleri ilede paket atıp, logları karıştırır.</li>
 	<li><strong>-A</strong> parametresi os detection (-O) + version detection (-sV) + script scanning (-sC) ve traceroute (--traceroute) özelliklerinin birleşimi</li>
 	<li><strong>--spoof-mac</strong> parametresi ile mac spoof yapabiliriz.</li>
 	<li><strong>Firewall/IDS atlatma</strong> ile ilgili dökümantasyona <a href="https://nmap.org/book/man-bypass-firewalls-ids.html">buradan</a>, çeşitli parametrelerede <a href="https://nmap.org/book/man-misc-options.html">buradan</a> ulaşabilirsiniz.</li>
</ul>
Umarım yeterince detaylı bir yazı olmuştur. Herhangi bir sorunuz olursa yorumdan yazabilirsiniz.

Bu parametreleri direk ezberlemeyi önermem, bunları kullana kullana öğreneceksiniz. Bir gün test yaparken bir şey lazım olacak ve dökümantasyondan bakıp teste devam edeceksiniz. Fakat bol bol pratik yapmanızı şiddetle öneriyorum.

<strong>**Nmap kullanımının yasal  olup olmadığını bilmiyorum bu yüzden sanal ortamda denemenizi öneririm.</strong>


Yazar

<div class="col-sm-4 col-sm-offset-2">
        <div class="team-member">
            <img src="http://sausiber.org/images/team/{{ site.people[6].pic }}.jpg" class="img-responsive img-circle" alt="">
            <h4>{{ site.people[6].name }}</h4>
              {% for network in site.people[6].social %}
               <a href="{{ network.url }}"><i class="fa fa-{{ network.title }}"></i></a>
              {% endfor %}
</div>