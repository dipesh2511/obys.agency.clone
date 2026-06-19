const timeline = gsap.timeline();
const main = document.querySelector('#main');
const loaderCount = document.querySelector('#loader .line h5');
const nowHeading = document.querySelector('.line h2');

let locoScroll;

function initLocoScroll() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        class: 'is-reveal'
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
    });

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
}

document.body.style.overflow = 'hidden'; // un comment this using to hide the scroll bar when the loader is active

const mainPageAnimation = () => {

    timeline.from("#page1 #nav", {
        opacity: 0,
        duration: 0.5,
        delay: 0.5
    })
    timeline.from('#hero-main h1', {
        y: 200,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.3
    });
};


const startCounting = () => {
    let count = 0;

    // loaderCounterDiv.style.opacity = 1;
    nowHeading.style.opacity = 1;
    nowHeading.style.animation = 'loader-now 2s linear infinite';

    const interval = setInterval(() => {
        if (count >= 100) {
            clearInterval(interval)
        }
        loaderCount.innerText = count;
        count++;
    }, 40)
}

const loaderInitiated = () => {


    // loading text of hero
    timeline.from('#loader .line h1', {
        y: 200,
        duration: 0.5,
        stagger: 0.5,
        delay: 0.5
    });

    timeline.to('#line1-part1 , .line h2 ', {
        opacity: 1,
        duration: 0.3,
        onComplete: startCounting
    });

    timeline.to('#loader', {
        y: '-100%',
        duration: 0.5,
        delay: 5,
        display: 'none',
        onComplete: () => {
            document.body.style.overflow = 'auto';
            initLocoScroll();
        }
    });

    mainPageAnimation();
}

// mainPageAnimation(); // remove from here
loaderInitiated();