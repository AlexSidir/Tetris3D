"use strict"

const keyCodes = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  X: 88,
  Z: 90,
  Y: 89,
  A: 65,
  Q: 81,
  space: 32
}

let twoMilliseconds = 200;
let oneSecond = 1000;
let shapeNr = Math.floor(Math.random() * 5) + 1;
let j = 0;
let block;
let last = 0;
let box;
let maxX = 0;
let maxZ = 0;
let boundaryX = 0;
let boundaryZ = 0;
let count = 0;
let speed = 2;
let constantMovement = 2;
let initialPositionX = 2;
let initialPositionZ = 2;
let nextEmpty = true;
let gameOver = false;
let gameOverCounter = 0;
let lowestPosition = 1;
let highestPosition = 11;
let startingPosition = 24;
let bevelOffset = 0.1;
let maximumX = 10, maximumZ = 10,
minimumX = 0, minimumZ = 0;
let standardSpeed = 2;
let zeroSpeed = 0;

let shapes = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5
}

let manual = document.getElementById('manual');
let automatic = document.getElementById('automatic');
automatic.checked = true;
manual.checked = false;

function manualFunction () {
  speed = szeroSpeed;
  manual.checked = true;
  automatic.checked = false;
}

function automaticFunction () {
  speed = standardSpeed;
  manual.checked = false;
  automatic.checked = true;
}

init(12,5,5);

let canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
renderer.setClearColor('rgb(0,0,0)');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 14;
camera.position.y = 28;
camera.position.x = 14;

let light = new THREE.PointLight( 0xff0000, 10, 1000 );
light.position.set( 0, 5, 0 );
scene.add( light );

scene.add( grid() );

const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  let keyCode = event.which;

  switch (keyCode) {
    case keyCodes.up:
    if ( block.position.x > lowestPosition ) {
      block.position.x -= constantMovement;
    }
    break;
    case keyCodes.down:
    if ( block.position.x < boundaryX  ) {
      block.position.x += constantMovement;
    }
    break;
    case keyCodes.right:
    let abox = new THREE.Box3().setFromObject( block );
    maxZ = Math.round(abox.max.z);
    let boundaryZmin = 10 - maxZ;
    if ( block.position.z > lowestPosition ) {
      block.position.z -= constantMovement;
    }
    break;
    case keyCodes.left:
    let bbox = new THREE.Box3().setFromObject( block );
    maxZ = Math.round(bbox.max.z);
    boundaryZ = maximumZ + block.position.z - maxZ;

    if ( block.position.z < boundaryZ ) {
      block.position.z += constantMovement;
    }
    break;
    case keyCodes.X:
    let rotationAllowed = true;
    let clonedObj = block.clone();
    clonedObj.rotation.x += Math.PI/2;
    for(let q = 0; q < block.children.length; q++ ) {
      clonedObj.updateMatrixWorld();
      let vector = new THREE.Vector3();
      vector.setFromMatrixPosition( clonedObj.children[q].matrixWorld );
      let x = Math.round(vector.x)/2,
      y = Math.round(vector.y)/2,
      z = Math.round(vector.z)/2;
      if( x < minimumX || x > maximumX || z > maximumZ || z < minimumZ) {
        rotationAllowed = false;
      }
    }
    if(rotationAllowed){
      block.rotation.x += Math.PI/2;
    }
    break;
    case keyCodes.Z:
    let rotationAllowed1 = true;
    let clonedObj1 = block.clone();
    clonedObj1.rotation.x += Math.PI/2;
    for(let q = 0; q < block.children.length; q++ ){
      clonedObj1.updateMatrixWorld();
      let vector = new THREE.Vector3();
      vector.setFromMatrixPosition( clonedObj1.children[q].matrixWorld );
      let x = Math.round(vector.x)/2,
      y = Math.round(vector.y)/2,
      z = Math.round(vector.z)/2;
      if( x - 0.1 < minimumX || x > maximumX || z > maximumZ || z  < minimumZ) {
        rotationAllowed1 = false;
      }
    }
    if(rotationAllowed1){
      block.rotation.z += Math.PI/2;
    }
    break;
    case keyCodes.Y:
    let rotationAllowed2 = true;
    let clonedObj2 = block.clone();
    clonedObj2.rotation.x += Math.PI/2;
    for(let q = 0; q < block.children.length; q++ ){
      clonedObj2.updateMatrixWorld();
      let vector = new THREE.Vector3();
      vector.setFromMatrixPosition( clonedObj2.children[q].matrixWorld );
      let x = Math.round(vector.x)/2,
      y = Math.round(vector.y)/2,
      z = Math.round(vector.z)/2;
      if( x  < minimumX || x > maximumX || z > maximumZ || z  < minimumZ) {
        rotationAllowed2 = false;
      }
    }
    if(rotationAllowed2) {
      block.rotation.y += Math.PI/2;
    }
    break;
    case keyCodes.space:
    while (block.position.y > lowestPosition && nextEmpty == true) {
      for (let t = 0; t < block.children.length; t++) {
        block.updateMatrixWorld();
        let vector = new THREE.Vector3();
        vector.setFromMatrixPosition( block.children[t].matrixWorld );
        let x = Math.round(vector.x)/2,
        y = Math.round(vector.y)/2,
        z = Math.round(vector.z)/2;
        if( y > 0 ) {
          let value = array[y-1][x][z];
          if ( value == Pieces.STATES.FIXED ) {
            nextEmpty = false;
          }
        }
      }
      if (nextEmpty == true) {
        block.position.y -= constantMovement;
      }
    }
    break;
    case keyCodes.A:
    if (block.position.y > lowestPosition && nextEmpty == true){
      block.position.y -= constantMovement;
    }
    break;
    case keyCodes.Q:
    if (block.position.y < 22) {
      block.position.y += constantMovement;
    }
    break;
  }
}

function addBlock() {
  switch (shapeNr) {
    case shapes.one:
    block = shape1();
    block.position.y = startingPosition + bevelOffset;
    block.position.z += initialPositionZ;
    block.position.x += initialPositionX;
    scene.add( block );
    break;
    case shapes.two:
    block = shape2();
    block.position.y = startingPosition + bevelOffset;
    block.position.z += initialPositionZ;
    block.position.x += initialPositionX;
    scene.add( block );
    break;
    case shapes.three:
    block = shape3();
    block.position.y = startingPosition + bevelOffset;
    block.position.z += initialPositionZ;
    block.position.x += initialPositionX;
    scene.add( block );
    break;
    case shapes.four:
    block = shape4();
    block.position.y = startingPosition + bevelOffset;
    block.position.z += initialPositionZ;
    block.position.x += initialPositionX;
    scene.add( block );
    break;
    case shapes.five:
    block = shape5();
    block.position.y = startingPosition + bevelOffset;
    block.position.z += initialPositionZ;
    block.position.x += initialPositionX;
    scene.add( block );
    break;
  }
}

function render(now) {
  requestAnimationFrame(render);
  if ( j == 0 ) {
    addBlock();

    nextEmpty = true;
    box = new THREE.Box3().setFromObject( block );

    maxX = Math.round(box.max.x);
    maxZ = Math.round(box.max.z);

    boundaryX = maximumX + block.position.x - maxX;
    boundaryZ = maximumZ + block.position.z - maxZ;

    j++;
    count++;
    document.getElementById("counter").innerHTML = "Counter: " + count;
  }
  if(!last || now - last >= twoMilliseconds) {
    checkIfLevelIsFull();
    for (let t = 0; t < block.children.length; t++) {
      block.updateMatrixWorld();
      let vector = new THREE.Vector3();
      vector.setFromMatrixPosition( block.children[t].matrixWorld );
      let x = Math.round(vector.x)/2,
      y = Math.round(vector.y)/2,
      z = Math.round(vector.z)/2;
      if( y > 0 && y < 12) {
        let value = array[y-1][x][z];
        if ( value == Pieces.STATES.FIXED ) {
          nextEmpty = false;
        }
      }
      if (array[highestPosition][x][z] == Pieces.STATES.FIXED) {
        gameOver = true;
      }
    }
  }
  if(!last || now - last >= oneSecond) {
    last = now;
    if (block.position.y > lowestPosition && nextEmpty == true) {
      block.position.y -= speed;
    } else {
      if (!gameOver){
        for(let t = 0; t < block.children.length; t++ ){
          block.updateMatrixWorld();
          let vector = new THREE.Vector3();
          vector.setFromMatrixPosition( block.children[t].matrixWorld );
          let x = Math.round(vector.x)/2,
          y = Math.round(vector.y)/2,
          z = Math.round(vector.z)/2;
          array[y][x][z] = Pieces.STATES.FIXED;
        }
        shapeNr = Math.floor(Math.random() * 5) + 1;
        j = 0;
      } else {
        if(gameOverCounter == 0) {
          alert ("Game Over!\n     (x__x)");
          gameOverCounter++;
        }
      }
    }
  }
  controls.update();
  renderer.render(scene, camera);
}

render();
