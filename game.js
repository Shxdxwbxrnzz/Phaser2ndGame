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
var score = 0;
var scoreText;
var worldWidth = 9600;
var worldHeight = 1080;




function preload() {
    //Додаємо клавіші керування
    cursors = this.input.keyboard.createCursorKeys();
    //Завантажуємо спрайти
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('result', 'assets/result.png');
    this.load.image('fon', 'assets/fon.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dirt', 'assets/dirt.png');
    this.load.image('platform2', 'assets/platform2.png');
    this.load.image('bush1', 'assets/bush1.png');
    this.load.image('bush2', 'assets/bush2.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('rock', 'assets/rock.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
//Додаємо спрайти до сцени
function create() {

    //Додаємо фон
    this.add.tileSprite(0, -720, worldWidth, worldHeight, 'sky').setScale(2).setOrigin(0,0);
    this.mode = 1; 
    this.directSpeed = 4.5;

    //Кущі
    bush1 = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(200,400))) {
        bush1.create(x, 950, 'bush1').setScale(0.2).setOrigin(0, 1).refreshBody();
    };

    //Дерева
    tree = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(500, 1000))) {
        tree.create(x, 930, 'tree').setScale(0.15).setOrigin(0, 1).refreshBody();
    };

    //Каміння
    rock = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + (Phaser.Math.Between(400,800))) {
        bush1.create(x, 940, 'rock').setScale(0.15).setOrigin(0, 1).refreshBody();
    };

    //Земля
    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + 120) {
        console.log(x)
       platforms.create(x, 930, 'ground').setScale(0.2).setOrigin(0, 0).refreshBody();
    };

    //Земля
    dirt = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + 500) {
        console.log(x)
       dirt.create(x, 950, 'dirt').setScale(1.8).setOrigin(0, 0).refreshBody();
    }
 
    //Гравець
    player = this.physics.add.sprite(50, 150, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(400);


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

    //Додаємо коллізію гравцю та об'єктам
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, dirt);
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);


    //Додаємо надпис рекорду
    scoreText = this.add.text(16, 16, 'Level: 0', { fontSize: '32px', fill: '#000' });


    stars = this.physics.add.group({
        key: 'star',

        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }

    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.1, 0.1);
    });

    this.cameras.main.setBounds(0, 0, 10000, 1080);
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
    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.add.image(400, 300, 'result').setScale(0.5);

    gameOver = true;
}
//Функція збору зірок
function collectStar(player, star) {
    star.disableBody(true, true);
    if (stars.countActive(true) === 0) {
        score += 1;
        scoreText.setText('Level: ' + score);
    }


    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);



    }

}