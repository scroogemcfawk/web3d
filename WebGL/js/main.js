import * as T from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {PointLightHelper} from "three";
import {mod} from "three/nodes";

const M = Math


const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 3, 3);

export const renderer = new T.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let model;
const loader = new GLTFLoader();
loader.load( 'assets/Star_Tinkoff.gltf', function ( gltf ) {
    model = gltf.scene;
    // model.position.z = -2;
    // model.position.y = 1;
    // model.position
    scene.add( model );
}, undefined, function ( error ) {
    console.error( error );
} );

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new T.Clock();
clock.start();

const geometry = new T.BoxGeometry(1, 1, 1);
const material = new T.MeshBasicMaterial({color: 0xff77ff});
const cube = new T.Mesh(geometry, material);
// scene.add(cube);

const ambiend = new T.AmbientLight(0xffffff, 0.5);
scene.add(ambiend);

const pointLight = new T.PointLight(0x7777aa, 2, 0);
const rimLight = new T.HemisphereLight(0xffffff, 0x000000, 0.5, 5);
rimLight.position.set(0, -10, 0);
const pointLightHelper = new T.PointLightHelper(pointLight);
pointLight.position.set(0, 3, -3);

const ghelper = new T.GridHelper;


// scene.add(pointLight, pointLightHelper, ghelper, rimLight);
scene.add(pointLight, rimLight);


function animate() {
    requestAnimationFrame(animate);
    model.rotation.y = M.sin(clock.getElapsedTime()) / M.PI / 2;
    model.rotation.z = M.sin(clock.getElapsedTime() * 2) / M.PI / 3;
    model.rotation.x = M.sin(clock.getElapsedTime() * 2) / M.PI / 3;
    //
    renderer.render(scene, camera);
}

animate();


