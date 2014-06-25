var game = new Phaser.Game(450, 550, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

var scoreText;
var score;

function preload() {
	game.stage.backgroundColor = '#000000';
	game.load.image('ship','assets/ship.png');
	game.load.image('obstacle','assets/obstacle.png');
}

function create() {
	game.state.add('main', game);
	cursors = game.input.keyboard.createCursorKeys();

	player = game.add.sprite(200,428,'ship');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;

	obstacles = game.add.group();
    obstacles.createMultiple(30, 'obstacle');
    game.physics.arcade.enable(obstacles);
    generate = game.time.events.loop(1000, addObstacles, game);

    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff", /*textAlign: "center"*/};
    scoreText = game.add.text(20, 20, "0", style);		

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

game.physics.arcade.overlap(player, obstacles, playerDeath, null, game);

}

/*This function checks the angle of an object and adjusts it
negatively or positively to match the desired numeric value*/
function checkAngle(thing,toAngle) {
		if(thing.angle > toAngle) thing.angle -= 2;
		else if (thing.angle < toAngle) thing.angle += 2;
		else return;
    }

/*The following two function generate the obstacles that the user needs to
navigate through. They are heavily based on the Flappy Bird tutorial by
lessmilk. His blog can be found at lessmilk.com*/
function generateObstacle(hor, vert) {
    var newObstacle = obstacles.getFirstDead();
    newObstacle.reset(hor, vert);
    newObstacle.body.velocity.y = 200;
    newObstacle.checkWorldBounds = true; 
    newObstacle.outOfBoundsKill = true;
}

function addObstacles() {
    var hole = Math.floor(Math.random()*4)+1;
    
    for (var i = 0; i < 6; i++)
        if (i != hole && i != hole +1) generateObstacle(i*60+10,-50);

    score += 10;
    scoreText.setText(score);  

}

//This simply stops onscreen elements and retarts the game on death.
function playerDeath() {
		if (player.alive == false) return;
		player.alive = false;
		game.time.events.remove(generate);
		obstacles.forEachAlive(function(p){p.body.velocity.y=0;},game);
		setTimeout(function(){game.state.restart()}, 1000);
		}
		            