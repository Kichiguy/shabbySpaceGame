var game = new Phaser.Game(450, 550, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

function preload() {
	game.stage.backgroundColor = '#000000';
	game.load.image('ship','assets/ship.png');
	game.load.image('obstacle','assets/obstacle.png');
}

function create() {
	cursors = game.input.keyboard.createCursorKeys();

	player = game.add.sprite(200,428,'ship');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;

	obstacles = game.add.group();
    obstacles.createMultiple(20, 'obstacle');
    game.physics.arcade.enable(obstacles);
    generate = game.time.events.loop(1500, addObstacles, game);
}

function update() {

player.body.velocity.x = 0;

if (cursors.left.isDown) {
	checkAngle(player, -10);
	player.body.velocity.x = -350;		
	}
else if (cursors.right.isDown) {
	checkAngle(player, 10);
	player.body.velocity.x = 350;
	}	
else {
	checkAngle(player, 0);
	player.body.velocity.x = 0;
	} 
}

/*This function checks the angle of an object and adjusts it
negatively or positively to match the desired numeric value*/
function checkAngle(thing,toAngle) {
		if(thing.angle > toAngle) thing.angle -= 2;
		else if (thing.angle < toAngle) thing.angle += 2;
		else return;
    }

function generateObstacle(hor, vert) {
    var newObstacle = obstacles.getFirstDead();
    newObstacle.reset(hor, vert);
    newObstacle.body.velocity.y = 200; 
    newObstacle.outOfBoundsKill = true;
}

function addObstacles() {
    // var hole = Math.floor(Math.random()*5)+1;
    
    // for (var i = 0; i < 6; i++)
    //     if (i != hole && i != hole +1) generateObstacle(i*60+10,-400);
    generateObstacle(50,50);
}            