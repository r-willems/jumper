
let container = document.getElementById("gameBox");
let sprite = document.getElementById("sprite");
let block = document.getElementById("block");

let spriteBt;
let spriteLt;
let spriteRt;

let blockLt;
let blockRt;

let info = document.getElementById("statBar");
let points = 0;

let game = null;

function main()
{

    keyEvents();
    gameF();

}

function gameF()
{
    if (!game)
    {
        game = setInterval(checkHit, 10);
    }
    else
    {
        clearInterval(game);
        game = null;
    }
}

function setScore()
{
    gameF();

    points++;
    info.innerHTML = `POINTS: ${points}`;
    
    gameF();
}


function checkHit () {
    spriteBt = parseInt(window.getComputedStyle(sprite).getPropertyValue("bottom"));
    spriteLt = parseInt(window.getComputedStyle(sprite).getPropertyValue("left"));
    spriteRt = (parseInt(window.getComputedStyle(sprite).getPropertyValue("left")))+20;

    blockLt = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    blockRt = (parseInt(window.getComputedStyle(block).getPropertyValue("left")))+20;
    


    if (spriteBt < 20 && blockLt <= spriteRt && blockRt >= spriteLt)
    {
        info.innerHTML = "You lose!";
        //stop game;
        return;
        
    }
    else if (blockRt <= 1)
    {   
        setScore();
        return;
    }

  
}

function keyEvents()
{
    document.addEventListener("keyup",  (event) =>{

        let jump = 100, move = 20;
        let leftPs = parseInt(window.getComputedStyle(sprite).getPropertyValue("left"));
        //let rightPs = parseInt(window.getComputedStyle(sprite).getPropertyValue("right"));

        switch (event.code)
        {
            case "ArrowUp":

                sprite.style.top = (jump + "px");
                setTimeout(() => {
                    sprite.style.top = "150px"
                }, 600)
                break;

            case "ArrowLeft":
                sprite.style.left = (leftPs-move + "px");
                break;

            case "ArrowRight":
                sprite.style.left = (leftPs+move + "px");
                break;


            default:
                break;
    
        }
        
    });
        
    
    document.addEventListener("keypress",  (event) =>{
        if (event.code === "Enter")
        {
            
            // https://css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties/
            
    
            const running = block.style.animationPlayState || 'running';
            block.style.animationPlayState = running === 'running' ? 'paused' : 'running';

            console.log(`
            spriteLeft ${spriteLt}
            spriteRight ${spriteRt}
            blockLeft ${blockLt}
            blockRight ${blockRt}
            `);
        }
        
    });

    
    //block.style.animationPlayState = "paused";
    

}



main();




