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