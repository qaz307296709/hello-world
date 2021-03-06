function my$(id) {
    return document.getElementById(id);
}

//获取任一元素的任一属性的值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}
var flag = true;
function animate(element, json, fn) {
    //清理计时器
    clearInterval(element.timeId);
    //设置定时器
    element.timeId = setInterval(function () {
        //遍历json对象中的数据
        for (var attr in json) {
            //判断属性是否为透明属性
            if (attr == "opacity") {
                //获取元素当前透明度
                var current = getStyle(element, attr) * 100;//乘100方便计算
                //目标透明度
                var target = json[attr] * 100;
                //设置每次的变化的数值
                var step = 10;
                //判断step行走方向
                step = (target - current) > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                if (target - current>= step) {
                    element.style[attr] = current/100;
                } else {
                    // clearInterval(my$("dv").timeId);
                    current=target;
                    element.style[attr] = current/100;
                }
            } else if (attr == "zIndex") {//判断是不是zindex属性
                element.style[attr] = json[attr];
            } else {
                //获取元素当前位置
                var current = parseInt(getStyle(element, attr));//返回字符串类型需要转数字
                //目标位置
                var target = json[attr];
                //设置每次的步数
                var step = (target - current) / 5;
                //判断step行走方向
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
                if (Math.abs(target - current) >= Math.abs(step)) {
                    element.style[attr] = current + "px";
                } else {
                    // clearInterval(my$("dv").timeId);
                    element.style[attr] = target + "px";
                }
            }
            //判断有没有达到
            if (current != target) {
                flag = false;
            }else{
                flag=true;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 35);
}
function yunsu(element, json, fn) {
    //清理计时器
    clearInterval(element.timeId);
    //设置定时器
    element.timeId = setInterval(function () {
        var flag = true;
        //遍历json对象中的数据
        for (var attr in json) {
            //判断属性是否为透明属性
            if (attr == "opacity") {
                //获取元素当前透明度
                var current = getStyle(element, attr) * 100;//乘100方便计算
                //目标透明度
                var target = json[attr] * 100;
                //设置每次的变化的数值
                var step = (target - current) / 10;
                //判断step行走方向
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {//判断是不是zindex属性
                element.style[attr] = json[attr];
            } else {
                //获取元素当前位置
                var current = parseInt(getStyle(element, attr));//返回字符串类型需要转数字
                //目标位置
                var target = json[attr];
                //设置每次的步数
                var step = 10;
                step=current<target?step:-step;
                //判断step行走方向
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // element.style[attr] = current + "px";
                if (Math.abs(target - current) >= Math.abs(step)) {
                    element.style[attr] = current + "px";
                } else {
                    // clearInterval(my$("dv").timeId);
                    element.style[attr] = target + "px";
                }
            }
            //判断有没有达到
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 10);
}


window.onload = function () {
    my$("app").onmouseover = function () {
        my$("box").style.display = "block";
    };
    my$("app").onmouseout = function () {
        my$("box").style.display = "none";
    };

    //购物车
    my$("container_right_r").onmouseover = function () {
        if (!my$("container_right_r_bottom").getElementsByTagName("p")[0]) {
            var p1 = document.createElement("p");
            p1.innerHTML = "购物车中还没有商品，赶紧选购吧！";
            my$("container_right_r_bottom").appendChild(p1);
        }
        animate(my$("container_right_r_bottom"),{"height":100});

        my$("gouWuChe").style.color = "#ff6700";
        this.style.backgroundColor = "#fff";

    };
    my$("container_right_r").onmouseout = function () {
        animate(my$("container_right_r_bottom"),{"height":0});
        my$("gouWuChe").style.color = "";
        this.style.backgroundColor = "";
    };

    /*选项卡*/
    //获取导航li
    var site_header_center=my$("site_header_center");
    var site_header_center_aObjs=site_header_center.getElementsByClassName("nav-title");
    //获取导航菜单div
    var nav_menu=document.getElementsByClassName("nav-menu");
    var index=0;
    for(var i=0;i<site_header_center_aObjs.length;i++) {
        site_header_center_aObjs[i].setAttribute("index", i);
        site_header_center_aObjs[i].onmouseover = function () {
            for (var j = 0; j < nav_menu.length; j++) {
                nav_menu[j].style.display = "none";

            }
            index = parseInt(this.getAttribute("index"));
            nav_menu[index].style.display = "block";
            yunsu(nav_menu[index],{"height":230});
        };
    }
        site_header_center.onmouseover=function() {
            for (var i = 0; i < site_header_center_aObjs.length; i++) {
                animate(nav_menu[i], {"height": 230});
                nav_menu[i].style.borderTop="1px solid #e0e0e0";
            }
        };
    site_header_center.onmouseout=function(){
        for(var i=0;i<site_header_center_aObjs.length;i++) {
            yunsu(nav_menu[i],{"height":0});
            nav_menu[i].style.border="none";
        }
    };









    //轮播图
    //获取所有li
    var pager = my$("pager");
    var pager_list = pager.getElementsByTagName("li");
    //图片
    var rotation_Objs = my$("rotation").children;
    var pic = 0;
    for (var i = 0; i < pager_list.length; i++) {
        pager_list[i].setAttribute("index", i);
        pager_list[i].onmouseover = mouseoverHandle;
    }

    function mouseoverHandle() {
        for (var j = 0; j < pager_list.length; j++) {
            pager_list[j].removeAttribute("class");
            animate(rotation_Objs[j], {"opacity": 0})
        }
        this.className = "current";
        pic = this.getAttribute("index");
        animate(rotation_Objs[pic], {"opacity": 1})
    }


    //定时播放
    var timeId=setInterval(intervalHandle,2500);
    //鼠标进入停止计时器
    var home_hero_slider_in=my$("home_hero_slider_in");
    home_hero_slider_in.onmouseout=function(){
        timeId=setInterval(intervalHandle,2500);
    };
    home_hero_slider_in.onmouseover=function(){
      clearInterval(timeId);
    };


    rotation_Objs[0].style.opacity = "1";
    //获取左焦点
    var left_right_left = my$("left_right").getElementsByTagName("a")[0];
    //获取右焦点
    var left_right_right = my$("left_right").getElementsByTagName("a")[1];
    left_right_left.onclick = function () {
        if(flag){

            if (pic == 0) {
                pic = 5;
            }
            pic--;
            for (var j = 0; j < pager_list.length; j++) {
                pager_list[j].removeAttribute("class");
                animate(rotation_Objs[j], {"opacity": 0})
            }
            pager_list[pic].className = "current";
            animate(rotation_Objs[pic], {"opacity": 1});
            return false;
        }
    };
    left_right_right.onclick = intervalHandle;
    function intervalHandle(){
        if(flag){
            if(pic==4){
                pic=-1;
            }
            pic++;
            for (var j = 0; j < pager_list.length; j++) {
                pager_list[j].removeAttribute("class");
                animate(rotation_Objs[j], {"opacity": 0})
            }
            pager_list[pic].className = "current";
            animate(rotation_Objs[pic], {"opacity": 1});
        }
     }





    var nav_bar_list=my$("nav_bar").getElementsByTagName("li");
    var nav_bar_span=my$("nav_bar_span");
    nav_bar_list[0].onmouseover=function(){
        nav_bar_span.style.display="block";
    };
    nav_bar_list[0].onmouseout=function(){

        nav_bar_span.style.display="none";
    };



    //闪购旋转木马
    //获取两侧a标签
    var more=my$("more");
    //获取图片li
    var carousel_wrapper=my$("carousel_wrapper");

    var list=carousel_wrapper.getElementsByTagName("li");
    //获取每个li的宽度
    var liWidth=list[0].offsetWidth+list[0].offsetLeft;

    //获取ul
    var ul=carousel_wrapper.firstElementChild;
    var aObjs=more.children;
    var length=ul.children.length;
    var index=0;
    aObjs[1].onclick=function(){
        if(4<length-index){
            index+=4;
        }
       if(index<length){
           if(length-index>=4){
               animate(ul,{"left":-index*liWidth});
           }else{
               animate(ul,{"left":-(length-4)*liWidth});
               index-=2;
           }
       }
    };
    aObjs[0].onclick=function(){
        if(index>4){
            index-=4;
            animate(ul,{"left":-index*liWidth});
        }else{
            animate(ul,{"left":0});
        }
    };



    down();
    setInterval(down,1000);
    function down() {
        var date=new Date();
        var hours=date.getHours();
        my$("time").innerHTML=((hours+1)<10?"0"+(hours+1):(hours+1))+":00场";
        var minutes=date.getMinutes();
        minutes=minutes<10?"0"+minutes:minutes;
        my$("minutes").innerHTML=(60-minutes-1)<10?"0"+(60-minutes-1):(60-minutes-1);
        var seconds=date.getSeconds();
        my$("seconds").innerHTML=(60-seconds-1)<10?"0"+(60-seconds-1):(60-seconds-1);
    }


};
