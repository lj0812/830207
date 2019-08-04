(function () {
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

    const hero = {
      img: heroImg,
      context,
      imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},
			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},
      draw
    }

    const monster = {
			img: allSpriteImg,
			cont,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},
			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},
			draw
		};

		hero.draw();
		monster.draw();
  }

  const resouceManager = prepare()
  resouceManager.getResource(drawHero)
})();