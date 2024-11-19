//TODO https://www.youtube.com/watch?v=vyqbNFMDRGQ&t=4060s

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .69;

class Sprite{
    constructor({position, velocity, size, color, offset}){
        this.position = position;
        this.velocity = velocity;
        this.height = size.height;
        this.width = size.width;
        this.lastkey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        //- Attack
        if(this.isAttacking){
            ctx.fillStyle = `#ff0`;
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }else{
            this.velocity.y += gravity;
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

const player = new Sprite({
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

const enemy = new Sprite({
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

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = `#000`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
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