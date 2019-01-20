class Graph {
     constructor() {
          this.vertices = [];
          this.correctPath = [];
          this.correctPathFound = false;
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
          ctx.lineWidth = 5;
          ctx.moveTo(vertexA.x, vertexA.y);
          ctx.lineTo(vertexB.x, vertexB.y);
          ctx.stroke();
     }
     returnNonPathVertexWithName(name) {
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
          this.setVerticesUnvisited();
          this.findPathFromPoint(current, goal);
          let answer = this.correctPath;
          this.correctPathFound = false;
          this.correctPath = [];
          //This does return a backwards array, but it also doesn't matter bc the edges are uncolored. so whatever.
          return answer;
     }
     findPathFromPoint(current, goal) {
          if (current == null || current.visited) {
               return;
          } else {
               current.visited = true;
               for (let i = 0; i < current.adjacencyList.length; i++) {
                    this.findPathFromPoint(current.adjacencyList[i], goal);
               }
               if (!this.correctPathFound && current === goal) {
                    this.correctPathFound = true;
               }
               if (this.correctPathFound) {
                    this.correctPath.push(current);
               }
          }
     }
     setVerticesUnvisited() {
          for (let i = 0; i < this.vertices.length; i++) {
               this.vertices[i].visited = false;
          }
     }
     drawPath(path) {
          console.log("the path is " + path);
          for (let i = 0; i < path.length - 1; i++) {
               this.drawEdge(this.returnNonPathVertexWithName(path[i].name), this.returnNonPathVertexWithName(path[i + 1].name));
          }
     }
}
