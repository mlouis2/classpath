const DOT_RADIUS = 7;

class Vertex {
     constructor(vertexType, name, xInPercent, yInPercent) {
          this.vertexType = vertexType;
          this.name = name;
          this.x = (xInPercent / 100) * imageWidth + (canvas.width - imageWidth)/2;
          this.y = (yInPercent / 100) * imageHeight + (canvas.height - imageHeight)/2;
          if (this.vertexType !== 'building' && this.vertexType !== 'path'){
            this.x -= 25;
            this.y -= 25;
          }
          this.color = "#ffffff";
          this.accessible = true;
          this.bikePath = false;
          this.drivePath = false;
     }
     setAbleToBike() {
          this.bikePath = true;
     }
     setAbleToDrive() {
          this.drivePath = true;
     }
     setColor(color) {
          this.color = color;
     }
     draw(radius = DOT_RADIUS) {
          if (this.vertexType === 'building' || this.vertexType === "path") {
               ctx.beginPath();
               ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
               ctx.fillStyle = this.color;
               ctx.fill();
               ctx.lineWidth = 1;
               ctx.strokeStyle = "white";
               ctx.stroke();
          } else {
               switch (this.vertexType) {
                    case 'food':
                         ctx.drawImage(hamburgerImage, this.x, this.y, 50, 50);
                         break;
                    case 'coffee':
                         ctx.drawImage(coffeeImage, this.x, this.y, 50, 50);
                         break;
                    case 'store':
                         ctx.drawImage(sodaImage, this.x, this.y, 50, 50);
                         break;
                    case 'cross':
                         ctx.drawImage(crossImage, this.x, this.y, 50, 50);
                         break;
                    case 'bikeRack':
                         break;
                    case 'parkingLot':
                         break;
               }
          }
     }
}
