
let canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(0,0,0)');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 10;
const ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);

scene.add( shape1() );
//scene.add( shape2() );
//scene.add( shape3() );
//scene.add( shape4() );
//scene.add( shape5() );

let sizeX = 5;
var boundingBoxConfig = {
  width: 10,
  height: 10,
  depth: 0.1,
  splitX: 10,
  splitY: 10,
  splitZ: 10
};

let si = 8;
let wi = 8;
let geo =   new THREE.CubeGeometry(
    boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth,
    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
let boundingBox = new THREE.Mesh(geo, new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } ));

boundingBox.position.set( -boundingBoxConfig.width/2, boundingBoxConfig.height/2, 0);
scene.add(boundingBox);

let geo2 =   new THREE.CubeGeometry(
    boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth,
    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
var boundingBox2 = new THREE.Mesh(geo2, new THREE.MeshBasicMaterial( { color: 0x05FCE0, wireframe: true } ));
boundingBox2.position.set( 0,  boundingBoxConfig.height/2,   boundingBoxConfig.width/2);
boundingBox2.rotation.set(0,Math.PI/2,0);
scene.add(boundingBox2);

let geo3 =   new THREE.CubeGeometry(
    boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth,
    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
var boundingBox3 = new THREE.Mesh(geo3, new THREE.MeshBasicMaterial( { color: 0xEA05FC, wireframe: true } ));
boundingBox3.position.set( -boundingBoxConfig.width/2, 0,  boundingBoxConfig.height/2);
boundingBox3.rotation.set(Math.PI/2,0,0);
scene.add(boundingBox3);


var axesHelper = new THREE.AxesHelper( 35 );
scene.add( axesHelper );
//const controls = new THREE.TrackballControls( camera, canvas );
//controls.rotateSpeed = 2;
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );

function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}

render();
