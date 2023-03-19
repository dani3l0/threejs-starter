import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
// import * as CANNON from 'cannon-es'


// Canvas & resizing
const canvas = document.querySelector('#canvas')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Debug
const gui = new lil.GUI()


////////////////////////////// Code //////////////////////////////


// Scene & camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 1
camera.position.z = 3
scene.add(camera)


// Geometry
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
)
box.position.y = 0.5
box.castShadow = true
scene.add(box)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)


// Lights
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.2)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 15)
pointLight.position.set(3, 3, -1)
pointLight.castShadow = true
scene.add(pointLight)


// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/////////////////////////////////////////////////////////////////

// Animation loop
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
