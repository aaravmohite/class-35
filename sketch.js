var ball;
var ball1,position,database

function setup(){
    //adding the database in var
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

        //refering the database for ball position
    ball1=database.ref("ball/position")
      //reading the data value from the database
    ball1.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//writing the position of x and y in database
function writePosition(x,y){
    database.ref("ball/position").set({
        'x':position.x+x,
        'y':position.y+y
    })
}

//reading the realtime position of the ball in database and assigning ball sprite
function readPosition(data){
    position=data.val()
    ball.x=position.x
    ball.y=position.y
}

//displaying error message if something goes wrong
function showError(){
    console.log("error in writing the values in the database")
}
