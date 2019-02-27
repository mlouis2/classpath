const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const originalImageWidth = 1574;
const originalImageHeight = 1183;

let imageHeight;
let imageWidth;
let imageX;
let imageY;
const FORM_COLORS = ["#aa5252", "#f9c64d", "#5e8e7f", "#775169", "#775e41"];
const BACKGROUND_COLOR ="#a5d389";
const BORDER_COLOR = "#ddaaca";
const BORDER_WIDTH = 8;
const SIDEBAR_WIDTH_PERCENTAGE = .3;
const CANVAS_WIDTH_PERCENTAGE = 1 - SIDEBAR_WIDTH_PERCENTAGE;

//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = CANVAS_WIDTH_PERCENTAGE * document.body.clientWidth;
canvas.height =  document.body.clientHeight;

//Draws the map image with correct dimensions
function setImageWidthAndHeight() {
	docRatio = document.body.clientWidth / document.body.clientHeight;
	let imageRatio = originalImageWidth / originalImageHeight;
	if (docRatio > imageRatio) {
		imageHeight = document.body.clientHeight - (2 * BORDER_WIDTH);
		imageWidth = (document.body.clientHeight * imageRatio) - (2 * BORDER_WIDTH);
		imageX = ((((document.body.clientWidth) * (.7)) - imageWidth) / 2);
		imageY = BORDER_WIDTH;
	} else {
		imageHeight = ((document.body.clientWidth* (CANVAS_WIDTH_PERCENTAGE)) / imageRatio) - (2 * BORDER_WIDTH);
		imageWidth = ((document.body.clientWidth) * (CANVAS_WIDTH_PERCENTAGE)) - (2 * BORDER_WIDTH);
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

//Draws valid paths
function drawValidPaths(totalValidVertices) {
	//This will not work if there are buildings on campus that are not accessible from other buildings
	for (let i = 0; i < totalValidVertices.length - 1; i++) {
		let locationA = classpath.returnVertexWithName(totalValidVertices[i].name);
		let locationB = classpath.returnVertexWithName(totalValidVertices[i + 1].name);
		classpath.drawPath(classpath.findPath(locationA, locationB));
	}
}

function updateFormColors() {
    var forms = document.getElementsByName("buildings");
    var i;
    for (i = 0; i < forms.length; i++) {
        forms[i].style.backgroundColor = FORM_COLORS[i];
    }
}

function addCross(xInPercent, yInPercent){
	ctx.drawImage(crossImage, (xInPercent) * imageWidth + (canvas.width - imageWidth)/2 - widthValue ,(yInPercent) * imageHeight + (canvas.height - imageHeight)/2, 50, 50);

}

function addConnectionBetweenNodes(nodeNameA, nodeNameB) {
	classpath.addEdge(classpath.returnVertexWithName(nodeNameA), classpath.returnVertexWithName(nodeNameB));
}


function refreshBackground() {
	//Draws Green Background
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Draws Map
	ctx.drawImage(mapImage, imageX,imageY, imageWidth, imageHeight);

	//Draws Border
	ctx.fillStyle = BORDER_COLOR;
	ctx.fillRect(0, canvas.height - BORDER_WIDTH, canvas.width, BORDER_WIDTH); //bottom
	ctx.fillRect(canvas.width - BORDER_WIDTH, 0, BORDER_WIDTH, canvas.height); //right
	ctx.fillRect(0, 0, canvas.width, BORDER_WIDTH); //top
	ctx.fillRect(0, 0, BORDER_WIDTH, canvas.height); //left

	//Draws Lion
	ctx.drawImage(lmuLogo, 40, 10, imageWidth/3.5, imageWidth/3.5);

	//Draws Compass
	ctx.drawImage(compass, canvas.width*.19, canvas.height*.62, imageWidth/2.5, imageHeight/2.5);
	drawAccessoryNodes();
}

let entries;
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

$(document).ready(function() {
	setImageWidthAndHeight();
	populateGraph();
	refreshBackground();
});
