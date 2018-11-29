//游戏的自调用函数
(function () {
    var that=null;
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this
    }
    //初始化游戏
    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bindKey();

    };

    //设置蛇自动跑
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function(){
            this.snake.move(food,map);
            this.snake.init(map);
            //蛇横坐标最大值
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            //蛇头的坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX||headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("Game Over");
            }
        }.bind(that),200);
    };

    //添加原型方法判断用户按键，改变蛇的方向
    Game.prototype.bindKey=function () {
        document.addEventListener("keydown",function (e) {
            switch(e.keyCode){
                case 37 :this.snake.direction="left";break;
                case 38 :this.snake.direction="top";break;
                case 39 :this.snake.direction="right";break;
                case 40 :this.snake.direction="bottom";break;
            }
        }.bind(that),false)
    };

    window.Game=Game;
}());
window.onload=function(){
    var game=new Game(document.querySelector(".map"));
    game.init();
};


/**
 * 随机颜色
 * @returns {string}
 */
function getColor() {
    var str = "#";
    //一个十六进制的值的数组
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for (var i = 0; i < 6; i++) {
        //产生的每个随机数都是一个索引,根据索引找到数组中对应的值,拼接到一起
        var num = parseInt(Math.random() * 16);
        str += arr[num];
    }
    return str;
}
