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
ctx.drawImage(mapImage, canvas.width / 2 - smallerDimension * widthFactor / 2, canvas.height / 2 - smallerDimension / 2, smallerDimension * widthFactor, smallerDimension);

//Creates the graph
let classpath = new Graph();

//Creates the buildings array
let buildings = [];
buildings.push(new Building("seaver", 73.3, 49.29));
buildings.push(new Building("lsb", 79.3, 49.29));
buildings.push(new Building("foley", 76, 38.4));
buildings.push(new Building("pereira", 85.88, 49.29));
buildings.push(new Building("doolan", 90.56, 49.29));
buildings.push(new Building("foleyAnnex", 80.24, 38.4));
buildings.push(new Building("burnsRec", 79.3, 60.97));
buildings.push(new Building("gersten", 79.3, 69.66));
buildings.push(new Building("malone", 77.63, 30.49));

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

ctx.fillStyle = "#ddaaca";
ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth); //bottom
ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height); //right
ctx.fillRect(0, 0, canvas.width, borderWidth); //top
ctx.fillRect(0, 0, borderWidth, canvas.height); //left
