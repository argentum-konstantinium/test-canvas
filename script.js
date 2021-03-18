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

PLANE.rotation.x = -1.2;
PLANE.rotation.z = 1.55;

SCENE.add(PLANE);
let positionAttribute = GEOMETRY.attributes.position;

CAMERA.position.z = 10;
t = 0;

function updateVerticles() {
    for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        z = positionAttribute.getZ(i);
        t += 0.0000006;
        z = noise.simplex3(x / 5, y / 5, t) * 1.2;
        positionAttribute.setXYZ(i, x, y, z);

    };
};
function animate() {


    updateVerticles();
    GEOMETRY.attributes.position.needsUpdate = true;
    requestAnimationFrame(animate);
    RENDERER.render(SCENE, CAMERA);
};
animate();