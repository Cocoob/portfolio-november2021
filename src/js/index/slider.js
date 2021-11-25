import * as THREE from 'three'
import gsap from 'gsap'

import sliderVertexShader from '../../shaders/slider/vertexSlider.glsl'
import sliderFragmentShader from '../../shaders/slider/fragmentSlider.glsl'

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
const plenetudeTexture = textureLoader.load('/textures/agricultrice.jpg')
const tricatelTexture = textureLoader.load('/textures/tricatel.jpg')
const travelTexture = textureLoader.load('/textures/trip.png')
const galaxyTexture = textureLoader.load('/textures/galaxy.png')
const seaTexture = textureLoader.load('/textures/2.png')
const boxeTexture = textureLoader.load('/textures/boxe.jpg')


// Slider
const spanText = document.querySelector('.animate-text').children
const spanTitle1 = document.querySelector('.a1').children
const spanTitle2 = document.querySelector('.a2').children
const description = document.querySelector('.project-description').children
let count = 0

// Slide number affichage
const spanLen = spanText.length

function animateText()
{
    for ( let i = 0; i<spanLen; i++)
    {
        // Number
        spanText[i].classList.remove('text-in')
        spanText[i].classList.add('text-out')

        // Title
        spanTitle1[i].classList.remove('text-in')
        spanTitle2[i].classList.remove('text-in')

        // Description
        description[i].classList.remove('text-in')
    }

    // Number
    spanText[count].classList.add('text-in')

    // Title
    spanTitle1[count].classList.add('text-in')
    spanTitle2[count].classList.add('text-in')

    // Description
    description[count].classList.add('text-in')


    if(spanText[count].classList.contains('text-in'))
    {
        spanText[count].classList.remove('text-out')
    }
}


// Animate camera
// Suivant
const next = document.querySelector('.project-description')
next.addEventListener('click', () => {

    if(count < spanLen - 1)
    {
        count++;

        gsap.to(
            camera.position,
            {
                duration:0.5,
                x: "+=" + (sizes.width/sizes.height)
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

    animateText()
})

// Précédent
const prev = document.querySelector('.a2')
prev.addEventListener('click', () => {
    if(count > 0)
    {
        count--;

        gsap.to(
            camera.position,
            {
                duration:0.5,
                x: "-=" + (sizes.width/sizes.height)
            }
        )
    }
    else {
        count = spanLen - 1
        gsap.to(
            camera.position,
            {
                duration:0.5,
                x: (spanLen-1) * (sizes.width/sizes.height)
            }
        )
    }

    animateText()
})

// Material
const material = new THREE.ShaderMaterial(
    {
        uniforms:
        {
            uTexture: {value : null}
        },
        vertexShader: sliderVertexShader,
        fragmentShader: sliderFragmentShader
    }
)


// Mesh
let projects = [...document.querySelectorAll('.animate-title span')]
let images = [plenetudeTexture,occitanTexture,tricatelTexture,travelTexture,galaxyTexture,seaTexture,boxeTexture]
images.forEach((img,i) => 
{
    let mat = material.clone()
    mat.uniforms.uTexture.value = img
    mat.uniforms.uTexture.value.needsUpdate = true

    let geo = new THREE.PlaneGeometry(1.5,1,20,20)
    let mesh = new THREE.Mesh(geo,mat)
    scene.add(mesh)
    mesh.position.x = i * (sizes.width/sizes.height)
})

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 100),
//     material
// )

// const plane2 = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 100),
//     material
// )

// const plane3 = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 100),
//     material
// )

// scene.add(plane, plane2, plane3)
// const mesh = [plane,plane2,plane3]

// // Distance
// const objectDistance = 1.501
// plane2.position.x = objectDistance * 1
// plane3.position.x = objectDistance * 2

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
camera.updateProjectionMatrix()

// if(sizes.width/sizes.height>1){
//     plane.scale.x = camera.aspect
//     plane2.scale.x = camera.aspect
//     plane3.scale.x = camera.aspect
// } else {
//     plane.scale.y = 1 / camera.aspect
//     plane2.scale.y = 1 /camera.aspect
//     plane3.scale.y = 1 /camera.aspect
// }


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
