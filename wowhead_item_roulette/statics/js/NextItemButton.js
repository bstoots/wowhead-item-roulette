
class NextItemButton {

    constructor (selector) {
        // @TODO - Make sure querySelector returned something
        this.element = document.querySelector(selector);
        this.clickHandler = (event) => {
            event.preventDefault();
            console.debug('Default NextItemButton Click Handler')
        };
    }

    setClickHandler (handler) {
        this.clickHandler = handler;
    }

    registerClickHandler () {
        this.element.addEventListener('click', this.clickHandler);
    }

}

export { NextItemButton };
