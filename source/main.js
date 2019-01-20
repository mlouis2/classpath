const widthValue = .7 - .02;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const borderWidth = 8;
const image_width_to_height= 21.68/16.43;
const image_height_to_width =16.43/21.68;
let imageHeight;
let imageWidth;
let imageX;
let imageY;


//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

//Creates the map image
let mapImage = new Image();
mapImage.src = "./LMUMap.png";

//Draws the map image with correct dimensions
if (canvas.width < canvas.height)
{
	imageHeight = canvas.width* image_height_to_width;
	imageWidth = canvas.width;
	imageX = 0;
	imageY= canvas.height/2 - imageHeight/2;

}
else if (canvas.height <= canvas.width)
{
	imageWidth = canvas.height *image_width_to_height;
	imageHeight = canvas.height;
	imageY = 0;
	imageX= canvas.width/2 - imageWidth/2;
}

//Creates the graph
let classpath = new Graph();

addBuildings();

//TODO: add connections between buildings. also add path nodes! :)

let entries = [];
//Code to handle the update button--connected to the button
document.getElementById("updateButton").addEventListener("click", function(){
	refreshBackground();
	entries = [];
	let entriesFromHTML = document.getElementsByClassName("buildingEntry");
	for (let i = 0; i < entriesFromHTML.length; i++){
		entries.push(new Entry(entriesFromHTML[i].children[0].value));
	}
	drawValidVerticesAndPaths();
});

//Draws the vertices after button has been pushed
function drawValidVerticesAndPaths() {
	let totalValidVertices = [];
	for (let i = 0; i < entries.length; i++) {
		let validVertices = classpath.returnVerticesWithName(entries[i].place);
		validVertices.forEach((validVertex) => {
			totalValidVertices.push(validVertex);
			validVertex.draw();
		});
	}
	drawValidPaths(totalValidVertices);
}

//Draws valid paths
function drawValidPaths(totalValidVertices) {
	//This will not work if there are buildings on campus that are not accessible from other buildings
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnNonPathVertexWithName(totalValidVertices[i].name);
		let locationB = classpath.returnNonPathVertexWithName(totalValidVertices[i + 1].name);
		classpath.drawPath(classpath.findPath(locationA, locationB));
	}
}

//Adds the buildings and adds the vertices
function addBuildings() {
	//Creates the buildings array
	let buildings = [];
	buildings.push(new Building("seaver", 71.3, 49.29));
	buildings.push(new Building("lsb", 77.3, 49.29));
	buildings.push(new Building("foley", 74, 38.4));
	buildings.push(new Building("pereira", 83.88, 49.29));
	buildings.push(new Building("doolan", 88.56, 49.29));
	buildings.push(new Building("foleyAnnex", 78.24, 38.4));
	buildings.push(new Building("burnsRec", 77, 60.97));
	buildings.push(new Building("gersten", 77.3, 69.66));
	buildings.push(new Building("malone", 75.63, 30.49));

	//Makes each building into a vertex in the graph
	buildings.forEach((building) => {
		classpath.addVertex(new Vertex("building", building.name, building.xInPercent, building.yInPercent));
	});

	addConnectionBetweenBuildings("lsb", "pereira");
	addConnectionBetweenBuildings("pereira", "doolan");
	addConnectionBetweenBuildings("seaver", "lsb");
}

function addConnectionBetweenBuildings(buildingNameA, buildingNameB) {
	classpath.addEdge(classpath.returnNonPathVertexWithName(buildingNameA), classpath.returnNonPathVertexWithName(buildingNameB));
}

function refreshBackground() {
	ctx.fillStyle = "#a5d389";
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);

	ctx.fillStyle = "#ddaaca";
	ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth); //bottom
	ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height); //right
	ctx.fillRect(0, 0, canvas.width, borderWidth); //top
	ctx.fillRect(0, 0, borderWidth, canvas.height); //left
}

refreshBackground();
