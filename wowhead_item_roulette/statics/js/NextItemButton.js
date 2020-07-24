
class NextItemButton {

    constructor (selector) {
        this.selector = selector;
        this.element;
        this.clickHandler = (event) => {
            event.preventDefault();
            console.debug('Default NextItemButton Click Handler')
        };
    }

    setClickHandler (handler) {
        this.clickHandler = handler;
    }

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
