const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthFactor = 1.35;

canvas.width = 0.68 * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

let mapImage = new Image();
mapImage.src = "./LMUMap.png";
console.log('map image is' + mapImage);

smallerDimension = canvas.width < canvas.height ? canvas.width: canvas.height;
ctx.drawImage(mapImage, canvas.width / 2 - smallerDimension * widthFactor / 2,
        canvas.height / 2 - smallerDimension / 2, smallerDimension * widthFactor, smallerDimension);


let classpath = new Graph();
classpath.addVertex(new Vertex("building", "seaver", 50, 50));
classpath.addVertex(new Vertex("building", "lsb", 200, 200));
for (let i = 0; i < classpath.vertices.length; i++) {
     console.log(classpath.vertices[i].name);
     classpath.vertices[i].draw();
}
classpath.drawEdge(classpath.vertices[0], classpath.vertices[1]);
