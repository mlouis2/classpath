let imageFilePath, originalImageWidth, originalImageHeight;
let foodNodes = [], coffeeNodes = [], storeNodes = [], crossNodes = [], buildingNodes = [];

let request = new XMLHttpRequest();
request.open("GET", "./source/lmu.json", false);
request.send(null)
let mapData = JSON.parse(request.responseText);

function populateGraph() {
	classpath = new Graph();
	interpretImage();
	addBuildings();
	addAccessoryNodes();
	addPathNodes();
	addConnections();
}

function interpretImage() {
	imageFilePath = mapData.loyolaMarymountUniversity.image.filePath;
	originalImageWidth = mapData.loyolaMarymountUniversity.image.width;
	originalImageHeight = mapData.loyolaMarymountUniversity.image.height;
}

function addBuildings() {
	let buildings = mapData.loyolaMarymountUniversity.buildings;
	for (let i = 0; i < buildings.length; i++) {
		let vertex = new Vertex("building", buildings[i].name, buildings[i].x, buildings[i].y);
		classpath.addVertex(vertex);
		buildingNodes.push(vertex);
	}
}

function addAccessoryNodes() {
	foodNodes = [];
	coffeeNodes = [];
	storeNodes = [];
	crossNodes = [];
	let accessoryNodes = mapData.loyolaMarymountUniversity.accessoryNodes;
	for (let i = 0; i < accessoryNodes.length; i++) {
		let vertex = new Vertex(accessoryNodes[i].type, accessoryNodes[i].name, accessoryNodes[i].x, accessoryNodes[i].y);
		classpath.addVertex(vertex);
		switch (vertex.vertexType) {
			case "food":
				foodNodes.push(vertex);
				break;
			case "store":
				storeNodes.push(vertex);
				break;
			case "coffee":
				coffeeNodes.push(vertex);
				break;
			case "cross":
				crossNodes.push(vertex);
		}
	}
}

function addPathNodes() {
	let pathNodes = mapData.loyolaMarymountUniversity.pathNodes;
	for (let i = 0; i < pathNodes.length; i++) {
		classpath.addVertex(new Vertex("path", pathNodes[i].name, pathNodes[i].x, pathNodes[i].y));
	}
}

function addConnections() {
	let connections = mapData.loyolaMarymountUniversity.connections;
	for (let i = 0; i < connections.length; i++) {
		addConnectionBetweenNodes(connections[i][0], connections[i][1]);
	}
}
