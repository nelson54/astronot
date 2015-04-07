var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {
    map = game.load.tilemap('map', 'js/tile_collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('astronot', 'images/astronot.png');
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ground_1x1', 'images/ground_1x1.png');
    game.load.image('coin', 'images/coin.png');

}

var map;
var player;
var cursors;
var bullets;
var fireButton;
var bulletTime = 100;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 100;
/*    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.3;
    contactMaterial.restitution = 1.0;
    contactMaterial.stiffness = 1e7;
    contactMaterial.bounce = .3;
    contactMaterial.relaxation = 3;
    contactMaterial.frictionStiffness = 1e7;
    contactMaterial.frictionRelaxation = 3;
    contactMaterial.surfaceVelocity = 0;*/

    map = game.add.tilemap('map');
    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('coin');

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    map.setCollisionBetween(1, 12);

    game.physics.p2.convertTilemap(map, layer);


    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    player = game.add.sprite(114, 132, 'astronot');
    player.scale = {x: 0.5, y: 0.5};
    game.physics.p2.enable(player);
    player.body.bounce = .2;
    player.body.data.fixedRotation = true;
    game.camera.follow(player);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
}

function update() {

    if (cursors.left.isDown) {
        player.body.moveLeft(100);
        player.scale.x = -Math.abs(player.scale.x);
    } else if (cursors.right.isDown) {
        player.body.moveRight(100);
        player.scale.x = Math.abs(player.scale.x);
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