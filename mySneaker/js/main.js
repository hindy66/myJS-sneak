function myGame (){

    //地图行数
    this.row = 30;
    //地图列数
    this.column = 30;
    
    //获取游戏地图的父级盒子
    this.box = document.querySelector(".box");

    //一个用于记录li（格子）的数组
    this.bigArr = [];

    //一个用于记录蛇(所在格子)的数组
    this.sneakArr = [];

    //用于记录当前移动的方向
    this.direction = "right";

    //控制游戏状态的定时器
    this.timer = null;

    //记录蛇头的横纵坐标
    this.x = 2;
    this.y = 0;


    //记录食物的横纵坐标
    this.foodX = 0 ;
    this.foodY = 0 ;

    //用于记录食物的数组
    this.foodArr = [];

    //用于记录分数
    this.score = 0 ;    

    //获取暂停按钮
    this.restartBtn = document.querySelector(".btn-group .restart");

    //获取重新开始按钮
    this.stopBtn = document.querySelector(".btn-group .stop");

    //获取继续按钮
    this.againBtn = document.querySelector(".btn-group .again");

    //获取分数div
    this.scoreSpan = document.querySelector(".score-box span");

    //记录当前游戏状态
    this.gameStatus = 'normal';

    _this = this;

      //监听按键按下的事件
        document.onkeydown = function(event){

            // 20.0.1 event ----> 事件对象 
            // 键值码 40 ----> 下 38 ---->上
            // 键值码 37 ----> 左 38 ---->右
        var keyCode = event.keyCode;
        
        if(_this.direction == 'right' && keyCode ==37){
            // 终止代码
            return ;
        }
        if(_this.direction == 'left' && keyCode ==39){
            // 终止代码
            return ;
        }
        if(_this.direction == 'down' && keyCode == 38){
            // 终止代码
            return ;
        }
        if(_this.direction == 'up' && keyCode == 40){
            // 终止代码
            return ;
        }

        if(keyCode == 40 && _this.direction == 'up'){
            // 给direction赋值
            return;
            
        }

        if(keyCode == 38 && _this.direction == 'down'){
            // 给direction赋值
            return;
            
        }

        if(keyCode == 39 && _this.direction == 'left'){
            // 给direction赋值
            return;
            
        }

        if(keyCode == 37 && _this.direction == 'right'){
            // 给direction赋值
            return;
            
        }


        // 设置蛇移动方向
        if(keyCode == 40){
            // 给direction赋值
            _this.direction = "down";
            // // 38.0 设置bool为false 
            // isChange = false; 
        }
        // 设置蛇移动方向
        if(keyCode == 38){
            // 给direction赋值
            _this.direction = "up";
            // // 38.0 设置bool为false 
            // isChange = false;
        }
        // 设置蛇移动方向
        if(keyCode == 39){
            // 给direction赋值
            _this.direction = "right";
            // // 38.0 设置bool为false 
            // isChange = false;
        }
        // 设置蛇移动方向
        if(keyCode == 37){
            // 给direction赋值
            _this.direction = "left";
            // // 38.0 设置bool为false 
            // isChange = false;
        }
    }

    //初始化地图的函数
    this.drawMap = function(){
        for( var i = 0 ; i < this.row ; i++){
            var rowArr = [];
            var ulcreate = document.createElement("ul");
            ulcreate.classList.add("clearfix");
            for( var j = 0 ; j < this.column ; j++ ){
                var licreate = document.createElement("li");
                ulcreate.appendChild(licreate);
                rowArr.push(licreate);
            }
            this.box.appendChild(ulcreate);
            this.bigArr.push(rowArr);
        }
    }

    //初始化蛇的位置
    this.drawSneak = function(){
        for(var i = 0; i < 3; i++){
            this.bigArr[0][i].classList.add("sneak");
            this.sneakArr.push(this.bigArr[0][i]);
        }
        
    }

    //创建食物的函数
    this.creatFood = function(){
        var avail = false;
        while( !avail ){
            this.foodX = Math.floor(Math.random()*30);
            this.foodY = Math.floor(Math.random()*30);
            for(var i = 0 ; i < this.sneakArr.length ; i++ ){
                if( this.sneakArr[i] == this.bigArr[this.foodY][this.foodX] ){
                    avail = false;
                }else{
                    avail = true;
                }
            }
        }
        this.bigArr[this.foodY][this.foodX].classList.add("food");
        this.foodArr.push(this.bigArr[this.foodY][this.foodX]);
                
    }

    this.clearFood = function(){
        this.foodArr[0].classList.remove("food");
        this.foodArr.pop();
    }

    //更新分数的函数
    this.upgradeScore = function(){
        this.score += 100;
        this.scoreSpan.innerText = "分数:"+this.score;
    }


    //实现蛇移动的函数
    this.move = function(){

        if(_this.direction == "right"){
            _this.x++;
        }else if( _this.direction == "left"){
            _this.x--;
        }else if( _this.direction == "up"){
            _this.y--;
        }else if( _this.direction == "down"){
            _this.y++;
        }
        console.log("x:"+_this.x+","+"y:"+_this.y);
        
        
        

        //判断是否超出左右边界
        if(_this.x > _this.column -1 || _this.x <  0 ){
            clearInterval(_this.timer);
            window.alert("出界啦");
            return;
        }

        //判断是否超出上下边界
        if(_this.y > _this.row-1 || _this.y < 0){
            clearInterval(_this.timer);
            window.alert("出界啦");
            return;

        }

        //判断是否触碰到自己
        for( var i = 0 ; i < _this.sneakArr.length ; i++ ){
            if(_this.sneakArr[i] == _this.bigArr[_this.y][_this.x]){
                window.alert("碰到自己了!游戏结束");
                clearInterval(_this.timer);
                return;
            }
        }

        //判断是否吃到食物
        if( _this.foodArr != null && _this.foodArr[0] == _this.bigArr[_this.y][_this.x] ){
            _this.clearFood();
            _this.bigArr[_this.y][_this.x].classList.add("sneak");
            _this.sneakArr.push( _this.bigArr[_this.y][_this.x] );
            _this.upgradeScore();
            _this.creatFood();
            return;

        }

        

        // 每次都移除蛇尾(即蛇数组中的第一位元素)的类名
        _this.sneakArr[0].classList.remove("sneak");
        _this.sneakArr.shift();
        // console.log(this.x);

        // 更新蛇头的位置(往蛇头数组增加一个li格子并且添加类名)
        _this.bigArr[_this.y][_this.x].classList.add("sneak");
        _this.sneakArr.push( _this.bigArr[_this.y][_this.x] );

        
        
    }

    this.startGame = function(){

        this.timer = setInterval(this.move,100);
        
    }

    this.clearSneak = function(){
        _this.x = 2;
        _this.y = 0;
        _this.direction = 'right'
        for(var i = 0 ; i < this.sneakArr.length ; i++){
            this.sneakArr[i].classList.remove("sneak");
        }
        this.sneakArr = [];
    }

    this.addEvent = function(){
        this.stopBtn.onclick = function(){
            if(_this.timer != null && _this.gameStatus == 'normal'){
                clearInterval(_this.timer);
                _this.timer = null;
                _this.gameStatus = "stop";
            }
            
        }

        this.restartBtn.onclick = function(){
            if(_this.timer != null){
                clearInterval(_this.timer);
                _this.timer = null;
                _this.score = 0;
                _this.scoreSpan.innerText = "分数:"+_this.score;
                // console.log(_this.timer);
                _this.clearSneak();
                _this.clearFood();
                _this.drawSneak();
                _this.startGame();
                _this.creatFood();              
               
            }
        }

        this.againBtn.onclick = function(){
            console.log("点击继续");
            if(_this.timer == null && _this.gameStatus == 'stop'){
                _this.startGame();
                _this.gameStatus = 'normal';
            }else{
                console.log("非空！！")
                return;
            }
        }
    }

    

    this.init = function(){
        this.drawMap();
        this.drawSneak();
        // this.keyFun();
        // this.outtimer = setTimeout(this.startGame,1000); 
        this.startGame();  
        this.addEvent(); 
        this.creatFood();   
    }
}


//创建一个实例
var my = new myGame();
my.init();