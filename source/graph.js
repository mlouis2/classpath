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
     returnBuildingVertexWithName(name) {
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
          this.findPathFromPoint();
          let answer = this.correctPath;
          this.correctPathFound = false;
          this.correctPath = [];
          return answer;
     }

     findPathFromPoint(current, goal) {
          if (current == null) {
               return;
          } else {
               for (let i = 0; i < current.adjacencyList.length; i++) {
                    this.findPath(current.adjacencyList[i], goal);
               }
               if (!this.correctPathFound && current === goal) {
                    this.correctPathFound = true;
               }
               if (this.correctPathFound) {
                    this.correctPath.push(current);
               }
          }
     }
}
