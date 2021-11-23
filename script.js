var clicked = 0;
var started;
var canvas = document.createElement('canvas');
canvas.width = 630;
canvas.height = 420;

document.body.appendChild(canvas);
var level = 0;
var context = canvas.getContext('2d');

var game = {
    env: {
        w:630, h:420, running:true
    },
    enemy: {
        x:130, y:100, w:65, h:100, vx:0, vy:5, moving:true, imagepic:'./resources/enemy.png'
    },
    enemy2: {
        x:270, y:100, w:50, h:100, vx:0, vy:2, moving:true, imagepic:'./resources/enemy2.png'
    },
    enemy3: {
        x:350, y:100, w:70, h:100, vx:0, vy:4, moving:true, imagepic:'./resources/enemy3.png'
    },
    enemy4: {
        x:410, y:100, w:50, h:100, vx:0, vy:3, moving:true, imagepic:'./resources/enemy4.png'
    },
    player: {
        x:0,y:190, w:20, h:20, vx:5, vy:0, moving:false, imagepic:'./resources/player.png'
    },
    target: {
        x:590,y:175, w:50, h:70, vx:0, vy:0, moving:false, imagepic:'./resources/target.jpg'
    },
}

function init()
{
        clicked++;
        game.enemy.x = 150;
        game.enemy.y = 100;
        game.enemy.vx = 0;
        game.enemy.vy = 5;
        game.enemy.moving = true;
        game.enemy2.x = 250;
        game.enemy2.y = 100;
        game.enemy2.vx = 0;
        game.enemy2.vy = 2;
        game.enemy2.moving = true;
        game.enemy3.x = 350;
        game.enemy3.y = 100;
        game.enemy3.vx = 0;
        game.enemy3.vy = 4;
        game.enemy3.moving = true;
        game.enemy4.x = 410;
        game.enemy4.y = 100;
        game.enemy4.vx = 0;
        game.enemy4.vy = 3;
        game.enemy4.moving = true;
        game.player.x = 0;
        game.player.y = 190;
        game.player.vx = 5;
        game.player.moving = false;
}

function drawobj(ctx,obj)
{
    obj.image = new Image();
    obj.image.src = obj.imagepic;
    ctx.drawImage(obj.image,obj.x,obj.y,obj.w,obj.h);
}

function draw()
{
    context.clearRect(0,0,600,600);
    drawobj(context,game.enemy);
    drawobj(context,game.player);
    drawobj(context,game.target);
    if(level >= 1) 
        drawobj(context,game.enemy2);
    if(level >= 2) 
        drawobj(context,game.enemy3);
    if(level >= 3) 
        drawobj(context,game.enemy4);
}

function updateobj(obj)
{
    // console.log(obj.vy);
    if(obj.moving){
        obj.x += obj.vx;
        obj.y += obj.vy;
        if(obj.y+obj.h>game.env.h || obj.y<0)
            obj.vy *= -1;
        if(obj.x+obj.w>game.env.w || obj.x<0)
            obj.vx *= -1;
    }
}

function update()
{

    updateobj(game.enemy);
    updateobj(game.player);
    updateobj(game.target);
    if(level >= 1) 
        updateobj(game.enemy2);
    if(level >= 2) 
        updateobj(game.enemy3);
    if(level >= 3) 
        updateobj(game.enemy4);
    if(iscolliding(game.enemy,game.player))
    {
        game.env.running = false;
        alert("Game Over, Retry!");
    }
    if(iscolliding(game.enemy2,game.player))
    {
        game.env.running = false;
        alert("Game Over, Retry!");
    }
    if(iscolliding(game.enemy3,game.player))
    {
        game.env.running = false;
        alert("Game Over, Retry!");
    }
    if(iscolliding(game.enemy4,game.player))
    {
        game.env.running = false;
        alert("Game Over, Retry!");
    }
    if(iscolliding(game.target,game.player))
    {
        game.env.running = false;
        alert("You Won! Next Level");
        level++;
        init();
        game.env.running = true;
    }
}

function iscolliding(obj1,obj2)
{
    var case1 = false, case2 = false;
    var distx = Math.abs((obj1.x + obj1.w/2) - (obj2.x + obj2.w/2));
    var disty = Math.abs((obj1.y + obj1.h/2) - (obj2.y + obj2.h/2));
    if(distx < (obj1.w/2 + obj2.w/2)) 
        case1 = true;
    if(disty < (obj1.w/2 + obj2.w/2)) 
        case2 = true;
    return case1 && case2;
}

function render()
{
    started = true;
    draw();
    update();
    canvas.addEventListener("mousedown",function(){
        game.player.moving = true
    });
    canvas.addEventListener("mouseup",function(){
        game.player.moving = false
    });
    if(game.env.running)
        window.requestAnimationFrame(render);
}

render();