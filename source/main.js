const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let imageHeight;
let imageWidth;
let imageX;
let imageY;
let constSize;

const FORM_COLORS = ["#aa5252", "#f9c64d", "#5e8e7f", "#775169", "#775e41"];
const BACKGROUND_COLOR ="#a5d389";
const BORDER_COLOR = "#ddaaca";
const BORDER_WIDTH = 8;
const SIDEBAR_WIDTH_PERCENTAGE = .3;
const CANVAS_WIDTH_PERCENTAGE = 1 - SIDEBAR_WIDTH_PERCENTAGE;

//Draws the map image with correct dimensions
function setImageWidthAndHeight(canvasWidthPercentage) {
	canvas.width = canvasWidthPercentage * document.body.clientWidth;
	canvas.height =  document.body.clientHeight;
	docRatio = (document.body.clientWidth * canvasWidthPercentage) / document.body.clientHeight;
	let imageRatio = originalImageWidth / originalImageHeight;
	if (docRatio > imageRatio) {
		imageHeight = document.body.clientHeight - (2 * BORDER_WIDTH);
		imageWidth = (document.body.clientHeight * imageRatio) - (2 * BORDER_WIDTH);
		constSize = imageHeight;
		imageX = ((((document.body.clientWidth) * (canvasWidthPercentage)) - imageWidth) / 2);
		imageY = BORDER_WIDTH;
	} else {
		imageHeight = ((document.body.clientWidth* (canvasWidthPercentage)) / imageRatio) - (2 * BORDER_WIDTH);
		imageWidth = ((document.body.clientWidth) * (canvasWidthPercentage)) - (2 * BORDER_WIDTH);
		constSize = imageWidth;
		imageX = BORDER_WIDTH;
		imageY = ((document.body.clientHeight - imageHeight) / 2);
	}
}

function updateCheckboxes() {
	drawFood();
	drawCoffee();
	drawStore();
	drawReligion();
}

function drawFood() {
    var foodBox = document.getElementById("foodCheck");
    if (foodBox.checked == true){
        foodNodes.forEach((foodNode) => {
            foodNode.draw();
        });
    }
}

function drawCoffee() {
    var coffeeBox = document.getElementById("coffeeCheck");
    if (coffeeBox.checked == true){
        coffeeNodes.forEach((coffeeNode) => {
            coffeeNode.draw();
        });
    }
}

function drawStore() {
    var storeBox = document.getElementById("storeCheck");
    if (storeBox.checked == true){
        storeNodes.forEach((storeNode) => {
            storeNode.draw();
        });
    }
}

function drawReligion() {
    var religionBox = document.getElementById("religionCheck");
    if (religionBox.checked == true){
        crossNodes.forEach((crossNode) => {
            crossNode.draw();
        });
    }
}

//Draws the vertices after button has been pushed
function drawValidVerticesAndPaths() {
	let totalValidVertices = [];
	for (let i = 0; i < entries.length; i++) {
		if (entries[i] !== null) {
			let validVertex = classpath.returnVertexWithName(entries[i].place);
			totalValidVertices.push(validVertex);
			validVertex.setColor(FORM_COLORS[i]);
			validVertex.draw();
		}
	}
	drawValidPaths(totalValidVertices);
}

function drawValidPaths(totalValidVertices) {
	let transportationMethod = returnCurrentTransportationMethod();
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnVertexWithName(totalValidVertices[i].name);
		let locationB = classpath.returnVertexWithName(totalValidVertices[i + 1].name);
		classpath.drawPath(classpath.findPath(locationA, locationB, transportationMethod));
	}
}

//Finds out whether the user is walking, biking, or driving to their destination
function returnCurrentTransportationMethod() {
	let walkButton = document.getElementById("walk");
	let driveButton = document.getElementById("drive");
	let bikeButton = document.getElementById("bike");
	let transportationMethods = [walkButton, driveButton, bikeButton];
	for (let i = 0; i < transportationMethods.length; i++) {
		if (transportationMethods[i].classList.contains("selectedTransportationMethod")) {
			return transportationMethods[i].id;
		}
	}
	return null;
}

function addCross(xInPercent, yInPercent){
	ctx.drawImage(crossImage, (xInPercent) * imageWidth + (canvas.width - imageWidth)/2 - widthValue ,(yInPercent) * imageHeight + (canvas.height - imageHeight)/2, 50, 50);

}

function addConnectionBetweenNodes(nodeNameA, nodeNameB) {
	classpath.addEdge(classpath.returnVertexWithName(nodeNameA), classpath.returnVertexWithName(nodeNameB));
}

function drawBackground() {
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMap() {
	ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);
}

function drawBorder() {
	ctx.fillStyle = BORDER_COLOR;
	ctx.fillRect(0, canvas.height - BORDER_WIDTH, canvas.width, BORDER_WIDTH); //bottom
	ctx.fillRect(canvas.width - BORDER_WIDTH, 0, BORDER_WIDTH, canvas.height); //right
	ctx.fillRect(0, 0, canvas.width, BORDER_WIDTH); //top
	ctx.fillRect(0, 0, BORDER_WIDTH, canvas.height); //left
}

//TODO: change these hardcoded values at some point (probably just figure out a nice way to figure out with what ratios and sizes to draw symbols)
function drawLionSymbol() {
	ctx.drawImage(lmuLogo, imageX + imageWidth*.05, imageY+ imageHeight*.05, constSize*.25, constSize*.25);
}

function drawCompassSymbol() {
	ctx.drawImage(compass, imageX +imageWidth*.2, imageY + imageHeight*.57, constSize*.45, constSize*.4);
}


function refreshBackground() {
	drawBackground();
	drawMap();
	drawBorder();
	drawLionSymbol();
	drawCompassSymbol();
	updateCheckboxes();
}

let entries;

//Code to handle the update button--connected to the button
// document.getElementById("updateButton").addEventListener("click", drawEntries);

function drawEntries() {
	console.log('drawing entries');
	refreshBackground();
	entries = [];
	let entriesFromHTML = document.getElementsByClassName("buildingEntry");
	for (let i = 0; i < entriesFromHTML.length; i++){
		let valueOfEntry = entriesFromHTML[i].children[0].value;
		if (valueOfEntry !== "") {
			entries.push(new Entry(valueOfEntry));
		} else {
			entries.push(null);
		}
	}
	drawValidVerticesAndPaths();
}

$(document).ready(function() {
	//Start with two forms on page by default
	addForm();
	addForm();
	setImageWidthAndHeight();
	if (sidebarCollapsed) {
		setImageWidthAndHeight(1.00);
	} else {
		setImageWidthAndHeight(CANVAS_WIDTH_PERCENTAGE);
	}
	populateGraph();
	//TODO: this is temporary so probably fix this at some point yikes
	setTimeout(() => {refreshBackground()}, 10);
});
