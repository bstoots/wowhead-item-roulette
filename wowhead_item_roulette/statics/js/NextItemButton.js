/**
 * Handles logic relating to controls that get new random items for the roulette
 */
class NextItemButton {

    /**
     * constructor
     * @param {string} selector Selector that will be bound to the click event
     */
    constructor (selector) {
        // String representing the selector to bind
        this.selector = selector;
        // Reference to the element bound by the selector
        this.element;
        // Default event handler in case we forget to bind one
        this.clickHandler = (event) => {
            event.preventDefault();
            console.debug('Default NextItemButton Click Handler')
        };
    }

    /**
     * Defines the function that will fire when the next item button is clicked
     * @param {function} handler Function to call
     */
    setClickHandler (handler) {
        this.clickHandler = handler;
    }

    /**
     * Bind the defined function to the element specified by selector
     */
    registerClickHandler () {
        let element = document.querySelector(this.selector);
        if (element ===  null) {
            throw new Error(`No element found for selector: ${this.selector} in NextItemButton#registerClickHandler`)
        }
        else {
            this.element = element
        }
        this.element.addEventListener('click', this.clickHandler);
    }

}

export { NextItemButton };
