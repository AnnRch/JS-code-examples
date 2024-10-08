import * as THREE from "../node_modules/three/build/three.module.js";
import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();

// const camera = new THREE.OrthographicCamera(-1, 1, 1,-1, 0.1, 10);
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const cameraControl = new OrbitControls(camera, renderer.domElement);
cameraControl.target.set(0,0,0);
cameraControl.update();

function VertexShader(){

    return `
        uniform float u_time;
        void main(){

            float radius = 3.0;
            float delta = (sin(u_time) + 1.0) / 2.0;
            vec3 vector = normalize(position) * radius;
            vec3 result_pos = mix(position, vector, delta); 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(result_pos, 1.0);
        }
    `;
    
}


function Frag(){

    return `
    
        void main(){

            vec3 color = vec3(1.0,1.0,0.0);
            gl_FragColor = vec4(color, 1.0);
        }
    
    `;

}





const uniforms = {

    u_mouse: {value: {x: 0.0, y: 0.0}},
    u_resolution: {value: {x: width, y: height}},
    u_time: {value: 0.0}
};

const plane = new THREE.PlaneGeometry(5, 5);
const cube = new THREE.BoxGeometry(5,5,5,5,5,5);
const sphere = new THREE.SphereGeometry(10,25,25);
const cone = new THREE.ConeGeometry(10, 20, 30);
const material = new THREE.ShaderMaterial(

    {
        vertexShader: VertexShader(),
        fragmentShader: Frag(),
        uniforms,
        side: THREE.DoubleSide,
        wireframe: true

    }
);

const mesh = new THREE.Mesh(cube, material);

scene.add(mesh);

camera.position.z = 5.0;

const clock = new THREE.Clock();

const animate = function(){

    uniforms.u_time.value = clock.getElapsedTime();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}; 

animate();

document.addEventListener("mousemove", event => {

    // console.log("X: " +  event.clientX);
    // console.log("Y: " + event.clientY);
    uniforms.u_mouse.value.x = event.clientX;
    uniforms.u_mouse.value.y = event.clientY;


});