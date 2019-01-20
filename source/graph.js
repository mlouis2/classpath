class Graph {
     constructor() {
          this.vertices = [];
          this.adjacencyMatrix = new Map();
     }
     addVertex(vertex) {
          this.vertices.push(vertex);
          this.adjacencyMatrix.set(vertex, []);
     }
     addEdge(vertexA, vertexB) {
          this.adjacencyMatrix.get(vertexA).push(vertexB);
          this.adjacencyMatrix.get(vertexA).push(vertexB);
     }
     drawEdge(vertexA, vertexB) {
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.moveTo(vertexA.x, vertexA.y);
          ctx.lineTo(vertexB.x, vertexB.y);
          ctx.stroke();
     }
     returnVerticesWithName(name) {
          let correctVertices = [];
          for (let i = 0; i < this.vertices.length; i++) {
               if (this.vertices[i].name === name) {
                    correctVertices.push(this.vertices[i]);
               }
          }
          return correctVertices;
     }
}
