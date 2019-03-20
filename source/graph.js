const PATH_WIDTH = 3;

class Graph {
     constructor() {
          this.vertices = [];
          this.adjacencyMatrix = [];
     }
     addVertex(vertex) {
          vertex.index = this.vertices.length;
          this.vertices.push(vertex);
          this.increaseSizeOfAdjacencyMatrix(vertex);
     }
     increaseSizeOfAdjacencyMatrix(vertex) {
          this.adjacencyMatrix.push([]);
          for (let i = 0; i < this.vertices.length; i++) {
               this.adjacencyMatrix[i].push(0);
               if (i !== this.vertices.length - 1) {
                    this.adjacencyMatrix[this.vertices.length - 1].push(0);
               }
          }
     }
     addEdge(vertexA, vertexB) {
          this.adjacencyMatrix[vertexA.index][vertexB.index] = 1;
          this.adjacencyMatrix[vertexB.index][vertexA.index] = 1;
     }
     drawEdge(vertexA, vertexB) {
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.lineWidth = PATH_WIDTH;
          ctx.moveTo(vertexA.x, vertexA.y);
          ctx.lineTo(vertexB.x, vertexB.y);
          ctx.stroke();
     }
     returnVertexWithName(name) {
          for (let i = 0; i < this.vertices.length; i++) {
               if (this.vertices[i].name === name) {
                    return this.vertices[i];
               }
          }
          return null;
     }
     findPath(current, goal) {
          this.setVerticesUnvisited();
          return this.findPathFromPoint(current, goal);
     }
     findPathFromPoint(start, goal) {
          let frontier = [];
          frontier.push([start]);
          while(frontier.length > 0) {
               let currentPath = frontier.shift();
               for (let i = 0; i < currentPath.length; i++) {
               }
               let currentNode = currentPath[currentPath.length - 1];
               if (currentNode === goal) {
                    return currentPath;
               }
               currentNode.visited = true;
               let adjacentNodes = this.returnAdjacentVertices(currentNode);
               adjacentNodes.forEach(function(adjacentNode) {
                    if (!adjacentNode.visited) {
                         frontier.push(currentPath.concat([adjacentNode]));
                    }
               });
          }
          return null;
     }
     returnAdjacentVertices(vertex) {
          let adjacentVertices = [];
          for (let i = 0; i < this.vertices.length; i++) {
               if (this.adjacencyMatrix[vertex.index][i] === 1) {
                    adjacentVertices.push(this.vertices[i]);
               }
          }
          return adjacentVertices;
     }
     setVerticesUnvisited() {
          for (let i = 0; i < this.vertices.length; i++) {
               this.vertices[i].visited = false;
          }
     }
     drawPath(path) {
          if (path == null) {
               console.log("no path...");
               return;
          }
          for (let i = 0; i < path.length - 1; i++) {
               this.drawEdge(this.returnVertexWithName(path[i].name), this.returnVertexWithName(path[i + 1].name));
          }
     }
}
