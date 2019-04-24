const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let firstLoad = true;
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
	if (firstLoad) {
		mapImage.onload = () => {
			ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);
			checkLocalStorage();
		}
		firstLoad = false;
	} else {
		ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);
	}
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

function drawEntries(buildingEntries = []) {
	refreshBackground();
	const entriesFromHTML = document.getElementsByClassName("buildingEntry");
	const buildingEntriesFromHTML = [];
	for (let i = 0; i < entriesFromHTML.length; i++){
		//TODO: extract as function
		const valueOfEntry = entriesFromHTML[i].children[0].value;
		if (valueOfEntry !== "") {
			//TODO: get rid of entry class
			buildingEntriesFromHTML.push(new Entry(valueOfEntry));
		} else {
			buildingEntriesFromHTML.push(null);
		}
	}
	if (buildingEntries !== buildingEntriesFromHTML) {
		buildingEntries = buildingEntriesFromHTML;
	}
	localStorage.setItem('entries', JSON.stringify(buildingEntries.filter(entry => entry !== null))); // Magic var
	drawValidVerticesAndPaths(buildingEntries);
}

//Draws the vertices after button has been pushed
function drawValidVerticesAndPaths(buildingEntries = []) {
	let totalValidVertices = [];
	for (let i = 0; i < buildingEntries.length; i++) {
		if (buildingEntries[i] !== null) {
			let validVertex = classpath.returnVertexWithName(buildingEntries[i].place);
			totalValidVertices.push([validVertex, i]);
			validVertex.setColor(FORM_COLORS[i]);
			validVertex.draw();
		}
	}
	drawValidPaths(totalValidVertices);
}

function drawValidPaths(totalValidVertices) {
	let transportationMethod = returnCurrentTransportationMethod();
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnVertexWithName(totalValidVertices[i][0].name);
		let locationB = classpath.returnVertexWithName(totalValidVertices[i + 1][0].name);
		let path = classpath.findPathAndTimes(locationA, locationB, transportationMethod, totalValidVertices[i + 1][1]);
		classpath.drawPath(path);
	}
}

function checkLocalStorage() {
	if (localStorage.getItem('entries') !== null) {
		let entries = JSON.parse(localStorage.getItem('entries'));
		for (let i = 0; i < entries.length; i++) {
			if (addid < entries.length) {
				addForm();
			}
			if (entries[i] !== null) {
				setSelect(i, entries[i].place);
			}
		}
		drawEntries(entries);
	}
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
	refreshBackground();
});
