// import { Wowhead } from './Wowhead.js';

class NextItemButton {

    constructor (selector) {
        // @TODO - Make sure querySelector returned something
        this.element = document.querySelector(selector);
        this.clickHandler = (event) => {
            console.debug('Default NextItemButton Click Handler')
        };
    }

    setClickHandler (handler) {
        this.clickHandler = handler;
        return this;
    }

    bind () {
        this.element.addEventListener('click', function(event) {
            // console.debug(this)
            this.clickHandler(event);
            event.preventDefault();
        }.bind(this));
        return this;
    }

}

export { NextItemButton };
