var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'astronot', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('astronot', 'images/astronot.png');

}

var sprite;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 100;

    //  Add a sprite
    sprite = game.add.sprite(122, 148, 'astronot');
    game.physics.p2.enable(sprite);

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', sprite.body);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.3;
    contactMaterial.restitution = 1.0;

    contactMaterial.stiffness = 1e7;
    contactMaterial.relaxation = 3;
    contactMaterial.frictionStiffness = 1e7;
    contactMaterial.frictionRelaxation = 3;
    contactMaterial.surfaceVelocity = 0;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown) {
        sprite.body.moveLeft(200);
        sprite.scale.x = -1;
    } else if (cursors.right.isDown) {
        sprite.body.moveRight(200);
        sprite.scale.x = 1;
    }

    if (cursors.up.isDown) {
        sprite.body.moveUp(200);
    } else if (cursors.down.isDown) {
        sprite.body.moveDown(200);
    }

}