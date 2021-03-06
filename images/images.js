//Creates the map image
let mapImage = new Image();

//Creates the LMU Logo
let lmuLogo = new Image();
lmuLogo.src = "images/LionDrawing.png";

//Creates the compass image
let compass = new Image();
compass.src = "images/compass.png";

//Creates coffee, hamburger, and c-store images
let coffeeImage = new Image();
coffeeImage.src = "images/coffeeIcon.png";
let hamburgerImage = new Image();
hamburgerImage.src = "images/foodIcon.png";
let sodaImage = new Image();
sodaImage.src = "images/storeIcon.png";
let treesImage = new Image();
treesImage.src = "images/palmTrees.png";
let crossImage = new Image();
crossImage.src = "images/religionIcon.png";

let walkImage = new Image();
walkImage.src = "images/walkIcon.png";
let bikeImage = new Image();
bikeImage.src = "images/bikeIcon.png";
let driveImage = new Image();
driveImage.src = "images/carIcon.png";

var walkIconFromHTML = document.images[0];
walkImage.onload = function(){
    walkIconFromHTML.src = walkImage.src;
};
var bikeIconFromHTML = document.images[1];
bikeImage.onload = function(){
    bikeIconFromHTML.src = bikeImage.src;
};
var driveIconFromHTML = document.images[2];
driveImage.onload = function(){
    driveIconFromHTML.src = driveImage.src;
};


let bikeRackImage = new Image();
bikeRackImage.src = "images/brownBikeIcon.png";
