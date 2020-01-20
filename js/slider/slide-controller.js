import { SlideScroller } from '../extensions/slide-scroller.js'

const scroller = new SlideScroller(1)

const lastTouch = {
    y: 0,
    scrolled: false
}

for (const slide of scroller.list) {

    slide.addEventListener('wheel', (e) => {
        e.preventDefault()

        if (e.deltaY > 25) scroller.move(1)
        else if (e.deltaY < -25) scroller.move(-1)
    })

    slide.addEventListener('touchstart', (e) => {
        lastTouch.y = e.targetTouches[0].clientY
        lastTouch.scrolled = false
    })

    slide.addEventListener('touchmove', (e) => {
        e.preventDefault()

        const currentTouchY = e.targetTouches[0].clientY;

        if (!lastTouch.scrolled) {
            const swipingY = window.innerHeight * 0.2

            if (currentTouchY - swipingY > lastTouch.y) move(-1)
            else if ((currentTouchY + swipingY < lastTouch.y)) move(1)

            function move(direction) {
                scroller.move(direction)

                lastTouch.y = currentTouchY
                lastTouch.scrolled = true
            }
        }
    })
}