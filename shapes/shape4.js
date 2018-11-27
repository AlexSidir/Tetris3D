function shape4() {
  var length = 1, width = 1;

  var shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, width );
  shape.lineTo( length, width );
  shape.lineTo( length, 0 );
  shape.lineTo( 0, 0 );

  var extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelSegments: 1
  };
  var group = new THREE.Group();

  var geometry1 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material1 = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
  var mesh1 = new THREE.Mesh( geometry1, material1 ) ;
  group.add( mesh1 );

  var geometry2 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
  var mesh2 = new THREE.Mesh( geometry2, material2 ) ;
  mesh2.position.z = extrudeSettings.depth + extrudeSettings.bevelSize;
  group.add( mesh2 );

  var geometry3 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material3 = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
  var mesh3 = new THREE.Mesh( geometry3, material3 ) ;
  mesh3.position.z = extrudeSettings.depth + extrudeSettings.bevelSize;
  mesh3.position.x = 2 * width;
  group.add( mesh3);

  var geometry4 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material4 = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
  var mesh4 = new THREE.Mesh( geometry4, material4 ) ;
  mesh4.position.z = 2 * extrudeSettings.depth + 2 * extrudeSettings.bevelSize;
  mesh4.position.x = 2 * width;
  group.add( mesh4);

  let wireframe1 = new THREE.WireframeGeometry( geometry1 );
  let line1 = new THREE.LineSegments( wireframe1 );
  line1.material.color.setHex(0x000000);
  mesh1.add(line1);

  let wireframe2 = new THREE.WireframeGeometry( geometry2 );
  let line2 = new THREE.LineSegments( wireframe2 );
  line2.material.color.setHex(0x000000);
  mesh2.add(line2);

  let wireframe3 = new THREE.WireframeGeometry( geometry3 );
  let line3 = new THREE.LineSegments( wireframe3 );
  line3.material.color.setHex(0x000000);
  mesh3.add(line3);

  let wireframe4 = new THREE.WireframeGeometry( geometry4 );
  let line4 = new THREE.LineSegments( wireframe4 );
  line4.material.color.setHex(0x000000);
  mesh4.add(line4);

  return group;
}
