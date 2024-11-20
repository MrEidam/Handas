class Sprite{
    constructor({position, size, imgSrc}){
        this.position = position;
        this.width = size.width;
        this.height = size.height;
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update(){
        this.draw();
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
