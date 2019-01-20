const  widthValue = .7 - .02;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthFactor = 1.35;
const borderWidth = 8;

//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

//Creates the map image
let mapImage = new Image();
mapImage.src = "./LMUMap.png";

//Draws the map image with correct dimensions
smallerDimension = canvas.width < canvas.height ? canvas.width: canvas.height;
ctx.drawImage(mapImage, canvas.width / 2 - smallerDimension * widthFactor / 2,
        canvas.height / 2 - smallerDimension / 2, smallerDimension * widthFactor, smallerDimension);

//Creates the graph
let classpath = new Graph();

//Creates the buildings array
let buildings = [];
buildings.push(new Building("seaver", 47.6, 39.2));
buildings.push(new Building("lsb", 10, 90));

//Makes each building into a vertex in the graph
buildings.forEach((building) => {
   classpath.addVertex(new Vertex("building", building.name, building.xInPercent, building.yInPercent));
});

//TODO: add connections between buildings. also add path nodes! :)

//Draws each vertex in the graph
for (let i = 0; i < classpath.vertices.length; i++) {
     console.log(classpath.vertices[i].name);
     classpath.vertices[i].draw();
}

//Draws a sample edge between two vertices
classpath.drawEdge(classpath.vertices[0], classpath.vertices[1]);

document.getElementById("updateButton").addEventListener("click", function(){
  //TODO: add function
});

ctx.fillStyle = "#ddaaca";
ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth); //bottom
ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height); //right
ctx.fillRect(0, 0, canvas.width, borderWidth); //top
ctx.fillRect(0, 0, borderWidth, canvas.height); //left


