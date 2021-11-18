import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const occitanTexture = textureLoader.load('/textures/4.png')
const occitanTexture1 = textureLoader.load('/textures/4.png')
const occitanTexture2 = textureLoader.load('/textures/4.png')
const occitanTexture3 = textureLoader.load('/textures/4.png')
const occitanTexture4 = textureLoader.load('/textures/4.png')

// gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshBasicMaterial(
    {
        map: occitanTexture
    }
)


// Mesh
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2, 100),
    material
)

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2, 100),
    material
)

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2, 100),
    material
)

scene.add(plane, plane2, plane3)
const mesh = [plane,plane2,plane3]

// Distance
const objectDistance = 6
plane2.position.x = objectDistance * 1
plane3.position.x = objectDistance * 2

// Slider


let count = 0
let nbrSlide = mesh.length

// Number
const span = document.querySelector('.slide-number')
span.innerHTML = `0${count+1} / 0${mesh.length}`


// Animate camera
// Suivant
const next = document.querySelector('.s1')
next.addEventListener('click', () => {
    if(count < nbrSlide - 1)
    {
        count++;

        gsap.to(
            camera.position,
            {
                duration:1,
                x: "+=" + 6
            }
        )
    }
    else {
        count = 0
        gsap.to(
            camera.position,
            {
                duration:1,
                x: 0
            }
        )
    }

    span.innerHTML = `0${count+1} / 0${mesh.length}`
})

// Précédent
const prev = document.querySelector('.s2')
prev.addEventListener('click', () => {
    if(count > 0)
    {
        count--;

        gsap.to(
            camera.position,
            {
                duration:1,
                x: "-=" + 6
            }
        )
    }
    else {
        count = nbrSlide - 1
        gsap.to(
            camera.position,
            {
                duration:1,
                x: 12
            }
        )
    }

    span.innerHTML = `0${count+1} / 0${mesh.length}`
})


/**
 * Lights
 */


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */


/**
 * Cursor
 */


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
