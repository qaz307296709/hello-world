//食物的自调用函数
(function () {
    var elements = [];//保存每个食物
    //食物的构造函数
    function Food(x, y, width, height, color) {
        this.width = width || 20;
        this.height = height || 20;
        this.color = getColor();
        this.x = x || 0;
        this.y = y || 0;
    }

    //构造函数原型中添加方法
    Food.prototype.init = function (map) {
        //有则删除食物
        remove();

        var div = document.createElement("div");
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = getColor();
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.borderRadius="50%";
        map.appendChild(div);
        elements.push(div);
    };

    //删除食物的私有函数
    function remove() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
}());
