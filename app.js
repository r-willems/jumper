//git checkout main||advanced om naar andere versie te gaan

let gameBoard = document.getElementById("gameBox");

let nmySpd = 1;

let points = 0;
let lives = 6;
let hit = false;

let game = null;

const ctx = gameBoard.getContext("2d");
const sprite = {
    x: 50,
    y: 120,
    width: 12,
    height: 30,
    jump: 25,
    speed: 5
};

const nemesis = {
    x: 300,
    y: 135,
    width: 12,
    height: 15,
    speed: 5
};


document.addEventListener("keydown", stop=>{
    if(stop.code === "Enter" && nmySpd != 0)
    {
        nmySpd = 0;
        console.log(`Nmy: Y${nemesis.y}, X${nemesis.x}`);
    }
    else if (stop.code === "Enter" && nmySpd == 0)
    {
        nmySpd = 1;
    }
});

document.addEventListener("keyup", moveSprite);
document.addEventListener("keydown", keyD =>{
    if (keyD.code === "Space")
    {
        sprite.speed *= 2;
    }
} );




function checkHit()
{
    if(!hit && (nemesis.x-12) <= sprite.x && nemesis.x >= (sprite.x-12) && (sprite.y+30) >= 150 - nemesis.height)
    {
       console.log("BOOM!");
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
    nemesis.x -= nmySpd;
    

    if (nemesis.x == 0)
    {
        setTimeout( ()=>{
            nemesis.x = 312;
        }, 1000);
        
    } 

}

function drawSprite()
{
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
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
            if (sprite.y >= 120)
            {
                sprite.y = 120;
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
            if (sprite.x >= 288)
            {
                sprite.x = 288;
                break;
            }
            break;

        default:
            break;
    }
    console.log(`Spr: Y${sprite.y}, X${sprite.x}`);
    
}

function gameLoop() 
{
    drawSprite();
    drawNemesis();
    moveNemesis();

    checkHit();


    requestAnimationFrame(gameLoop);
}
  
gameLoop();