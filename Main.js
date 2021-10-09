let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene'); 


    //Create Scene
    scene = new THREE.Scene(); 

    //Create Camera
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(20, 80, 800);

    //Create Light
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(10, 10, 1);
    
    scene.add(light);

    //Create Renderer;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);  
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    })
    console.log("Hallo")
}

function animate() {
    requestAnimationFrame(animate);
    house.rotation.z += 0.005;
    renderer.render(scene, camera);
}
init();

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize)