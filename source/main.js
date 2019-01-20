const  widthValue = .7 - .02;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthFactor = 1.35;

//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

//Creates the map image
let mapImage = new Image();
mapImage.src = "./LMUMap.png";

//Draws the map image with correct dimensions
smallerDimension = canvas.width < canvas.height ? canvas.width: canvas.height;
ctx.drawImage(mapImage, canvas.width / 2 - smallerDimension * widthFactor / 2, canvas.height / 2 - smallerDimension / 2, smallerDimension * widthFactor, smallerDimension);

//Creates the graph
let classpath = new Graph();

//Creates the buildings array
let buildings = [];
buildings.push(new Building("seaver", 72.3, 49.36));
buildings.push(new Building("lsb", 78.3, 50.07));

//Makes each building into a vertex in the graph
buildings.forEach((building) => {
	classpath.addVertex(new Vertex("building", building.name, building.xInPercent, building.yInPercent));
});

//TODO: add connections between buildings. also add path nodes! :)

let entries = [];
//Code to handle the update button--connected to the button
document.getElementById("updateButton").addEventListener("click", function(){
	entries = [];
	let entriesFromHTML = document.getElementsByClassName("entry");
	for (let i = 0; i < entriesFromHTML.length; i++){
		entries.push(new Entry(entriesFromHTML[i].children[0].value, entriesFromHTML[i].children[1].value));
	}
	drawValidVertices();
});

//Draws the vertices after button has been pushed
function drawValidVertices() {
	for (let i = 0; i < entries.length; i++) {
		let validVertices = classpath.returnVerticesWithName(entries[i].place);
		validVertices.forEach((validVertex) => {
			validVertex.draw();
		});
	}
}
