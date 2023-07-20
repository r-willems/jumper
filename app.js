//git checkout main||advanced om naar andere versie te gaan

let gameBoard = document.getElementById("gameBox");

let points = 0;
let lives = 6;
let hit = false;
let game = null;

const ctx = gameBoard.getContext("2d");
const sprite = {
    x: 220,
    y: 260,
    width: 20,
    height: 40,
    jump: 45,
    speed: 6
};

const nemesis = {
    x: 600,
    y: 275,
    width: 18,
    height: 25,
    speed: 2
};


document.addEventListener("keydown", stop=>{
    if(stop.code === "Enter" && nemesis.speed != 0)
    {
        nemesis.speed = 0;
        console.log(`Nmy: Y${nemesis.y}, X${nemesis.x}`);
    }
    else if (stop.code === "Enter" && nemesis.speed == 0)
    {
        nemesis.speed = 1;
    }
});

document.addEventListener("keyup", moveSprite);
document.addEventListener("keydown", keyD =>{
    if (keyD.code === "Space")
    {
        sprite.speed *= 2;
    }
} );

function gameLoop() 
{
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
    statusbar();
    if (lives == 0)
    {
        ctx.fillStyle = "black";
        ctx.fillText("You have died", 210, 80);
        return; 
    }
    drawSprite();
    drawNemesis();
    moveNemesis();

    checkHit();
    displayHit();

    requestAnimationFrame(gameLoop); //ChatGPT idea
}

function statusbar()
{
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`POINTS ${points}`, 50, 40);
    ctx.fillText(`LIVES ${lives}`, 450, 40);
}
function displayHit()
{
    if (hit)
    {
        ctx.fillStyle = "black";
        ctx.fillText("You got hit!", 210, 80);   
    }
}

function checkHit()
{
    if(!hit && 
        (nemesis.x - nemesis.width) <= sprite.x &&
         nemesis.x >= (sprite.x - sprite.width) &&
          (sprite.y + sprite.height) >= gameBoard.height - nemesis.height)
          {
            hit = true
          }

    else if (!hit && nemesis.x == 0)
    {
        points++;
        console.log(`POINTS: ${points}`);
        hit = false;
    }
    else if (hit && nemesis.x == 0)
    {
        lives--;
        console.log(`LIVES ${lives}`);
        hit = false;
    }

}



function drawNemesis()
{
    ctx.fillStyle = "red";
    ctx.fillRect(nemesis.x, nemesis.y, nemesis.width, nemesis.height);
}


function moveNemesis()
{
    /*function doemijdiemaar()
    {
        return Math.floor(Math.random() * 135);
    }*/
    
    nemesis.x -= nemesis.speed;
    if (nemesis.x == 0)
    {
        setTimeout( ()=>{
            nemesis.x = gameBoard.width-nemesis.width;
            //nemesis.y = doemijdiemaar();
        }, 1000); 
    } 
}

function drawSprite()
{
    
    ctx.fillStyle = "blue";
    ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);

}
function moveSprite(event)
{
    //console.log(gameBoard.width, "|", gameBoard.height);
    let jump = false;
    //Even naar kijken dat sprite door de bodem kan door tijdens jump op omlaag te drukken
    
    switch (event.code)
    {
        case "ArrowUp":
            sprite.y -= sprite.jump;
            setTimeout(() =>{
                sprite.y += sprite.jump;
                
            }, 600);
            //console.log(jump);
            if (sprite.y <= 0)
            {
                sprite.y = 0;
                break;
            }
            break;
        
        case "ArrowDown":

            sprite.y += sprite.speed;
            if (sprite.y >= (gameBoard.height - sprite.height))
            {
                sprite.y = (gameBoard.height - sprite.height);
                console.log(gameBoard.height-sprite.height);
                break;
            }
            break;

        case "ArrowLeft":
            sprite.x -= sprite.speed;
            if (sprite.x <= 0)
            {
                sprite.x = 0;
                break;
            }
            break;

        case "ArrowRight":
            sprite.x += sprite.speed;
            if (sprite.x >= (gameBoard.width - sprite.width))
            {
                sprite.x = (gameBoard.width - sprite.width);
                break;
            }
            break;

        default:
            break;
    }
    console.log(`Spr: Y${sprite.y}, X${sprite.x}`);
    
}


  
gameLoop();