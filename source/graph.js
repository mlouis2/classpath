const PATH_WIDTH = 3;

class Graph {
     constructor() {
          this.vertices = [];
     }
     addVertex(vertex) {
          this.vertices.push(vertex);
     }
     addEdge(vertexA, vertexB) {
          vertexA.adjacencyList.push(vertexB);
          vertexB.adjacencyList.push(vertexA);
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
          return this.returnVerticesWithName(name)[0];
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
     findPath(current, goal) {
          console.log("finding path...");
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
                    console.log('current path is ' + currentPath);
                    return currentPath;
               }
               currentNode.visited = true;
               for (let i = 0; i < currentNode.adjacencyList.length; i++) {
                    if (!currentNode.adjacencyList[i].visited) {
                         frontier.push(currentPath.concat([currentNode.adjacencyList[i]]));
                    }
               }
          }
          return null;
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
