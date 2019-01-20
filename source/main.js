const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let classpath = new Graph();
classpath.addVertex(new Vertex("building", "seaver", 10, 20));
classpath.addVertex(new Vertex("building", "lsb", 20, 30));
for (let i = 0; i < classpath.vertices.length; i++) {
     console.log(classpath.vertices[i].name);
}
