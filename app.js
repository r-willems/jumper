//git checkout main||advanced om naar andere versie te gaan

let container = document.getElementById("gameBox");

let block = document.getElementById("block");

let loop = false;

let spriteBt;
let spriteLt;
let spriteRt;

let blockLt;
let blockRt;

let statPts = document.getElementsByClassName("points");
let statLvs = document.getElementsByClassName("lives");
let points = 0;
let lives = 6;

let game = null;

const ctx = container.getContext("2d");
const sprite = {
    x: 50,
    y: 120,
    width: 12,
    height: 30,
    jump: 25,
    speed: 5
};

const nemesis = {
    x: 288,
    y: 135,
    width: 12,
    height: 15,
    speed: 5
};

//drawSprite();

document.addEventListener("keyup", moveSprite);
document.addEventListener("keydown", keyD =>{
    if (keyD.code === "Space")
    {
        sprite.speed *= 2;
    }
} );



function drawSprites()
{
    ctx.clearRect(0, 0, container.width, container.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);

    
}

function drawNemesis()
{
    ctx.fillStyle = "red";
    ctx.fillRect(nemesis.x, nemesis.y, nemesis.width, nemesis.height);
}


function moveNemesis()
{
    setInterval( ()=>{

        nemesis.x--;
    }, 2000);
    drawNemesis();

}



function moveSprite(event)
{
    //console.log(container.width, "|", container.height);
    
    switch (event.code)
    {
        case "ArrowUp":
            sprite.y -= sprite.jump;
            setTimeout(() =>{
                sprite.y += sprite.jump;
            }, 600);
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
    console.log(sprite);

    
}

function gameLoop() {
    drawSprites();
    drawNemesis();

    moveNemesis();


    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();