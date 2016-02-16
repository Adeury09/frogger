// Enemies our player must avoid
var x_aumento = 101;
var y_aumento = 101;

function parametrosRandom(minimo, maximo){
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.ancho = 50;
    this.alto = 80;
    this.velocidadEnemigos = Math.random() * 5;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.colision = function(dt){
    return (this.x < dt.x + dt.ancho  && this.x + this.ancho  > dt.x &&
      this.y < dt.y + dt.alto && this.y + this.alto > dt.y); 
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (x_aumento * dt * this.velocidadEnemigos);   
    if(this.x > 480){
        var posicion = [60 , 150 , 230];
        this.velocidadEnemigos = Math.random() * 5;
        this.x = 0;
        this.y = posicion[parametrosRandom(0,5)];

    }
    if(this.colision(player)){
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(){
    
    var personaje = prompt("Que personaje desea?:\nboy\ncat-girl\nhorn-girl\npink-girl\nprincess-girl\n").toLowerCase();
    switch(personaje){
        case "boy":
            var nam = 'images/char-boy.png';
            break;
        case "cat-girl":
            var nam = 'images/char-cat-girl.png';
            break;
        case "horn-girl":
            var nam = 'images/char-horn-girl.png';
            break;
        case "pink-girl":
            var nam = 'images/char-pink-girl.png';
            break;
        case "princess-girl":
            var nam = 'images/char-princess-girl.png';
            break;
            
            
        default:
            alert("Ese no esta, tenga al boy por default");
            var nam = 'images/char-boy.png';
    } 
    
    Enemy.call(this);
    this.sprite = nam;
    this.x = 202;
    this.y = 424;
    
     

};
Player.prototype = Object.create(Enemy.prototype);



Player.prototype.reset = function(){
    this.x = 202;
    this.y = 424;
};


Player.prototype.update = function(dt) {
    if(player.y < 20){
        player.reset();
    }
    console.log('player x = ', this.x, 'player y = ', this.y);    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(direction){
    console.log("Handle input");
    switch(direction){
    case 'left':
    if(this.x > 0){
        this.x -= x_aumento;
    }
    break;
    case 'up':
    this.y -= y_aumento;
    break;
    case 'right':
    if(this.x < 404){
        this.x += x_aumento;    
    }    
    break;
    case 'down':
    if(this.y < 424){
        this.y += y_aumento;
    }
    break;    

    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 1 ; i <= 3 ; i++){
    var enemy = new Enemy();
    allEnemies[i]=new Enemy();
    allEnemies.push(enemy);
    
}
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
