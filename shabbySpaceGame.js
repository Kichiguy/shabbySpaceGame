var game = new Phaser.Game(450, 550, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

function preload() {
	game.stage.backgroundColor = '#000000';
	game.load.image('ship','assets/ship.png');
	game.load.image('obstacle','obstacle.png');
}

function create() {
	cursors = game.input.keyboard.createCursorKeys();

	player = game.add.sprite(200,428,'ship');
	game.physics.arcade.enable(player);
}

function update() {

player.body.velocity.x = 0;

if(cursors.left.isDown) {
		turnLeft();
		}
	else if(cursors.right.isDown) {
		turnRight();	
	else
	{
		player.body.velocity.x = 0;
		} 
}
//Turning functions are breaking my game
function turnLeft() {
		if(player.alive==false) return;
        player.body.velocity.x = -350;
		
		var leftTurn = game.add.tween(player);
		leftTurn.to({angle: -20}, 100);
		
		leftTurn.start();
    }

function turnRight() {
		if(player.alive==false) return;
        player.body.velocity.x = 350;
		
		var rightTurn = game.add.tween(player);
		rightTurn.to({angle: 20}, 100);
		
		rightTurn.start();
    }

function straighten() {
		if(player.alive==false) return;
        player.body.velocity.x = 0;
		
		var stable = game.add.tween(player);
		stable.to({angle: 0}, 100);
		
		stable.start();
    }        