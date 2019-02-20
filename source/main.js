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
const CONST_COLORS = ["#aa5252", "#f9c64d", "#5e8e7f", "#775169", "#775e41"];


//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * document.body.clientWidth;
canvas.height =  document.body.clientHeight;


//Draws the map image with correct dimensions
if (canvas.width < canvas.height)
{
	imageHeight = canvas.width* image_height_to_width;
	imageWidth = canvas.width;
	imageX = 0;
	imageY = canvas.height/2 - imageHeight/2;

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
			validVertex.setColor(CONST_COLORS[i]);
			validVertex.draw();
		});
	}
	drawValidPaths(totalValidVertices);
}

//Draws valid paths
function drawValidPaths(totalValidVertices) {
	//This will not work if there are buildings on campus that are not accessible from other buildings
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnVertexWithName(totalValidVertices[i].name);
		let locationB = classpath.returnVertexWithName(totalValidVertices[i + 1].name);
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
	buildings.push(new Building("hannonLib", 45.3, 31));
	buildings.push(new Building("malone", 75.63, 30.49));
	buildings.push(new Building("sacredHeart", 68.5, 15))
	buildings.push(new Building("stRobs", 60, 29.49));
	buildings.push(new Building("vonDerAhe", 62, 39.49));
	buildings.push(new Building("hilton", 54.7, 29.49));
	buildings.push(new Building("drollinger", 43.8,54));
	buildings.push(new Building("uhall",17, 78));
	buildings.push(new Building("burnsArt", 62.2,53));
	buildings.push(new Building("commArts", 59.9, 46.7));
	buildings.push(new Building("leaveyHall", 53.3, 51));
	buildings.push(new Building("xavier", 57, 17));
	buildings.push(new Building("jesuit", 51.5, 21.5));
	buildings.push(new Building("hannonField", 63.2, 69));
	buildings.push(new Building("hannonApt", 58, 67.8));
	buildings.push(new Building("tenderich", 52, 67.8));
	buildings.push(new Building("mckay", 52.5, 61));
	buildings.push(new Building("rains", 40, 45.2));
	buildings.push(new Building("mccarthy", 38, 38.5));
	buildings.push(new Building("omalley", 26, 42.5));
	buildings.push(new Building("leavey4", 26, 52));
	buildings.push(new Building("leavey5", 21, 57));
	buildings.push(new Building("leavey6", 28, 59));
	buildings.push(new Building("huesman", 85, 28));
	buildings.push(new Building("doheny",  90, 34));
	buildings.push(new Building("sullivan", 87, 41));
	buildings.push(new Building("desmond", 80, 17));
	buildings.push(new Building("rosecrans", 85, 20));
	buildings.push(new Building("whelan", 77, 11));
	buildings.push(new Building("delreynorth", 83, 8.1));
	buildings.push(new Building("delreysouth", 87, 14));




	//Makes each building into a vertex in the graph
	buildings.forEach((building) => {
		classpath.addVertex(new Vertex("building", building.name, building.xInPercent, building.yInPercent));
	});

	addBuildingConnections();
}

function addBuildingConnections() {
	addConnectionBetweenNodes("lsb", "pereira");
	addConnectionBetweenNodes("pereira", "doolan");
	addConnectionBetweenNodes("seaver", "lsb");
	addConnectionBetweenNodes("hannonApt", "hannonField");
	addConnectionBetweenNodes("mckay", "hannonApt");
	addConnectionBetweenNodes("mckay", "hannonField");
	addConnectionBetweenNodes("burnsArt", "leaveyHall");
	addConnectionBetweenNodes("leaveyHall", "commArts");
	addConnectionBetweenNodes("commArts", "burnsArt");
	addConnectionBetweenNodes("burnsRec", "gersten");
	addConnectionBetweenNodes("foley", "foleyAnnex");
	addConnectionBetweenNodes("foley", "lsb");
	addConnectionBetweenNodes("foleyAnnex", "malone");
	addConnectionBetweenNodes("foleyAnnex", "lsb");
	addConnectionBetweenNodes("burnsRec", "lsb");

}

function addPathNodes() {
	let pathNodes = [];
	//pathNodes.push(new Vertex("path", PATHNODENAME, XINPERCENTAGE, YINPERCENTAGE));

	pathNodes.push(new Vertex("path", "A", 68.5, 69.66));
	pathNodes.push(new Vertex("path", "B", 68.5, 60.97));
	pathNodes.push(new Vertex("path", "C", 68, 47.29));
	pathNodes.push(new Vertex("path", "D", 68, 39.49));
	pathNodes.push(new Vertex("path", "E", 68, 34));
	pathNodes.push(new Vertex("path", "F", 74, 42));
	pathNodes.push(new Vertex("path", "G", 81, 49.29));

	pathNodes.forEach((pathNode) => {
		classpath.addVertex(pathNode);
	});
	addPathNodeConnections();
	//add invisible path nodes
}

function updateFormColors() {
    var forms = document.getElementsByName("buildings");
    var i;
    for (i = 0; i < forms.length; i++) {
        forms[i].style.backgroundColor = CONST_COLORS[i];
    }
}

function addPathNodeConnections() {
	//addConnectionBetweenNodes(PATHNODENAME OR BUILDINGNODENAME, PATHNODENAME OR BUILDINGNODE);
    addConnectionBetweenNodes("A", "gersten");
    addConnectionBetweenNodes("B", "burnsArt");
    addConnectionBetweenNodes("A", "B");
    addConnectionBetweenNodes("burnsRec", "B");
    addConnectionBetweenNodes("B", "C");
    addConnectionBetweenNodes("B", "lsb");
    addConnectionBetweenNodes("C", "seaver");
    addConnectionBetweenNodes("seaver", "F");
    addConnectionBetweenNodes("D", "E");
    addConnectionBetweenNodes("D", "F");
    addConnectionBetweenNodes("D", "foley");
    addConnectionBetweenNodes("E", "malone");
    addConnectionBetweenNodes("foley", "F");
    addConnectionBetweenNodes("F", "lsb");
    addConnectionBetweenNodes("G", "lsb");
    addConnectionBetweenNodes("G", "pereira");
    addConnectionBetweenNodes("A", "hannonField");
    addConnectionBetweenNodes("B", "hannonField");
    addConnectionBetweenNodes("C", "burnsArt");
    addConnectionBetweenNodes("C", "mckay");
    addConnectionBetweenNodes("D", "burnsArt");
    addConnectionBetweenNodes("D", "commArts");
    addConnectionBetweenNodes("D", "leaveyHall");
    addConnectionBetweenNodes("E", "vonDerAhe");
    addConnectionBetweenNodes("F", "stRobs");
}

addPathNodes();

function addFoodNodes() {
	let foodNodes = [];
	foodNodes.push(new Vertex("food", "foodname", 84, 14));
	foodNodes.push(new Vertex("food", "foodname", 79, 30));
	foodNodes.push(new Vertex("food", "foodname", 52.5, 56));
	foodNodes.push(new Vertex("food", "foodname", 14, 83));
	foodNodes.push(new Vertex("food", "foodname", 11, 90));
	foodNodes.forEach((foodNode) => {
		classpath.addVertex(foodNode);
		foodNode.draw();
	});
}

function addCoffeeNodes() {
	let coffeeNodes = [];
	coffeeNodes.push(new Vertex("coffee", "coffeename", 76, 27));
	coffeeNodes.push(new Vertex("coffee", "coffeename", 79.5, 49.2));
	coffeeNodes.push(new Vertex("coffee", "coffeename", 74.7, 49.29));
	coffeeNodes.push(new Vertex("coffee", "coffeename", 47, 34));
	coffeeNodes.push(new Vertex("coffee", "coffeename", 29, 47));
	coffeeNodes.push(new Vertex("coffee", "coffeename", 19, 73));

	coffeeNodes.forEach((coffeeNode) => {
		classpath.addVertex(coffeeNode);
		coffeeNode.draw();
	});
}

function addStoreNodes() {
	let storeNodes = [];
	storeNodes.push(new Vertex("store", "storename", 82, 11.5));
	storeNodes.push(new Vertex("store", "storename", 72.5, 30));
	storeNodes.push(new Vertex("store", "storename", 25, 61));
	storeNodes.forEach((storeNode) => {
		classpath.addVertex(storeNode);
		storeNode.draw();
	});
}

function addCross(xInPercent, yInPercent){
	ctx.drawImage(crossImage, (xInPercent) * imageWidth + (canvas.width - imageWidth)/2 - widthValue ,(yInPercent) * imageHeight + (canvas.height - imageHeight)/2, 50, 50);

}

function addConnectionBetweenNodes(nodeNameA, nodeNameB) {
	classpath.addEdge(classpath.returnVertexWithName(nodeNameA), classpath.returnVertexWithName(nodeNameB));
}

function refreshBackground() {
	//draws green background :)
	ctx.fillStyle = "#a5d389";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//draws map
	ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);

	//draws border
	ctx.fillStyle = "#ddaaca";
	ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth); //bottom
	ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height); //right
	ctx.fillRect(0, 0, canvas.width, borderWidth); //top
	ctx.fillRect(0, 0, borderWidth, canvas.height); //left

	// draws lion logo
	ctx.drawImage(lmuLogo, 40, 10, imageWidth/3.5, imageWidth/3.5)

	// draws compass rose
	ctx.drawImage(compass, canvas.width*.19, canvas.height*.62, imageWidth/2.5, imageHeight/2.5)

	addCross(.682,.095);
}

refreshBackground();
addFoodNodes();
addCoffeeNodes();
addStoreNodes();
