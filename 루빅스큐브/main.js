function Rubik(element, dimensions, background) {

  dimensions = 3;
  background = 0x444444;

  var width = element.innerWidth(),
      height = element.innerHeight();

  var scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000),
      renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setClearColor(background, 1.0);
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  element.append(renderer.domElement);

  camera.position = new THREE.Vector3(-20, 20, 30);
  camera.lookAt(scene.position);
  THREE.Object3D._threexDomEvent.camera(camera);


  scene.add(new THREE.AmbientLight(0xffffff));

  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

  var colours = [0xCC0000, 0x269224, 0x1818CC, 0xFF7C00, 0xFFFF00, 0xEEEEEEF],
      faceMaterials = colours.map(function(c) {
        return new THREE.MeshLambertMaterial({ color: c , ambient: c });
      }),
      cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

  var cubeSize = 3,
      spacing = 0.2;

  var increment = cubeSize + spacing,
      allCubes = [];

  function newCube(x, y, z) {
    var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;

    cube.position = new THREE.Vector3(x, y, z);
   
    scene.add(cube);
    allCubes.push(cube);
  }

  var positionOffset = (dimensions - 1) / 2;
  for(var i = 0; i < dimensions; i ++) {
    for(var j = 0; j < dimensions; j ++) {
      for(var k = 0; k < dimensions; k ++) {

        var x = (i - positionOffset) * increment,
            y = (j - positionOffset) * increment,
            z = (k - positionOffset) * increment;

        newCube(x, y, z);
      }
    }
  }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

 
}

