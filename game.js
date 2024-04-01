//Створюємо сцену
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

var player;
var score = 0;
var scoreText;
var worldWidth = config.width * 5;
var worldHeight = 1080;
var Lives = 3;


function preload() {
    //Додаємо клавіші керування
    cursors = this.input.keyboard.createCursorKeys();
    //Завантажуємо спрайти
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('result', 'assets/result.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dirt', 'assets/dirt.png');
    this.load.image('platform2', 'assets/platform2.png');
    this.load.image('bush1', 'assets/bush1.png');
    this.load.image('bush2', 'assets/bush2.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('rock', 'assets/rock.png');
    this.load.image('block1', 'assets/block1.png');
    this.load.image('block2', 'assets/block2.png');
    this.load.image('block3', 'assets/block3.png');
    this.load.image('cloud1', 'assets/cloud1.png');
    this.load.image('cloud2', 'assets/cloud2.png');
    this.load.image('hearta', 'assets/hearta.png');
    this.load.image('heartb', 'assets/heartb.png');
    this.load.image('enemy', 'assets/enemy.png');


    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}


function create() {

    //Додаємо фон
    this.add.tileSprite(0, 0, 11000, worldHeight, 'sky')
       .setScale(1)
       .setOrigin(0,0)
       .setDepth(0);
    this.mode = 1; 
    this.directSpeed = 4.5;
    
    //Кущі
    bush1 = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(200,400))) {
        bush1.create(x, 950, 'bush1')
           .setScale(0.2)
           .setOrigin(0, 1)
           .refreshBody()
           .setDepth((Phaser.Math.Between(1,2)));
    };

    //Хмари 
    cloud = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(200,400))) {
        cloud.create(x, (Phaser.Math.Between(300,550)), 'cloud1')
           .setScale(0.2)
           .setOrigin(0, 1)
           .refreshBody()
           .setDepth(1);
    };

    //Дерева
    tree = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(500, 1000))) {
        tree.create(x, 930, 'tree')
           .setScale(0.15)
           .setOrigin(0, 1)
           .refreshBody()
           .setDepth((Phaser.Math.Between(1,2)));
    };

    //Каміння
    rock = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(400,800))) {
        bush1.create(x, 940, 'rock')
           .setScale(0.15)
           .setOrigin(0, 1)
           .refreshBody()
           .setDepth((Phaser.Math.Between(1,2)));
    };

    //Земля і трава
    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < 11000; x = x + 120) {
        console.log(x)
       platforms.create(x, 930, 'ground')
          .setScale(0.2)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);
    };

    //Земля нижче трави
    dirt = this.physics.add.staticGroup();
    for (var x = 0; x < 11000; x = x + 500) {
        console.log(x)
       dirt.create(x, 950, 'dirt')
          .setScale(1.8)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(2);
    };
 
    //Гравець
    player = this.physics.add.sprite(50, 150, 'dude');
    player.setBounce(0);
    player.setDepth(5);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(200);

     //Ворог
       enemy = this.physics.add.sprite(500, 600, 'enemy');
       enemy.setBounce(0);
       enemy.setDepth(5);
       enemy.setScale(0.1);
       enemy.setCollideWorldBounds(false);
       enemy.body.setGravityY(200);

    //Випадкова генерація платформ
    platforms.create(550, 800, 'platform2')
    .setScale(0.3)
    .setOrigin(0, 0)
    .refreshBody()
    .setDepth(3);
    var x = 400;
    var x2 = 600;
    var yd = 800;
    stars = this.physics.add.staticGroup();
    blocks = this.physics.add.staticGroup();
        while (x < worldWidth) {
        var yt = Phaser.Math.Between(500, 600);
        x += Phaser.Math.Between(500, 600); // Додаємо випадкову відстань до x для наступної платформи
        x2 += Phaser.Math.Between(500, 600);
        blocks.create(x, yt, 'block1')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);

        stars.create(x + 120, yt - 40, 'star')
          .setScale(0.08)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);
    
            var i;
            for (i = 1; i <= Phaser.Math.Between(1, 5); i++) {
        blocks.create(x + 50 * i, yt, 'block2')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);
            }

        blocks.create(x + 65 * i, yt, 'block3')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);


        blocks.create(x2, yd, 'block1')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);

        var f;
          for (f = 1; f <= Phaser.Math.Between(1, 5); f++) {
        blocks.create(x2 + 50 * f, yd, 'block2')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);
          }

        blocks.create(x2 + 65 * f, yd, 'block3')
          .setScale(0.3)
          .setOrigin(0, 0)
          .refreshBody()
          .setDepth(3);
    };


    //Зірки
    for (var x = 800; x < worldWidth; x = x + (Phaser.Math.Between(500, 1000))) {
        stars.create(x, 890, 'star')
           .setScale(0.08)
           .setOrigin(0, 1)
           .refreshBody()
           .setDepth(3);
    };

    //Створення анімації
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Надпис із життями
    livesText = this.add.text(1600, 120, 'Life' + showLife(), {fontSize: '32px', fill: '#FFF'}).setScrollFactor(0);

    //Додаємо коллізію гравцю та об'єктам
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, dirt);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(enemy, player);
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, blocks);
    this.physics.add.collider(bombs, blocks);

    //Коллізія для зірок
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, blocks);
    this.physics.add.overlap(player, stars, collectStar, null, this);


    //Додаємо надпис очок
    // scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    //Поява нових зірок
    stars.children.iterate(function (child) {
        child.setScale(0.08, 0.08);
        child.setDepth(5);
    });

    //скрипт камери
    this.cameras.main.setBounds(0, 0, 15000, 1080);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(1.1);

}

function update() {
    //Додаємо керування гравцем
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-520);
    }

    //Обмежує випадання за світ
    if(player.x < 20){
        player.x = 20
    };

}

//Функція доторкання до бомб
function hitBomb(player, bomb) {
    Lives -= 1;
    bomb.disableBody(true, true);
    updateLivesDisplay();
    if(Lives <= 0) {
      GameOver = true;
      player.anims.play('turn');
      player.setTint(0xff0000);
      this.physics.pause();
      this.add.image(400, 300, 'result')
      .setScale(0.5)
      .setDepth(5)
      .setScrollFactor(0);
    };
}


//Оновлення життів
function updateLivesDisplay(){
    if (livesText) {
        livesText.setText('Life' + showLife());
    }
}
function showLife(){
    var lifeLine = ''

    for (var i = 0; i < Lives; i++) {
        lifeLine += '❤️'
    }
    return lifeLine
    }

//Функція збору зірок
function collectStar(player, star) {
    star.disableBody(true, true);
    score +=1;

    var x = (player.x - 100);

    var bomb = bombs.create(x, 16, 'bomb').setDepth(3);
    bomb.setBounce(0.8);
    bomb.setCollideWorldBounds(false);
    bomb.setVelocity(Phaser.Math.Between(100, 500), 40);

    if (stars.countActive(true) === 0) {
    }

}