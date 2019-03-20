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
          this.djikstras(start);
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
     djikstras(start) {
          let distances = [[0, null]];
          let done = [true];
          for (let i = 0; i < this.vertices.length - 1; i++) {
               distances.push([Number.MAX_SAFE_INTEGER, null]);
               done.push(false);
          }
          let closestUndoneNode = start;
          while (this.checkIfAnyFalseElement(done)) {
               closestUndoneNode = this.findClosestUndoneNode(start, done);
               done[closestUndoneNode.index] = true;
               let undoneNeighbors = this.getAllUndoneNeighbors(closestUndoneNode, done);
               undoneNeighbors.forEach(function(neighbor) {
                    let distance = this.getManhattanDistance(closestUndoneNode, neighbor);
                    if (distance + distances[closestUndoneNode.index] < distances[neighbor.index]) {
                         distances[neighbor.index] = [distances[closestUndoneNode.index] + distance, closestUndoneNode];
                    }
               });
          }
          console.log(distances);
     }
     checkIfAnyFalseElement(list) {
          for (let i = 0; i < list.length; i++) {
               if (list[i] === false) {
                    return true;
               }
          }
          return false;
     }
     getAllUndoneNeighbors(currentNode, done) {
          let undoneNeighbors = [];
          for (let i = 0; i < this.vertices.length; i++) {
               if (this.adjacencyMatrix[currentNode.index][i] === 1 && !done[this.vertices[i]]) {
                    undoneNeighbors.push(this.vertices[i]);
               }
          }
          return undoneNeighbors;
     }
     findClosestUndoneNode(currentNode, done) {
          let adjacentNodes = this.returnAdjacentVertices(currentNode);
          let currentClosestDistance = Number.MAX_SAFE_INTEGER;
          let currentClosestNode = null;
          adjacentNodes.forEach(function(adjacentNode) {
               if (!done[adjacentNode.index] && (this.getManhattanDistance(currentNode, adjacentNode) < currentClosestDistance)) {
                    currentClosestDistance = this.getManhattanDistance(currentNode, adjacentNode);
                    currentClosestNode = adjacentNode;
               }
          });
          return currentClosestNode;
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
     getManhattanDistance(vertexA, vertexB) {
          return Math.abs(vertexA.x - vertexB.x) + Math.abs(vertexA.y - vertexB.y);
     }
     // getIndexOfVertex(vertex) {
     //      for (let i = 0; i < this.vertices.length; i++) {
     //           if (this.vertices[i] === vertex) {
     //                return i;
     //           }
     //      }
     //      return null;
     // }
}
