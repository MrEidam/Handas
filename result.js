function resultText(res){
    let text = document.createElement('h1');
    text.classList.add('result');
    if(res==='won'){
        text.classList.add('won');
        text.innerText = "Player 1 won!";
    }else if(res==='lost'){
        text.classList.add('lost');
        text.innerText = "Player 2 won!";
    }else if(res==='draw'){
        text.classList.add('draw');
        text.innerHTML = "Draw!";
    }
    document.body.append(text);
    setTimeout(() => {
        text.remove();
    }, 600);
};