/*

    Made by: MrEidam

*/

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .69;

const background = new Sprite({
    position:{
        x: 0,
        y: 0,
    },
    size:{
        width: canvas.width,
        height: canvas.height,
    },
    imgSrc: '../Assets/backgroung.png',
});

const player = new Fighter({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0,
    },
    size:{
        height: 190,
        width: 50,
    },
    offset:{
        x: 0,
        y: 0,
    },
    color: `blue`,
});

const enemy = new Fighter({
    position:{
        x: 500,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },
    size:{
        height: 190,
        width: 50,
    },
    offset:{
        x: -50,
        y: 0,
    },
    color: `red`,
});

const keys = {
    a:{
        pressed: false,
    },
    d:{
        pressed: false,
    },
    w:{
        pressed: false,
    },
    ArrowLeft:{
        pressed: false,
    },
    ArrowRight:{
        pressed: false,
    },
}

//? Collision
function rectangularCollision({ rectangle0, rectangle1}){
    return (
        rectangle0.attackBox.position.x + rectangle0.attackBox.width >= rectangle1.position.x &&
        rectangle0.attackBox.position.x <= rectangle1.position.x + rectangle1.width &&
        rectangle0.attackBox.position.y + rectangle0.attackBox.height >= rectangle1.position.y &&
        rectangle0.attackBox.position.y <= rectangle1.position.y + rectangle1.height
    )
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = "flex";
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = `Draw!`;
    }else if(player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = `Player 1  wins!`;
    }else{
        document.querySelector('#displayText').innerHTML = `Player 2 wins!`;
    }
}

let time = 60;
let timerId;
function decreaseTimer(){
    timerId = setTimeout(decreaseTimer, 1000);
    if(time > 0){
        time--;
        document.querySelector('#timer').innerHTML = time;
    }else if(time === 0){
        determineWinner({player, enemy, timerId});
    }
}
decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = `#000`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    background.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;

    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5;
    }else if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5;
    }

    // enemy movement
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5;
    }else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5;
    }

    //? COLISION
    if(rectangularCollision({
        rectangle0: player,
        rectangle1: enemy,
        }) &&
        player.isAttacking){
            player.isAttacking = false;
            enemy.health -= 20;
            document.querySelector('#Ehp').style.width = `${enemy.health}%`;
    }
    
    if(rectangularCollision({
        rectangle0: enemy,
        rectangle1: player,
        }) &&
        enemy.isAttacking){
            enemy.isAttacking = false;
            player.health -= 20;
            document.querySelector('#Php').style.width = `${player.health}%`
            console.log('ENEMY SCUM!');
    }

    //? ENDING DA GAM
    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId});
    }
}
animate();

window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            player.lastkey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastkey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;
    }

    // enemy keys
    switch(e.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastkey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastkey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
}
});

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});