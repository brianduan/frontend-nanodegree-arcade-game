//Create variables
var tileWidth = 101;
var tileHeight = 83;
var canvasWidth = 505;
var canvasHeight = 606;
var picWdith = 101;
var picHeight = 171;
var collisionFlag = 0;

//Create helper function for score tally
var scorePlus = function (){
    var score = Number(document.querySelector('.score-number').innerHTML);
    score++;
    document.querySelector('.score-number').innerHTML=score;
}

var scoreReset = function (){
    document.querySelector('.score-number').innerHTML=0;
}

// Create Enemies class
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -tileWidth;
    //generate random y-coordinates and speed
    this.y = (Math.floor(Math.random() * 3)+1)*tileHeight-10;
    this.speed = (Math.floor(Math.random() * 3)+1)*tileWidth;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    var xDiff = Math.abs(this.x - player.x);
    var yDiff = Math.abs(this.y - player.y);
    if ((xDiff< tileWidth*0.7) && (yDiff < tileHeight*0.7)){
        //collision occurs
        collisionFlag = 1;
        this.x = -tileWidth;
        this.y = (Math.floor(Math.random() * 3)+1)*tileHeight-10;
    }

    //run off the canvas 
    if (this.x > canvasWidth){
        this.x = -tileWidth;
        this.y = (Math.floor(Math.random() * 3)+1)*tileHeight-10;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/char-boy.png';
    this.xInital = tileWidth*2;
    this.yInitial = 606-110-101+15;
    this.x = this.xInital;
    this.y = this.yInitial;
    this.speedX = tileWidth;
    this.speedY = tileHeight;
};


Player.prototype.update = function(dt) {
    if (collisionFlag == 1){
        //collision occurs
        this.x = this.xInital;
        this.y = this.yInitial;
        scoreReset();
    }
    collisionFlag = 0;

    //reach the water
    if (this.y < 0){
        this.x = this.xInital;
        this.y = this.yInitial;
        scorePlus();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if ((direction == 'left')&&(this.x>0)){
        this.x -= this.speedX;
    }
    if ((direction == 'right')&&(this.x<404)){
        this.x += this.speedX;
    }
    if ((direction == 'up')&&(this.y>0)){
        this.y -= this.speedY;
    }
    if ((direction == 'down')&&(this.y<350)){
        this.y += this.speedY;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});