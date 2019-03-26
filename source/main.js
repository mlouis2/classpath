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

function drawAccessoryNodes() {
    foodNodes.forEach((foodNode) => {
        foodNode.draw();
    });
    coffeeNodes.forEach((coffeeNode) => {
        coffeeNode.draw();
    });
    storeNodes.forEach((storeNode) => {
        storeNode.draw();
    });
    crossNodes.forEach((crossNode) => {
        crossNode.draw();
    });
}

//Draws the vertices after button has been pushed
function drawValidVerticesAndPaths() {
	let totalValidVertices = [];
	for (let i = 0; i < entries.length; i++) {
		let validVertex = classpath.returnVertexWithName(entries[i].place);
		totalValidVertices.push(validVertex);
		validVertex.setColor(FORM_COLORS[i]);
		validVertex.draw();
	}
	drawValidPaths(totalValidVertices);
}

function drawValidPaths(totalValidVertices) {
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnVertexWithName(totalValidVertices[i].name);
		let locationB = classpath.returnVertexWithName(totalValidVertices[i + 1].name);
		classpath.drawPath(classpath.findPath(locationA, locationB));
	}
}

function updateFormColors() {
    var forms = document.getElementsByName("buildings");
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.backgroundColor = FORM_COLORS[i];
    }
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
	drawAccessoryNodes();
}

let entries;

//Code to handle the update button--connected to the button
document.getElementById("updateButton").addEventListener("click", drawEntries);

function drawEntries() {
	refreshBackground();
	entries = [];
	let entriesFromHTML = document.getElementsByClassName("buildingEntry");
	for (let i = 0; i < entriesFromHTML.length; i++){
		let valueOfEntry = entriesFromHTML[i].children[0].value;
		if (valueOfEntry !== "") {
			entries.push(new Entry(valueOfEntry));
		}
	}
	drawValidVerticesAndPaths();
}

$(document).ready(function() {
	setImageWidthAndHeight();
	if (sidebarCollapsed) {
		setImageWidthAndHeight(1.00);
	} else {
		setImageWidthAndHeight(CANVAS_WIDTH_PERCENTAGE);
	}
	populateGraph();
	refreshBackground();
});
