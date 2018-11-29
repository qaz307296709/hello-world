//蛇的自调用函数
(function () {
    var elements = [];//存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"}//身体
        ];
        //方向
        this.direction = direction || "right";
    }

    //原型中添加方法
    Snake.prototype.init = function (map) {
        remove();

        //根据this.body中对象的个数添加div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x*this.width + "px";
            div.style.top = obj.y*this.height + "px";
            div.style.backgroundColor = obj.color;
            elements.push(div);
        }
    };

    //蛇动起来的的方法
    Snake.prototype.move = function (food,map) {
        //改变蛇身体的坐标
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断蛇的方向
        switch (this.direction) {
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "right":
                this.body[0].x += 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
            //获取小蛇的最后的尾巴
            var last=this.body[this.body.length-1];
            //把最后的蛇尾复制一个,重新的加入到小蛇的body中
            this.body.push({
                x:last.x,
                y:last.y,
                color:getColor()
            });
            //把食物删除,重新初始化食物
            food.init(map);
        }
    };


    //删除蛇的函数
    function remove(){
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }

    window.Snake=Snake;
}());
