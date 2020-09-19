//console.log('reading');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var points = [];
function rectpoints (start_x, start_z,length,width){
    rectPoints = [];
    rectPoints[0]={x:start_x,y:1000,z:start_z};
    rectPoints[1]={x:start_x +length,y:1000,z:start_z};
    rectPoints[2]={x:start_x +length,y:1000,z:start_z-width};
    rectPoints[3]={x:start_x,y:1000,z:start_z-width};
    return rectPoints;
}

var rectPoints_1 = rectpoints(200,400,300,200);
var rectPoints_2 = rectpoints(200,450,300,300);
var rectPoints_3 = rectpoints(200,500,300,400);

console.log(rectPoints_1);
var scPoints = 20;

function region(radius,scPoints,rectPoints){
    points.push(rectPoints[0]);
    points.push(rectPoints[1]);
for (let i = 1;i < scPoints+1;i++)
{
    temp = {x:rectPoints[1].x +radius*Math.cos(-0.5*Math.PI+(Math.PI*i/scPoints)),y:1000,z:rectPoints[1].z-radius+radius*Math.sin(0.5*Math.PI+(Math.PI*i/scPoints))}
    points.push(temp);
}
for (let i = 0;i < scPoints+1;i++)
{
    temp = {x:rectPoints[3].x +radius*Math.cos(0.5*Math.PI+(Math.PI*i/scPoints)),y:1000,z:rectPoints[3].z+radius+radius*Math.sin(-0.5*Math.PI+(Math.PI*i/scPoints))}
    points.push(temp);
}
points.push(rectPoints[0]);
return points;
}

var colorArray =[
    '#ffab33',
    '#99ffbaa',
    '#00ff10',
    '#4411aa',
    '#ff1100',
];

function Circle(x, y, v, radius, R_t){
    this.x = x;
    this.y = y;
    this.v = v;
    this.radius = radius;
    this.R_t = R_t;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.count = -1;

    this.draw = function() {
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        
    }
    this.update = function() {
        if(this.x < 200)
        {
            if(this.y > 300)
            {
            dx = -this.v*Math.cos(Math.atan((200-this.x)/(300-this.y)));
            dy = this.v*Math.sin(Math.atan((200-this.x)/(300-this.y)));
            temp = Math.acos((this.y - 300)/(this.R_t+this.radius));
           
            }
            else
            {
            dx = this.v*Math.cos(Math.atan((200-this.x)/(-300+this.y)));
            dy = this.v*Math.sin(Math.atan((200-this.x)/(-300+this.y)));
            }


        }
        if(this.x >= 200 && this.x < 500 && this.y < 350)
        {
            dx=v;
            dy=0
        }
        if (this.x > 500)
        {
            if(this.y > 300)
            {
            dx = -this.v*Math.cos(Math.atan((500-this.x)/(300-this.y)));
            dy = this.v*Math.sin(Math.atan((500-this.x)/(300-this.y)));
            temp = Math.acos((this.y - 300)/(this.R_t+this.radius));
            
            }
            else
            {
            dx = this.v*Math.cos(Math.atan((500-this.x)/(-300+this.y)));
            dy = this.v*Math.sin(Math.atan((500-this.x)/(-300+this.y)));
            }
        }
        if (this.x >=200 && this.x < 500 && this.y > 350)
        {
            dx=-v;
            dy=0;
        }
        this.x+=dx;
        this.y+=dy;
        if (this.x < 200){
            temp = Math.atan((this.y-300)/(this.x-200));
            this.x = 200 -(this.R_t+this.radius) * Math.cos(temp);
            this.y = 300 -(this.R_t+this.radius) * Math.sin(temp);
        }

        if (this.x > 500){
            temp = Math.atan((this.y-300)/(this.x-500));
            this.x = 500 + (this.R_t+this.radius) * Math.cos(temp);
            this.y = 300 + (this.R_t+this.radius) * Math.sin(temp);
            
        }
        if(this.x > (200+8) &&  this.x < 220)
        {
            this.count++;
        }
    
    }

}

var circle_1 = new Circle(225,425,6,25,100);
var circle_2 = new Circle(225,475,11.009,25,150);

points_2 = region(150,100,rectPoints_2);
    c.beginPath();
    
    points_2.forEach(p => {
        c.lineTo(p.x,p.z);
        });
    c.strokeStyle ='black';
    c.stroke();
    
running = true;
circle_1.draw();
    circle_2.draw();


function animate() {
    if (running) {
        c.clearRect(0,0,innerWidth,innerHeight);
      points_1 = region(100,100,rectPoints_1);
    
    points_3 = region(200,100,rectPoints_3);
    c.beginPath();
    
    points_3.forEach(p => {
        c.lineTo(p.x,p.z);
        });
    c.strokeStyle ='black';
    c.stroke();
    
    c.beginPath();
    c.rect(200, 200, 300, 200);
    c.fillStyle = 'rgba(255,255,30,1)';
    c.fill();
    
    c.beginPath();
    c.arc(500,300,100,0.5*-Math.PI,0.5*Math.PI);
    c.fillStyle = 'rgba(255,255,30,1)';
    c.fill();
    
    c.beginPath();
    c.arc(200,300,100,0.5*Math.PI,-0.5*Math.PI);
    c.fillStyle = 'rgba(255,255,30,1)';
    c.fill();
    
    circle_1.update();
    circle_2.update();    
    circle_1.draw();
    circle_2.draw();
    console.log(Math.floor(circle_1.count/3));
    
    if (Math.floor(circle_1.count/3) == 2)
    {
        c.strokeText('80sec',200,600,200);
    }

    if (Math.floor(circle_2.count/3) == 1)
    {
        c.strokeText('40sec',400,600,200);
    }

    if (Math.floor(circle_1.count/3) == 3)
    {
        running = false;
        c.strokeText('120sec',600,600,200);
    }
    }

    requestAnimationFrame(animate);
    
}

var mouse ={
    x:undefined,
    y:undefined
}

window.addEventListener('click',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    if (mouse.x**2+mouse.y**2 < 2664){
        var circle_1 = new Circle(225,425,6,25,100);
        var circle_2 = new Circle(225,475,11.009,25,150);
        animate();
        running = true;
        
    }
});



/*
/*
rectPoints.push(rectPoints[0]);
rectPoints.forEach(p => {
    var z = 300/(300+p.z);
    ctx.lineTo(p.x*z.p.y*z);
});
ctx.stroke();
*/


//c.beginPath();

/*function render(ctx) {
    var dx = 0, dy = 0;
    ctx.save();

    // change projection to isometric view
    ctx.translate(view.x, view.y);
    ctx.scale(1, 0.5);
    ctx.rotate(45 * Math.PI /180);

    for (var y = 0; i < 10; y++) {
        for (var x = 0; x < 10; x++) {
            ctx.strokeRect(dx, dy, 40, 40);
            dx += 40;
        }
        dx = 0;
        dy += 40;
    }

    //ctx.restore(); // back to orthogonal projection

    // Now, figure out which tile is under the mouse cursor... :)
}
render(c);
*/

//console.log(canvas);

