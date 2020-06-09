var y = true;
var x = document.createElement('div');


function myfunc(){
    if(y == true)
    {
        x.innerHTML = '<a href="#section1" onclick="myfunc2()"><i class="fa fa-angle-up fa-2x"></i></a>';
        x.setAttribute('class','menu-item');
        document.getElementById('menu').style.flexDirection = 'row';
        document.getElementById('menu').style.position = 'fixed';
        document.getElementById('menu').style.display = 'block';
        document.getElementById('menu').appendChild(x);
        y = false;
    }
}

function myfunc2(){
    if(y==false){
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('menu').style.position = 'static';
        x.remove();
    }
    y = true;
}