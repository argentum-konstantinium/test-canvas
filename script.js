const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({
    antialias: true
});
const loader = new THREE.TextureLoader();

texture = loader.load('./bg.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 40, 40 );
texture.anisotropy = 2;

rendererResizer();
window.addEventListener('resize', rendererResizer);

function rendererResizer() {
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    CAMERA.aspect = window.innerWidth / window.innerHeight;
};

document.body.appendChild(RENDERER.domElement);

const GEOMETRY = new THREE.PlaneBufferGeometry(-100, -100, 100, 100);
const MATERIAL = new THREE.MeshBasicMaterial({
   
    map: texture,
   // side: THREE.DoubleSide,
   // wireframe: true,
});
const PLANE = new THREE.Mesh(GEOMETRY, MATERIAL);
PLANE.scale.x = 3;
PLANE.scale.y = 3;

PLANE.rotation.x = -1;

SCENE.add(PLANE);
let positionAttribute = GEOMETRY.attributes.position;

CAMERA.position.z = 10;


function updateVerticles() {
    offset = Date.now() * 0.001;
 
    for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        z = positionAttribute.getZ(i);
      
        z = noise.simplex2(x / 5, y / 5 + offset) * 1.2;
        positionAttribute.setXYZ(i, x, y, z);
       
         
        
        GEOMETRY.attributes.position.needsUpdate = true;
       
    };
};
function animate() {


    updateVerticles();
    GEOMETRY.attributes.position.needsUpdate = true;
    requestAnimationFrame(animate);
    RENDERER.render(SCENE, CAMERA);
};
animate();
