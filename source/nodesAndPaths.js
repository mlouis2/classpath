let buildings = [], pathNodes = [], foodNodes = [], coffeeNodes = [], storeNodes = [], crossNodes = [];

//Adds the buildings and adds the vertices
function addBuildings() {
	//Creates the buildings array
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
	buildings.push(new Building("huesman", 86, 28));
	buildings.push(new Building("doheny",  90, 34));
	buildings.push(new Building("sullivan", 86, 41));
	buildings.push(new Building("desmond", 80, 17));
	buildings.push(new Building("rosecrans", 85, 20));
	buildings.push(new Building("whelan", 77, 11));
	buildings.push(new Building("delreynorth", 83, 8.1));
	buildings.push(new Building("delreysouth", 87, 14));
	buildings.push(new Building("facilitiesMgmt", 90, 57));

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
	addConnectionBetweenNodes("foley", "foleyAnnex");
	addConnectionBetweenNodes("foley", "lsb");
	addConnectionBetweenNodes("foleyAnnex", "malone");
	addConnectionBetweenNodes("foleyAnnex", "lsb");
	addConnectionBetweenNodes("facilitiesMgmt", "doolan");

}

function addPathNodes() {
	let pathNodes = [];

	pathNodes.push(new Vertex("path", "A", 68.5, 69.66));
	pathNodes.push(new Vertex("path", "B", 68.5, 60.97));
	pathNodes.push(new Vertex("path", "C", 68, 47.29));
	pathNodes.push(new Vertex("path", "D", 68, 39.49));
	pathNodes.push(new Vertex("path", "E", 68, 34));
	pathNodes.push(new Vertex("path", "F", 74, 42));
	pathNodes.push(new Vertex("path", "G", 80.5, 49.29));
    pathNodes.push(new Vertex("path", "H", 75.63, 35));
    pathNodes.push(new Vertex("path", "I", 80.5, 35));
    pathNodes.push(new Vertex("path", "J", 86, 35));
    pathNodes.push(new Vertex("path", "K", 80.5, 44));
    pathNodes.push(new Vertex("path", "L", 80.5, 54));
    pathNodes.push(new Vertex("path", "M", 80.5, 59));
    pathNodes.push(new Vertex("path", "N", 73, 59));
    pathNodes.push(new Vertex("path", "O", 85, 50));
    pathNodes.push(new Vertex("path", "P", 74, 50));
    pathNodes.push(new Vertex("path", "Q", 87, 59));
    pathNodes.push(new Vertex("path", "R", 81, 67));
    pathNodes.push(new Vertex("path", "S", 88, 56));
    pathNodes.push(new Vertex("path", "T", 89, 53));
    pathNodes.push(new Vertex("path", "U", 89, 48));
    pathNodes.push(new Vertex("path", "V", 89, 45));
    pathNodes.push(new Vertex("path", "W", 89, 39));
    pathNodes.push(new Vertex("path", "X", 90.5, 35.5));
    pathNodes.push(new Vertex("path", "Y", 89, 33));
    pathNodes.push(new Vertex("path", "Z", 80.5, 27));
    pathNodes.push(new Vertex("path", "AA", 81, 20));
    pathNodes.push(new Vertex("path", "AB", 81, 15));
    pathNodes.push(new Vertex("path", "AC", 77, 15));
    pathNodes.push(new Vertex("path", "AD", 80, 12));
    pathNodes.push(new Vertex("path", "AE", 72, 18));
    pathNodes.push(new Vertex("path", "AF", 67, 18));
    pathNodes.push(new Vertex("path", "AG", 61, 18));


	pathNodes.forEach((pathNode) => {
		classpath.addVertex(pathNode);
	});
	addPathNodeConnections();
}

function addPathNodeConnections() {
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
    addConnectionBetweenNodes("H", "E");
   addConnectionBetweenNodes("H", "foley");
   addConnectionBetweenNodes("H", "foleyAnnex");
   addConnectionBetweenNodes("H", "I");
   addConnectionBetweenNodes("H", "malone");
   addConnectionBetweenNodes("H", "D");
   addConnectionBetweenNodes("I", "J");
   addConnectionBetweenNodes("I", "K");
   addConnectionBetweenNodes("I", "foleyAnnex");
   addConnectionBetweenNodes("J", "doheny");
   addConnectionBetweenNodes("J", "huesman");
   addConnectionBetweenNodes("J", "sullivan");
   addConnectionBetweenNodes("K", "G");
   addConnectionBetweenNodes("K", "F");
   addConnectionBetweenNodes("G", "O");
   addConnectionBetweenNodes("G", "pereira");
   addConnectionBetweenNodes("G", "L");
   addConnectionBetweenNodes("G", "lsb");
   addConnectionBetweenNodes("O", "pereira");
   addConnectionBetweenNodes("O", "doolan");
   addConnectionBetweenNodes("L", "O");
   addConnectionBetweenNodes("L", "lsb");
   addConnectionBetweenNodes("L", "M");
   addConnectionBetweenNodes("L", "pereira");
   addConnectionBetweenNodes("M", "N");
   addConnectionBetweenNodes("N", "B");
   addConnectionBetweenNodes("N", "P");
   addConnectionBetweenNodes("P", "lsb");
   addConnectionBetweenNodes("P", "seaver");
   addConnectionBetweenNodes("M", "Q");
   addConnectionBetweenNodes("M", "R");
   addConnectionBetweenNodes("L", "S");
   addConnectionBetweenNodes("Q", "S");
   addConnectionBetweenNodes("Q", "facilitiesMgmt");
   addConnectionBetweenNodes("R", "A");
   addConnectionBetweenNodes("R", "Q");
   addConnectionBetweenNodes("S", "T");
   addConnectionBetweenNodes("T", "U");
   addConnectionBetweenNodes("T", "O");
   addConnectionBetweenNodes("U", "O");
   addConnectionBetweenNodes("U", "V");
   addConnectionBetweenNodes("V", "K");
   addConnectionBetweenNodes("V", "W");
   addConnectionBetweenNodes("W", "J");
   addConnectionBetweenNodes("W", "X");
   addConnectionBetweenNodes("X", "Y");
   addConnectionBetweenNodes("J", "Y");
   addConnectionBetweenNodes("Z", "I");
   addConnectionBetweenNodes("Z", "AA");
   addConnectionBetweenNodes("AA", "AB");
   addConnectionBetweenNodes("AA", "rosecrans");
   addConnectionBetweenNodes("AA", "desmond");
   addConnectionBetweenNodes("X", "Y");
   addConnectionBetweenNodes("X", "Y");
   addConnectionBetweenNodes("X", "Y");

}

function addFoodNodes() {
	foodNodes.push(new Vertex("food", "1788/Pizza Hut", 82.32, 12.1));
	foodNodes.push(new Vertex("food", "The Lair", 76, 31.36));
	foodNodes.push(new Vertex("food", "The Habit Burger", 52.25, 59.13));
	foodNodes.push(new Vertex("food", "Crimson Lion", 14.58, 85.48));
	foodNodes.push(new Vertex("food", "Roski Dining Hall", 12.3, 89.6));
	foodNodes.forEach((foodNode) => {
		classpath.addVertex(foodNode);
	});
}

function addCoffeeNodes() {
	coffeeNodes.push(new Vertex("coffee", "Einstein's", 20.71, 71.24));
	coffeeNodes.push(new Vertex("coffee", "Coffee Bean and Tea Leaf", 30.97, 47.49));
	coffeeNodes.push(new Vertex("coffee", "The Den", 76, 27.49));
	coffeeNodes.push(new Vertex("coffee", "The Coffee Cart", 70.45, 41.58));
	coffeeNodes.push(new Vertex("coffee", "Starbucks", 46.13, 31.81));
	coffeeNodes.push(new Vertex("coffee", "The Foundry", 74, 48.31));

	coffeeNodes.forEach((coffeeNode) => {
		classpath.addVertex(coffeeNode);
	});
}

function addStoreNodes() {
	storeNodes.push(new Vertex("store", "The Grid: Leavey 6", 27.74, 59.14));
	storeNodes.push(new Vertex("store", "The Grid: Malone", 72.58, 31.81));
	storeNodes.push(new Vertex("store", "The Grid: Del Rey", 80.45, 11.20));
	storeNodes.forEach((storeNode) => {
		classpath.addVertex(storeNode);
	});
}

function addCrossNodes() {
	crossNodes.push(new Vertex("cross", "chapel", 68.2, 9.5));
}

let classpath;
function populateGraph() {
	classpath = new Graph();
	console.log("test test test");
	addBuildings();
	addPathNodes();
	addFoodNodes();
	addCoffeeNodes();
	addStoreNodes();
	addCrossNodes();
}
