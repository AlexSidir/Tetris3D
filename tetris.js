const keyCodes = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  X: 88,
  Z: 90,
  Y: 89,
  space: 32
}

const computerClock = new THREE.Clock();
let shapeNr = Math.floor(Math.random() * 5) + 1;
let j = 0;
let block;
let last = 0;
let box ;
let maxX = 0;
let maxZ = 0;
let boundaryX = 0;
let boundaryZ = 0;
let count = 0;

let canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
renderer.setClearColor('rgb(0,0,0)');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 17;
camera.position.x = 5;

let light = new THREE.PointLight( 0xff0000, 10, 1000 );
light.position.set( 0, 5, 0 );
scene.add( light );

scene.add( grid() );

let axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
//controls.enabled = false;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  //event.preventDefault();
  let keyCode = event.which;
  console.log(keyCode);
  switch (keyCode) {
    case 38:
      if ( block.position.x > 1 ) {
        block.position.x -= 2;
      }
      break;
    case 40:
      if ( block.position.x < boundaryX  ) {
        block.position.x += 2;
      }
      break;
    case 39:
      if ( block.position.z > 1 ) {
        block.position.z -= 2;
      }
      break;
    case 37:
      if ( block.position.z < boundaryZ ) {
        block.position.z += 2;
      }
      break;
    case 88:
      block.rotation.x += Math.PI/2;
      break;
    case 90:
      block.rotation.z += Math.PI/2;
      break;
    case 89:
      block.rotation.y += Math.PI/2;
      break;
    case 32:
      while (block.position.y > 1 ) {
        block.position.y -= 2;
      }
      break;
  }
}

function render(now) {
  requestAnimationFrame(render);

  if ( j == 0 ) {
    switch (shapeNr) {
      case 1:
        block = shape1();
        block.position.y = 16 + 0.1;
        scene.add( block );
        break;
      case 2:
        block = shape2();
        block.position.y = 16 + 0.1;
        scene.add( block );
        break;
      case 3:
        block = shape3();
        block.position.y = 16 + 0.1;
        scene.add( block );
        break;
      case 4:
        block = shape4();
        block.position.y = 16 + 0.1;
        scene.add( block );
        break;
      case 5:
        block = shape5();
        block.position.y = 16 + 0.1;
        scene.add( block );
        break;
    }
    box = new THREE.Box3().setFromObject( block );
    maxX = Math.round(box.max.x);
    maxZ = Math.round(box.max.z);

    boundaryX = 10 - maxX;
    boundaryZ = 10 - maxZ;

    count++;
    document.getElementById("counter").innerHTML = "Counter: " + count;
    j++;
  }

  if(!last || now - last >= 1*1000) {
      last = now;
      if (block.position.y > 1 ){
        block.position.y -= 2;
      } else {
        shapeNr = Math.floor(Math.random() * 5) + 1;
        j = 0;
      }
  }
  controls.update();
  renderer.render(scene, camera);
}

render();
