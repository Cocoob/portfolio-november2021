import gsap from 'gsap'

const next = document.querySelector('.img-box .s-next')
const prev = document.querySelector('.img-box .s-prev')
const images = document.querySelectorAll('.img-box img')
const nbrSlide = images.length
let count = 0


next.addEventListener('click', () => {

    images[count].classList.remove('active')

    if(count < nbrSlide - 1)
    {
        count++;
    }
    else {
        count = 0
    }

    images[count].classList.add('active')
})

prev.addEventListener('click', () => {

    images[count].classList.remove('active')

    if(count > 0)
    {
        count--;
    }
    else {
        count = nbrSlide - 1
    }

    images[count].classList.add('active')
})