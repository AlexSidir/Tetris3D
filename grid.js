let bound = 5;

let initPosX = 1;
let initPosY = 1;
let initPosZ = 0;

let initPosX2 = 0;
let initPosY2 = 1;
let initPosZ2 = 1;

let initPosX3 = 1;
let initPosY3 = 0;
let initPosZ3 = 1;

function grid() {

  let group = new THREE.Group();

  let squareGeometry = new THREE.Geometry();
  squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
  squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

  for(let i = 0; i < 35; i++){
    if( (i % bound) == 0 && i != 0) {
      initPosY += 2;
      initPosX = 1;
    }
    createGrid( initPosX, initPosY, initPosZ, 0, 0, 0);
    initPosX += 2;
  }

  for(let i = 0; i < 35; i++){
    if( (i % bound) == 0 && i != 0) {
      initPosY2 += 2;
      initPosZ2 = 1;
    }
    createGrid( initPosX2, initPosY2, initPosZ2, 0, Math.PI/2, 0);
    initPosZ2 += 2;
  }

  for(let i = 0; i < 25; i++){
    if( (i % bound) == 0 && i != 0) {
      initPosX3 += 2;
      initPosZ3 = 1;
    }
    createGrid( initPosX3, initPosY3, initPosZ3, Math.PI/2, 0, 0);
    initPosZ3 += 2;
  }

  function createGrid(positionX, positionY, positionZ, rotationX, rotationY, rotationZ){
    let geo = new THREE.EdgesGeometry( squareGeometry );
    let squareMaterial = new THREE.LineBasicMaterial({
      color:0xFFFFFF,
      side:THREE.DoubleSide,
      linewidth: 5
    });
    let wireframea = new THREE.LineSegments( geo, squareMaterial );
    wireframea.position.set( positionX, positionY, positionZ);
    wireframea.rotation.set( rotationX, rotationY, rotationZ);
    group.add(wireframea);
  }
  return group;
}
