const PATH_WIDTH = 3;

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
          this.setVerticesUnvisited();
          this.findPathFromPoint(current, goal);
          let answer = this.correctPath;
          this.correctPathFound = false;
          this.correctPath = [];
          return answer.reverse();
     }
     findPathFromPoint(current, goal) {
          if (this.correctPathFound && !current.visited) {
               return;
          }
          if (current == null || current.visited) {
               return;
          } else {
               current.visited = true;
               if (!this.correctPathFound) {
                    if (current === goal) {
                         this.correctPathFound = true;
                    } else {
                         for (let i = 0; i < current.adjacencyList.length; i++) {
                              this.findPathFromPoint(current.adjacencyList[i], goal);
                         }
                    }
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
          for (let i = 0; i < path.length - 1; i++) {
               this.drawEdge(this.returnVertexWithName(path[i].name), this.returnVertexWithName(path[i + 1].name));
          }
     }
}
