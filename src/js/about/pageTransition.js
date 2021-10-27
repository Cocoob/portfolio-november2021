import gsap from 'gsap'

const wrap1 = document.querySelector('.w1')
const wrap2 = document.querySelector('.w2')


const information = document.querySelectorAll('.tr-wrap span')

window.onload = () => {
    const tl = gsap.timeline();
    tl.to(wrap1, 
        {
            x: innerWidth,
            duration:3,
        },
        '0.3')
    .to(wrap2,{
        x: -innerWidth,
        duration:3
    },
    '0.3'
    )
    information.forEach(inf => {
        tl.to(inf,
            {
                yPercent: -100,
                duration: 1
            },
            '1'
        )
    })
}