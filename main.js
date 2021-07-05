status="";
status_no="";          
img="";
objects=[];

function preload()
{
alarm=loadSound("alarm.mp3");
}

function setup()
{
    canvas=createCanvas(480,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    objectDetection=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Dectecting Objects";
}

function modelLoaded()
{
    console.log('Model has loaded!');
    status=true;
}

function getResult(error,result)
{
    if (error)
    {
        console.log(error)

    }

    else
    {
        console.log(result);
        objects=result;
    }
}

function draw()
{
image(video,0,0,480,400)
objectDetection.detect(video,getResult);
if (status!="")
{
for (i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="Status: Detected Objects";
fill('black');
document.getElementById("no_obj").innerHTML="No.of Objects detected: "+objects.length;
textSize(20);
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
stroke(random(255),random(255),random(255));
strokeWeight(2);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if (objects[i].label!='person')
{
alarm.play();
}

else 
{
    alarm.stop();
}
}
}
}


