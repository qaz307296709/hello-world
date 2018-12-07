//轮播图
$(function () {
    (function () {
        // $(".lunbo-li")
        $(".lunbo-li a").each(function (index, ele) {
            $(ele).css({
                "background": 'url("images/lunbo' + (index + 1) + '.jpg") center no-repeat',
            });
        });
        var count = 0;
        interval();
        var timeId = setInterval(interval, 3000);
        $("#lunbo").on("mouseenter", function () {
            clearInterval(timeId);
        });
        $("#lunbo").on("mouseleave", function () {
            timeId = setInterval(interval, 3000);
        });

        $(".tab-lis ").mouseenter(function () {
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".lunbo-li").eq($(this).index()).show().siblings().hide();
            count = $(this).index();
        });

        function interval() {
            if (count === 4) {
                count = 0;
            }
            $(".lunbo-li").eq(count).stop().fadeIn().siblings().stop().fadeOut();
            $(".tab-lis").eq(count).addClass("cur").siblings().removeClass("cur");
            count++;
        }
    }());


    //抢购倒计时
    (function () {
        handle();
        var timeId=setInterval(handle,1000);
    }());


    //显示抢购图片
    (function () {
        $(".seckill-top img").each(function (index, ele) {
            $(ele).attr("src", "images/" + (index + 1) + "jpg.jpg");
        });
    }());






    //倒计时函数
    function handle(){
        var dt = new Date();
        var hours = dt.getHours();
        var minutes = 60-dt.getMinutes()-1;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var second = 60-dt.getSeconds();
        second = second < 10 ? "0" + second : second;
        var $span = $(".djs-time span");
        if (hours % 2 === 0) {
            $span.eq(0).text("01");

        } else {
            $span.eq(0).text("00");
        }
        $span.eq(1).text(minutes);
        $span.eq(2).text(second);
    }



    // 固定导航栏
    (function () {

        $(window).scroll(function () {
           if($(window).scrollTop()>800){
               console.log($(window).scrollTop());
               $(".hd-fixed").stop().animate({"top":0},120,"linear");
           }else{
               console.log($(window).scrollTop());
               $(".hd-fixed").stop().animate({"top":-65},20,"linear");
           }
        });
    }());

    /**
     * 抢购页右侧固定二维码
     */
    (function () {
        $(window).scroll(function () {
           if($(window).scrollTop()>630){
               $(".fixed-code").css({
                   "position":"fixed",
                   "top":"156px"
               });
           }else{
               $(".fixed-code").css({
                   "position":"absolute",
                   top:"0"
               })
           }
        });
    }());


    /**
     * 回到顶部按钮
     */
    (function () {
      $(window).scroll(function () {
          if($(window).scrollTop()>2000){
              $(".return-top").stop().fadeIn();
          }else{
              $(".return-top").stop().fadeOut();
          }
      })  ;
      $(".return-top").click(function () {
          console.log("ahdh");
          $("html,body").animate({"scrollTop":0});
      });
    }());
});