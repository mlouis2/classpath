const MAX_FORMS = 5;
const HIGHLIGHTED_DOT_RADIUS = 15;
let sidebarCollapsed = false;
let addid = 0;
let isFirst = true;
let optionConnector = "<div style='font-size: 25px; text-align: center; color: white'>&darr;</div>";
let selectBuildingsString = "<div class='buildingEntry'>" +
"<select name='buildings'>" +
"<option value='' selected disabled hidden>Pick a Location</option>";

populateGraph();
sortBuildingsAlphabetically();
for (let i = 0; i < buildingNodes.length; i++) {
	selectBuildingsString += "<option value='" + buildingNodes[i].name.replace("\'", "&#39;") + "'>" + buildingNodes[i].name + "</option>";
}
selectBuildingsString += "</div>";

function addForm() {

	let addForm = document.getElementById('addform');

	let text = document.createElement('div');
	text.id = 'entry ' + addid;

	if (isFirst) {
		text.innerHTML = selectBuildingsString;
		isFirst = false;
	} else {
		text.innerHTML = optionConnector + selectBuildingsString;
	}

	if (addid < MAX_FORMS) {
		addForm.appendChild(text);
		updateFormColors();
	}
	if (addid == MAX_FORMS - 1) {
		document.getElementById("addformbutton").remove();
	}

	let buildingEntries = document.getElementsByClassName("buildingEntry");
	buildingEntries[addid].addEventListener("mouseover", highlightLocationDelegate(addid));
	buildingEntries[addid].addEventListener("mouseout", unhighlightLocationDelegate(addid));

	addid++;
}

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}

function updateTransportation(id) {
	let button = document.getElementById(id);
	button.classList.add("selectedTransportationMethod");
	removeOtherSelectionsFromTransportationMethods(id);
	drawEntries();
}

function removeOtherSelectionsFromTransportationMethods(idOfSelected) {
	let walkButton = document.getElementById("walk");
	let driveButton = document.getElementById("drive");
	let bikeButton = document.getElementById("bike");
	let transportationMethods = [walkButton, driveButton, bikeButton];
	transportationMethods.forEach((method) => {
		if (method.id !== idOfSelected && method.classList.contains("selectedTransportationMethod")) {
			method.classList.remove("selectedTransportationMethod");
		}
	});
}

function collapseSidebar() {
	if (sidebarCollapsed) { //open the sidebar!
		document.getElementById("sidebar").style.width = "30%";
		document.getElementById("sidebarButtonContainer").style.marginLeft = "30%";
		setImageWidthAndHeight(CANVAS_WIDTH_PERCENTAGE);
	} else { //collapse the sidebar!
		document.getElementById("sidebar").style.width = "0";
		setImageWidthAndHeight(1);
		document.getElementById("sidebarButtonContainer").style.marginLeft = "0%";
	}
	sidebarCollapsed = !sidebarCollapsed;
	populateGraph();
	drawEntries();
}

function sortBuildingsAlphabetically() {
	buildingNodes.sort(function(buildingA, buildingB) {
		if(buildingA.name < buildingB.name) { return -1; }
    		if(buildingA.name > buildingB.name) { return 1; }
    		return 0;
	});
}

function unhighlightLocationDelegate(formNumber) {
	return function() {
		unhighlightLocation(formNumber);
	}
}

//Hacky way to make it so that we can assign the eventListeners dynamically
function highlightLocationDelegate(formNumber) {
	return function() {
		highlightLocation(formNumber);
	}
}

function unhighlightLocation(formNumber) {
	drawEntries();
}

function highlightLocation(formNumber) {
	let entry = document.getElementsByClassName("buildingEntry")[formNumber];
	let entryValue = entry.children[0].value;
	let vertexWithEntryValue = classpath.returnVertexWithName(entryValue);
	if (vertexWithEntryValue !== null) {
		ctx.fillStyle = "white";
		ctx.font = "15px Arial";
		ctx.fillRect(vertexWithEntryValue.x, vertexWithEntryValue.y - (HIGHLIGHTED_DOT_RADIUS), ctx.measureText(vertexWithEntryValue.name).width + HIGHLIGHTED_DOT_RADIUS * 2, HIGHLIGHTED_DOT_RADIUS * 2);
		ctx.fillStyle = "black";
		ctx.fillText(vertexWithEntryValue.name, vertexWithEntryValue.x + HIGHLIGHTED_DOT_RADIUS + 5, vertexWithEntryValue.y + HIGHLIGHTED_DOT_RADIUS / 4);
		vertexWithEntryValue.draw(HIGHLIGHTED_DOT_RADIUS);
	}
}

function updateFormColors() {
    var forms = document.getElementsByName("buildings");
    for (let i = 0; i < forms.length; i++) {
        forms[i].style.backgroundColor = FORM_COLORS[i];
    }
}
