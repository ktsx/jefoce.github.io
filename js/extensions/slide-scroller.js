/*
 * Version: 1.0 
 * Telegram: @jefoce
 */

/**
 * Create looping transition between 3 styles by classes.
 * @param {number} index - Start position in slide-list. **Default:** 0.
 * @param {string} slideClass - Getting all slides by this class (live collection). **Default:** 'ss-slide'.
 * @param {string} prevClass - For previous slide. **Default:** 'ss-slide-prev'.
 * @param {string} currentClass - For current slide. **Default:** 'ss-slide-current'.
 * @param {string} nextClass - For next slide. **Default:** 'ss-slide-next'.
 * 
 */
export function SlideScroller(
    index = 0,
    slideClass = 'ss-slide',
    prevClass = 'ss-slide-prev',
    currentClass = 'ss-slide-current',
    nextClass = 'ss-slide-next') {

    let slides = document.getElementsByClassName(slideClass)
    let max = 0

    const canMove = {
        state: true,
        update(duration) {
            const update = (duration) => {
                this.state = false

                setTimeout(() => {
                    this.state = true
                }, duration)
            }

            update(duration)
        }
    }

    /**
     * List of slides.
     * @returns {Array} HTMLCollection by class name.
     */
    this.list = slides

    /**
     * Move layers by -/+ direction count.
     * @param {number} direction - Can be positive or negative. For defult move: -1 or 1.
     */
    this.move = (direction) => {
        if (canMove.state) {
            max = slides.length
            index = correctIndex(index + direction)

            const prev = correctIndex(index - 1)
            const next = correctIndex(index + 1)

            for (const slide of slides) {
                slide.classList.remove(
                    prevClass,
                    currentClass,
                    nextClass
                )
            }

            slides[prev].classList.add(prevClass)
            slides[index].classList.add(currentClass)
            slides[next].classList.add(nextClass)

            canMove.update(Math.max(
                getDuration(slides[prev]),
                getDuration(slides[index]),
                getDuration(slides[next]),
            ))
        }
    }

    function correctIndex(index) {
        const inverse = Math.abs(index)

        if (index >= max) {
            index %= max
        }
        else if (index < 0 && inverse <= max) {
            index = max - inverse
        }
        else if (index < 0 && inverse >= max) {
            index = max - inverse % max
        }

        return +index.toFixed() || 0
    }

    function getDuration(slide) {
        const style = window.getComputedStyle(slide)
        return +style.transitionDuration.replace('s', '') * 1000
    }

    // Initialization
    Object.freeze(this)
    this.move(0)
}