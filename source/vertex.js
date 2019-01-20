const DOT_RADIUS = 7;

class Vertex {
     constructor(vertexType, name, xInPercent, yInPercent) {
          this.vertexType = vertexType;
          this.name = name;
          this.x = (xInPercent / 100) * canvas.width;
          this.y = (yInPercent / 100) * canvas.height;
          this.color = "#000000";
     }
     setColor(color) {
          this.color = color;
     }
     draw() {
          ctx.beginPath();
          console.log("drawing dot at " + this.x + " and " + this.y);
          ctx.arc(this.x, this.y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.fill();
     }
}
