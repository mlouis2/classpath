const DOT_RADIUS = 7;

class Vertex {
     constructor(vertexType, name, x, y) {
          this.vertexType = vertexType;
          this.name = name;
          this.x = x;
          this.y = y;
          this.color = "#000000";
     }
     setColor(color) {
          this.color = color;
     }
     draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.fill();
     }
}
