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
}
