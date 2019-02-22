const DOT_RADIUS = 7;

class Vertex {
     constructor(vertexType, name, xInPercent, yInPercent) {
          this.vertexType = vertexType;
          this.name = name;
          this.x = (xInPercent / 100) * imageWidth + (canvas.width - imageWidth)/2;
          this.y = (yInPercent / 100) * imageHeight + (canvas.height - imageHeight)/2;
          this.color = "#ffffff";
          this.adjacencyList = [];
     }
     setColor(color) {
          this.color = color;
     }
     draw() {
          if (this.vertexType === 'building' || this.vertexType === 'path') {
               ctx.beginPath();
               ctx.arc(this.x, this.y, DOT_RADIUS, 0, 2 * Math.PI);
               ctx.fillStyle = this.color;
               ctx.fill();
               ctx.lineWidth = 1;
               ctx.strokeStyle = "white";
               ctx.stroke();
          } else {
               console.log("food coffee store");
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
               }
          }
     }
}
