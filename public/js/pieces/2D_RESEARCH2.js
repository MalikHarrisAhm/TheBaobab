//TODO: with simple circle blur straight forward.

var particles = [];
var n = 4000;//number of particle
var noiseScale = 100;//noise scale;

function setup() {
 
  createCanvas(500, 500);
  background(109,77,52, 20);
  noiseDetail(0, 0);
  console.log(pixelDensity());
  
  a2LocationX = random(height);
  a2LocationY = random(width);
  //initialize particle
  for(var i=0; i<n; i++){
    var particle = new Object();
    particle.pos = createVector(random(width), random(height));
    particles.push(particle);//add particle to particle list
  }

}


//get gradient vector
function curl(x, y){
  var EPSILON = 0.001;//sampling interval
  //Find rate of change in X direction
  var n1 = noise(x + EPSILON + 10000, y);
  var n2 = noise(x - EPSILON + 10000, y);
  //Average to find approximate derivative
  var cx = (n1 - n2)/(2 * EPSILON);

  //Find rate of change in Y direction
  n1 = noise(x, y + EPSILON);
  n2 = noise(x, y - EPSILON);

  //Average to find approximate derivative
  var cy = (n1 - n2)/(2 * EPSILON);
  
  //return new createVector(cx, cy);//gradient toward higher position
  return new createVector(cy, -cx);//rotate 90deg
}

function draw() {
  strokeWeight(1);//particle size

  for(var i=0; i<particles.length; i++){
    stroke(0, 100);
    var p = particles[i];//pick a particle
    
    let xBorderR = random(450,470)
    let xBorderL = random(30,50)
    let yBorderT = random(450,470)
    let yBorderB = random(30,50)


    let n = noise(p.pos.x * noiseScale, p.pos.y * noiseScale);
    let a = (TAU *  TAU*  TAU*  TAU*  TAU*  TAU);
    let a2 = atan2(a2LocationY/2-p.pos.y, a2LocationX/2-p.pos.x)
    
    if(closeAngle(a, a2)){
      if (inRadius(a2LocationY, a2LocationX, p.pos)) {
        if (p.pos.x < xBorderR && p.pos.x > xBorderL && p.pos.y < yBorderT && p.pos.y > yBorderB) {
          p.pos.add(curl(cos(a2-HALF_PI), sin(a2-HALF_PI)));
          p.pos.x += cos(a2-HALF_PI);
          p.pos.y += sin(a2-HALF_PI);
            stroke(0, 100);
            point(p.pos.x, p.pos.y);
        } 
      } else {
        p.pos.add(curl(p.pos.x/noiseScale, p.pos.y/noiseScale));
        p.pos.x += cos(a2-HALF_PI);
        p.pos.y += sin(a2-HALF_PI);
        point(p.pos.x, p.pos.y);
      }
    }
  }

  
}




function onScreen(v) {
  return v.pos.x >= 0 && v.pos.x <= width && v.pos.y >= 0 && v.pos.y <= height;
}

  function closeAngle(a, a2) {
    return ((sin(a) - sin(a2-HALF_PI)  <= PI/2) && (cos(a) - cos(a2-HALF_PI) <= PI/2) );
  }
  
  function inRadius(locationY, locationX, v) {
    return (locationY - v.y)*(locationY - v.y) + (locationX - v.x)*(locationX - v.x) <= 40000;
  }
