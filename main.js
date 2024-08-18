import * as Three from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"


// util funcs
const configureRenderer = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 1)
}

const setCameraAspectRatio = () => {
  return window.innerWidth / window.innerHeight
}

const scene = new Three.Scene()

// Ring
const sphere = new Three.SphereGeometry(3, window.innerWidth, window.innerHeight)
const material = new Three.MeshStandardMaterial({ color:0xcfcfcf, roughness: 0.8 })

// Light
const light = new Three.SpotLight(0xffffff, 50, 100)
light.position.set(0,10,10)
scene.add(light)


// Camera
const camera = new Three.PerspectiveCamera(45, setCameraAspectRatio(), 0.1, 1000)
camera.position.z = 15
scene.add(camera)

// Mesh
const mesh = new Three.Mesh(sphere, material)
scene.add(mesh)

const renderer = new Three.WebGLRenderer()
renderer.setPixelRatio(2)
configureRenderer()
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableZoom = false
controls.enablePan = false
controls.autoRotate = true
controls.rotateSpeed = 0.5

window.addEventListener("resize", () => {
  configureRenderer()
  camera.aspect = setCameraAspectRatio()
  camera.updateProjectionMatrix()
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
loop()

const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1})
tl.fromTo(".nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})