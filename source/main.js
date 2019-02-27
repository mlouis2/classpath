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
const FORM_COLORS = ["#aa5252", "#f9c64d", "#5e8e7f", "#775169", "#775e41"];
const BACKGROUND_COLOR ="#a5d389";
const BORDER_COLOR = "#ddaaca";

//Sets the canvas width and canvas height so that my circles are not ovals
canvas.width = widthValue * (document.body.clientWidth)-borderWidth;
canvas.height =  document.body.clientHeight-borderWidth;

//Draws the map image with correct dimensions
function setImageWidthAndHeight() {
/*	if (document.body.clientWidth === document.body.clientHeight){
		imageHeight = canvas.height;
		imageWidth = canvas.width
		imageX=canvas.width/2 - imageWidth/2;
		imageY=canvas.height/2 - imageHeight/2;
	}*/
	if (canvas.width  < canvas.height)
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
	/*
	else
	{
		imageWidth = canvas.height *image_width_to_height;
		imageHeight = canvas.width* image_height_to_width;
		imageX = canvas.width/2 -imageWIdtht/2;
		imageY= canvas.height/2 -imageHeight/2;
	}*/
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
		let validVertices = classpath.returnVerticesWithName(entries[i].place);
		validVertices.forEach((validVertex) => {
			totalValidVertices.push(validVertex);
			validVertex.setColor(FORM_COLORS[i]);
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
	ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth); //bottom
	ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height); //right
	ctx.fillRect(0, 0, canvas.width, borderWidth); //top
	ctx.fillRect(0, 0, borderWidth, canvas.height); //left

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
