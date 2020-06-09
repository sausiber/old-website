var y = true;
var x = document.createElement('div');
var z = document.getElementById('menu');


function myfunc(){
    if(y == true)
    {
        x.innerHTML = '<a href="#section1" onclick="myfunc2()"><i class="fa fa-angle-up fa-2x"></i></a>';
        x.setAttribute('class','menu-item');
        z.style.flexDirection = 'row';
        z.style.position = 'fixed';
        z.style.display = 'block';
        z.appendChild(x);
        y = false;
    }
}

function myfunc2(){
    if(y==false){
        z.style.display = 'flex';
        z.style.position = 'static';
        x.remove();
    }
    y = true;
}
