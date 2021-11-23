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
 * Sizes
 */
 const sizes = {
    width: 626,
    height: 417
}

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

// occitanTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshBasicMaterial(
    {
        map: occitanTexture
    }
)


// Mesh
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100),
    material
)

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100),
    material
)

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100),
    material
)

scene.add(plane, plane2, plane3)
const mesh = [plane,plane2,plane3]

// Distance
const objectDistance = 3
plane2.position.x = objectDistance * 1
plane3.position.x = objectDistance * 2

// Slider


let count = 0
let nbrSlide = mesh.length

// Slide number affichage
const span = document.querySelector('.animate-text').children
const spanLen = span.length

function animateText(){
    for ( let i = 0; i<spanLen; i++)
    {
        span[i].classList.remove('text-in')
        span[i].classList.add('text-out')
    }

    span[count].classList.add('text-in')

    if(span[count].classList.contains('text-in'))
    {
        span[count].classList.remove('text-out')
    }
}

// span.innerHTML = `0${count+1} / 0${mesh.length}`


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
                duration:0.5,
                x: "+=" + 3
            }
        )
    }
    else {
        count = 0
        gsap.to(
            camera.position,
            {
                duration:0.5,
                x: 0
            }
        )
    }

    // Update slide number
    animateText()
    // span.innerHTML = `0${count+1} / 0${mesh.length}`

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
                duration:0.5,
                x: "-=" + 3
            }
        )
    }
    else {
        count = nbrSlide - 1
        gsap.to(
            camera.position,
            {
                duration:0.5,
                x: 6
            }
        )
    }

    // Update slide number
    // span.innerHTML = `0${count+1} / 0${mesh.length}`
})

/**
 * Lights
 */


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = 626
    sizes.height = 417

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
camera.position.z = 2
scene.add(camera)

const dist = camera.position.z
const height = 1
camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist))

if(sizes.width/sizes.height>1){
    plane.scale.x = camera.aspect
    plane2.scale.x = camera.aspect
    plane3.scale.x = camera.aspect
} else {
    plane.scale.y = 1 / camera.aspect
    plane2.scale.y = 1 /camera.aspect
    plane3.scale.y = 1 /camera.aspect
}


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
