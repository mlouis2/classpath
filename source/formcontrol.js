const MAX_FORMS = 5;
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
	selectBuildingsString += "<option value='" + buildingNodes[i].name + "'>" + buildingNodes[i].name + "</option>";
}
selectBuildingsString += "</div>";

function addForm(id) {

	let addForm = document.getElementById('addform');

	addid++;

	let text = document.createElement('div');
	text.id = 'additem_' + addid;

	if (isFirst) {
		text.innerHTML = selectBuildingsString;
		isFirst = false;
	} else {
		text.innerHTML = optionConnector + selectBuildingsString;
	}

	if (addid <= MAX_FORMS) {
		addForm.appendChild(text);
		updateFormColors();
	}
	if (addid == MAX_FORMS) {
		document.getElementById("addformbutton").remove();
	}
}

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}

//Starts with two forms by default
addForm(1);
addForm(1);

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
