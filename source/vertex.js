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
          ctx.beginPath();
          ctx.arc(this.x, this.y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.lineWidth = 1;
     }
}
