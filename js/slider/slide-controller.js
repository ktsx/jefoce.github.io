import { SlideScroller } from '../extensions/slide-scroller.js'

const scroller = new SlideScroller(1)
const events = new eventsHandler()

for (const slide of scroller.list) {
    for (const event in events) {
        slide.addEventListener(event, events[event], false)
    }
}

function eventsHandler(){
    const lastTouch = {
        y: 0,
        scrolled: false
    }

    this.wheel = (e) => {
            e.preventDefault()

            // Why you don't keep one coding style? Somewhere you put semicolon, somewhere no.
            // Anyway you should call move, so calculat argument for it. Use simple conditional (ternary) operatorю
            if (e.deltaY > 0) scroller.move(1)
            else scroller.move(-1)
        }

    this.touchstart = (e) => {
        lastTouch.y = e.targetTouches[0].clientY
        lastTouch.scrolled = false
    }

    this.touchmove = (e) => {
        e.preventDefault()

        // Semicolon is presented here
        const currentTouchY = e.targetTouches[0].clientY;

        if (!lastTouch.scrolled) {
            // Semicolon isn't presented here
            // What's the magic number (0.2)?  
            const swipingY = window.innerHeight * 0.2

            // You should simplify it.
            // Get calculated value once
            // Put it to move method
            if (currentTouchY - swipingY > lastTouch.y) move(-1)
            else if ((currentTouchY + swipingY < lastTouch.y)) move(1)

            function move(direction) {
                scroller.move(direction)

                lastTouch.y = currentTouchY
                lastTouch.scrolled = true
            }
        }
    }

    // Initialization
    Object.freeze(this)
}
