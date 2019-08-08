(function () {
  const moveMap = {
    ArrowUp: { x: 0, y: -1, change: 'y', about: 'height' },
    ArrowRight: { x: 1, y: 0, change: 'x', about: 'width' },
    ArrowDown: { x: 0, y: 1, change: 'y', about: 'height' },
    ArrowLeft: { x: -1, y: 0, change: 'x', about: 'width' }
  }

  function prepare() {
    const imgTask = (img, src) => {
      return new Promise(function (resolve, reject) {
        img.onload = resolve
        img.onerror = reject

        img.src = src
      })
    }

    const context = document.getElementById('canvas').getContext('2d');

    const heroImg = new Image();
    const allSpriteImg = new Image();

    const allResourceTask = Promise.all([
      imgTask(heroImg, './static/images/hero.png'),
      imgTask(allSpriteImg, './static/images/all.jpg'),
    ])

    return {
      /**
       * @param {Function} [callback] - 资源准备好之后的回调函数
       */

      getResource(callback) {
        allResourceTask.then(() => {
          callback && callback(context, heroImg, allSpriteImg);
        })
      }
    }
  }

  function drawHero(context, heroImg, allSpriteImg) {
    function draw() {
      this.context
        .drawImage(
          this.img,
          this.imgPos.x,
          this.imgPos.y,
          this.imgPos.width,
          this.imgPos.height,
          this.rect.x,
          this.rect.y,
          this.rect.width,
          this.rect.height,
        )
    }

    function move(direction) {
      let moveData = moveMap[direction]
      if (!moveData) {
        return false
      }

      let { change, about } = moveData

      if (this.rect[change] + moveData[change] * this.rect.width > this.context.canvas[about] - this.rect.width || this.rect[change] + moveData[change] * this.rect.width < 0) {
        return false
      }

      this.clearSelf()

      this.rect[change] += moveData[change] * this.rect.width
      this.draw()
    }

    function clearSelf() {
      this.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
    }

    function Hero(img, context, { x = 0, y = 0 } = {}) {
      this.img = img
      this.context = context

      this.imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
      }
      this.rect = {
        x,
        y,
        width: 40,
        height: 40
      }
    }

    Hero.prototype.draw = draw
    Hero.prototype.clearSelf = clearSelf
    Hero.prototype.move = move

    function Monster(img, context, { x = 100, y = 100 } = {}) {
      this.img = img
      this.context = context
      this.imgPos = {
        x: 858,
        y: 529,
        width: 32,
        height: 32
      }
      this.rect = {
        x,
        y,
        width: 40,
        height: 40
      }
    }

    Monster.prototype.draw = draw

    function RedMonster(img, context, { x = 100, y = 100 } = {}) {
      Monster.call(this, img, context, { x, y })

      this.imgPos = {
        x: 858,
        y: 497,
        width: 32,
        height: 32
      }
    }

    RedMonster.prototype = Object.create(Monster.prototype, { constructor: { value: RedMonster } })

    const hero = new Hero(heroImg, context)
    hero.draw();

    const monster = new Monster(allSpriteImg, context)
    monster.draw();
    const redMonster = new RedMonster(allSpriteImg, context, { x: 150, y: 150 })
    redMonster.draw();

    document.documentElement.addEventListener('keydown', e => {
      let { code } = e

      hero.move(code)
    })
  }

  const resouceManager = prepare()
  resouceManager.getResource(drawHero)
})();