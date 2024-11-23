class Sprite{
    constructor({position, imgSrc, frames = 1, scale = 1, speed = 1}){
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
        this.frames = frames;
        this.scale = scale;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = speed;
    }

    draw(){
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.frames)*this.scale,
            this.image.height*this.scale);
    }

    update(){
        this.draw();
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.frames - 1){
                this.framesCurrent++;
            }else{
                this.framesCurrent = 0;
            }
        }

    }
}

class Fighter{
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

        if(this.position.y + this.height + this.velocity.y >= canvas.height-50){
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
