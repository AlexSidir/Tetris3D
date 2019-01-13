function shape3() {
  let length = 1.8, width = 1.8;

  let shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, width );
  shape.lineTo( length, width );
  shape.lineTo( length, 0 );
  shape.lineTo( 0, 0 );

  let extrudeSettings = {
    steps: 1,
    depth: 1.8,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 1
  };
  let group = new THREE.Group();

  let geometry1 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let material1 = new THREE.MeshBasicMaterial( { color: 0x3333ff } );
  let mesh1 = new THREE.Mesh( geometry1, material1 ) ;
  mesh1.position.z = extrudeSettings.bevelSize;
  mesh1.position.x = extrudeSettings.bevelSize;
  group.add( mesh1 );

  let geometry2 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let material2 = new THREE.MeshBasicMaterial( { color: 0x3333ff } );
  let mesh2 = new THREE.Mesh( geometry2, material2 ) ;
  mesh2.position.z = extrudeSettings.depth + 3 * extrudeSettings.bevelSize;
  mesh2.position.x = extrudeSettings.bevelSize;
  group.add( mesh2 );

  let geometry3 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let material3 = new THREE.MeshBasicMaterial( { color: 0x3333ff } );
  let mesh3 = new THREE.Mesh( geometry3, material3 ) ;
  mesh3.position.z = 2 * extrudeSettings.depth + 5 * extrudeSettings.bevelSize;
  mesh3.position.x = extrudeSettings.bevelSize;
  group.add( mesh3 );

  let geometry4 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let material4 = new THREE.MeshBasicMaterial( { color: 0x3333ff } );
  let mesh4 = new THREE.Mesh( geometry4, material4 ) ;
  mesh4.position.z = 2 * extrudeSettings.depth + 5 * extrudeSettings.bevelSize;
  mesh4.position.x = length + 3 * extrudeSettings.bevelSize;
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

  completeArray.push(mesh1);
  completeArray.push(mesh2);
  completeArray.push(mesh3);
  completeArray.push(mesh4);
  
  return group;
}
