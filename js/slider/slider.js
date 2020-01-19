import { SlideScroller } from '../slide-scroller.js'

const scroller = new SlideScroller(1)

let lastTouchY = 0

for (const slide of scroller.list) {
    slide.addEventListener('wheel', (e) => {
        if (e.deltaY > 25) scroller.move(1)
        else if (e.deltaY < -25) scroller.move(-1)
    })

    slide.addEventListener('touchstart', (e) => {
        lastTouchY = e.targetTouches[0].clientY;
    })

    slide.addEventListener('touchmove', (e) => {
        const swipingY = window.innerHeight * 0.2;
        const currentTouchY = e.targetTouches[0].clientY;

        if (currentTouchY - swipingY > lastTouchY) scroller.move(-1)
        else if ((currentTouchY + swipingY < lastTouchY)) scroller.move(1)
    })
}