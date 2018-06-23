(function (window) {
  // 1 创建构造函数
  function Game(map) {
    // 添加食物对象
    this.food = new Food()
    // 添加蛇对象
    this.snake = new Snake()

    // 添加map地图属性
    this.map = map
  }

  // 2 给原型对象中添加 开始游戏 的方法
  Game.prototype.start = function () {
    // 将 this 存储到一个变量中, 目的是为了在定时器函数内部获取到这个this
    var that = this
    
    // 让游戏开始要做什么???
    // 1 渲染食物
    this.food.render(this.map)
    // 2 渲染蛇
    this.snake.render(this.map)

    // 2.1 给 document 绑定按键的事件, 来监听 上下左右 方向键按下的事件
    document.addEventListener('keyup', function (event) {
      // 如何获取到当前的键值??? 
      // 通过事件对象 event 来获取
      // console.log(event.keyCode)
      switch (event.keyCode) {
        case 38:
          // 上
          // 判断方向是不是与当前方向相反，如果相反，就不执行任何错误
          if (that.snake.direction === 'down') {
            return
          }
          that.snake.direction = 'up'
          break
        case 40:
          // 下
          if (that.snake.direction === 'up') {
            return
          }
          that.snake.direction = 'down'
          break
        case 37:
          // 左
          if (that.snake.direction === 'right') {
            return
          }
          that.snake.direction = 'left'
          break
        case 39:
          // 右
          if (that.snake.direction === 'left') {
            return
          }
          that.snake.direction = 'right'
          break
      }
    })

    // 3 让蛇动起来
    // 注意: 每一个函数都有自己的this
    //       定时器中的this 是: window
    //       如何在定时器内部,获取到外部函数的this? 通过一个中间变量 that 来获取
    var timerId = setInterval(function () {
      // that.snake.move(this.map)
      that.snake.move(that.map, that.food)

      // 判断蛇有没有撞墙

      // 1 获取到蛇头坐标
      var head = that.snake.body[0]

      // 2 分别判断上下左右四个边有没有碰墙，如果碰墙了，就提示游戏结束，并且清理定时器
      if (head.x < 0 || head.y < 0 || head.x > ((that.map.offsetWidth / that.snake.width) - 1) || head.y > ((
          that.map.offsetHeight / that.snake.height) - 1)) {
        alert('Game Over，游戏结束了~')
        // 清理定时器
        clearInterval(timerId)
      }

      // 3 判断蛇吃自己
      // 因为蛇最少有5节，才可能吃掉自己，因此，是从 索引号为4 开始的
      for (var i = 4; i < that.snake.body.length; i++) {
        // 判断蛇头有没有与蛇节重合，如果重合了，说明蛇吃到自己，游戏就结束
        if (head.x === that.snake.body[i].x && head.y === that.snake.body[i].y) {
          alert('Game Over，你吃到自己了')
          clearInterval(timerId)
        }
      }
    }, 200)

    // 4 蛇吃食物的逻辑 --> 应该放到蛇对象的move方法中来实现

    // 5 蛇撞墙后 游戏结束 的逻辑 --> 需要在每次蛇移动的时候，判断蛇头有没有撞墙
    //    应该放在上面定时器中

    // ...
  }

  window.Game = Game
})(window)