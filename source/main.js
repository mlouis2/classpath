const  widthValue = .7 - .02;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

//Creates the map image
let mapImage = new Image();
mapImage.src = "./LMUMap.png";
ctx.drawImage(mapImage, 0, 0, 200, 124);

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
