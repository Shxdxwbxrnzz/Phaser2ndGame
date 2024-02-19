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


function preload() {
    //Додаємо клавіші керування
    cursors = this.input.keyboard.createCursorKeys();
//Завантажуємо спрайти
this.load.image('sky', 'assets/sky.png');
this.load.image('ground', 'assets/platform.png');
this.load.image('star', 'assets/star.png');
this.load.image('result', 'assets/result.png');
this.load.image('bomb', 'assets/bomb.png');
this.load.spritesheet('dude',
    'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
);
}
//Додаємо спрайти до сцени
function create() {
    //Платформи
this.add.image(950, 550, 'sky').setScale(1.1).setScrollFactor(1);
this.mode = 1; // 0 = direct, 1 = physics
this.directSpeed = 4.5;

platforms = this.physics.add.staticGroup();
platforms.create(50, 300, 'ground').setScale(0.2).refreshBody();
platforms.create(150, 300, 'ground').setScale(0.2).refreshBody();
platforms.create(2000, 300, 'ground').setScale(0.2).refreshBody();
platforms.create(2800, 300, 'ground').setScale(0.2).refreshBody();

//Гравець
player = this.physics.add.sprite(100, 150, 'dude');



player.setBounce(0.2);
player.setCollideWorldBounds(true);
player.body.setGravityY(300);



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
this.physics.add.collider(player, platforms);
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

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
    child.setScale(0.1,0.1);
    });

   
    this.cameras.main.startFollow(this.player, true);
    //this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);






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
}