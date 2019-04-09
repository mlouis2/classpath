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
     vertexValidForPath(vertex, start, goal, transportationMethod) {
          if ((transportationMethod === "bike" && !vertex.bikePath) || (transportationMethod === "drive" && !vertex.drivePath)) {
               return false;
          }
          return (((vertex.vertexType === "building" || vertex.vertexType === "path") &&
                    this.hasNeighbors(vertex)) && (vertex.accessible || (vertex === start || vertex === goal)));
     }
     findPath(start, goal, transportationMethod) {
          let undoneNodes = [];
          let distances = [];
          for (let i = 0; i < this.vertices.length; i++) {
               distances.push([Number.MAX_SAFE_INTEGER, null]);
               if (this.vertexValidForPath(this.vertices[i], start, goal, transportationMethod)) {
                    undoneNodes.push(this.vertices[i]);
               }
          }
          if (undoneNodes.length === 0) {
               return null;
          }
          distances[start.index] = [0, null];
          let closestUndoneNode = start;
          while (undoneNodes.length > 0) {
               closestUndoneNode = this.findClosestUndoneNode(distances, undoneNodes);
               undoneNodes.splice(undoneNodes.indexOf(closestUndoneNode), 1);
               let undoneNeighbors = this.getAllUndoneNeighbors(closestUndoneNode, undoneNodes);
               undoneNeighbors.forEach((neighbor) => {
                    const distance = distances[closestUndoneNode.index][0] + this.getManhattanDistance(closestUndoneNode, neighbor);
                    if (distance < distances[neighbor.index][0]) {
                         distances[neighbor.index] = [distance, closestUndoneNode];
                    }
               });
          }
          let path = [goal];
          let currentNode = goal;
          while (currentNode !== start && currentNode !== null) {
               currentNode = distances[currentNode.index][1];
               if (currentNode !== null) {
                    path.push(currentNode);
               }
          }
          path.push(start);
          path = path.reverse();
          return (path !== null) ? path : null;
     }
     getAllUndoneNeighbors(currentNode, undoneNodes) {
          let undoneNeighbors = [];
          for (let i = 0; i < undoneNodes.length; i++) {
               if (this.adjacencyMatrix[currentNode.index][undoneNodes[i].index] === 1) {
                    undoneNeighbors.push(undoneNodes[i]);
               }
          }
          return undoneNeighbors;
     }
     findClosestUndoneNode(distances, undoneNodes) {
          let currentClosestDistance = Number.MAX_SAFE_INTEGER;
          let currentClosestNode = null;
          undoneNodes.forEach((vertex) => {
               if (distances[vertex.index][0] < currentClosestDistance) {
                    currentClosestDistance = distances[vertex.index][0];
                    currentClosestNode = vertex;
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
     drawPath(path) {
          if (path == null) {
               console.log("No valid path could be formed.");
               return;
          }
          for (let i = 0; i < path.length - 1; i++) {
               this.drawEdge(this.returnVertexWithName(path[i].name), this.returnVertexWithName(path[i + 1].name));
          }
     }
     getManhattanDistance(vertexA, vertexB) {
          return Math.abs(vertexA.x - vertexB.x) + Math.abs(vertexA.y - vertexB.y);
     }
     hasNeighbors(vertex) {
          return (this.returnAdjacentVertices(vertex).length !== 0);
     }
}
