var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'astronot', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('astronot', 'images/astronot.png');
    game.load.image('bullet', 'images/bullet.png');

}

var player;
var cursors;
var bullets;
var fireButton;
var bulletTime = 100;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 100;
    //  Add a sprite
    player = game.add.sprite(114, 132, 'astronot');
    game.physics.p2.enable(player);
    player.body.bounce = .2;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.3;
    contactMaterial.restitution = 1.0;
    contactMaterial.maxAngular = 0;
    contactMaterial.stiffness = 1e7;
    contactMaterial.bounce = .3;
    contactMaterial.relaxation = 3;
    contactMaterial.frictionStiffness = 1e7;
    contactMaterial.frictionRelaxation = 3;
    contactMaterial.surfaceVelocity = 0;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {

    if (cursors.left.isDown) {
        player.body.moveLeft(100);
        player.scale.x = -1;
    } else if (cursors.right.isDown) {
        player.body.move
        player.body.moveRight(100);
        player.scale.x = 1;
    }

    if (cursors.up.isDown) {
        player.body.moveUp(50);
    }

    if( fireButton.isDown) {
        fire();
    }

}

function fire () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x+70*player.scale.x , player.y );
            bullet.body.velocity.x = 400 * player.scale.x;
            bulletTime = game.time.now + 200;
        }
    }

}