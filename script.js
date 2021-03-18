const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({
    antialias: true
});
const loader = new THREE.TextureLoader();
var light = new THREE.HemisphereLight( 0xffffbb, 0x887979, 2.6);
SCENE.add( light );
texture = loader.load('./bg.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 30, 30 );
texture.anisotropy = 2;
 
rendererResizer();
window.addEventListener('resize', rendererResizer);

function rendererResizer() {
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    CAMERA.aspect = window.innerWidth / window.innerHeight;
};

document.body.appendChild(RENDERER.domElement);

const GEOMETRY = new THREE.PlaneBufferGeometry(-100, -100, 150, 150);
const MATERIAL = new THREE.MeshStandardMaterial({
     
    map: texture,
    
 
    
})
const PLANE = new THREE.Mesh(GEOMETRY, MATERIAL);
PLANE.scale.x = 3;
PLANE.scale.y = 3;

PLANE.rotation.x = -1.2;
 

SCENE.add(PLANE);
let positionAttribute = GEOMETRY.attributes.position;

CAMERA.position.z = 10;
 a = 0.01;

function updateVerticles() {
    offset = Date.now() * 0.0007;
 
    for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
 
      
        z = noise.simplex2(x / 5, y / 5 + offset) * 1.3;
        positionAttribute.setZ(i, z);
       
        texture.offset.y -= a;
        if (texture.offset.y <= -20) {
            texture.offset.y = 0;
        };
       
        GEOMETRY.attributes.position.needsUpdate = true;
       
    };
};
function animate() {

    requestAnimationFrame(animate);
    RENDERER.render(SCENE, CAMERA);
    updateVerticles();
   
   
};
animate();
