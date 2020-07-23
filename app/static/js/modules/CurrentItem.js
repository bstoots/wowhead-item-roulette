/*
Functions
- Bind click handler
- Call external library to get new item
- Update current item
- Get previous item
*/

import { Wowhead } from './Wowhead.js';

class CurrentItem {

    constructor () {
        this.currentItemId = undefined;
        this.lastItemId = undefined;
    }

    bindClickEventTo (selector) {
        const element = document.querySelector(selector);
        // @TODO - Make sure querySelector returned something
        element.addEventListener('click', event => {
            let wowhead = new Wowhead();
            let newItemLink = wowhead.randomWowheadLink('en', 'large');
            let oldItemLink = wowhead.replaceCurrentWowheadLink(newItemLink);
            wowhead.moveWowheadLinkToHistory(oldItemLink);
            $WowheadPower.refreshLinks();
            event.preventDefault();
        });
    }

}

// const currentItem = function (selector) {
//     document.addEventListener("DOMContentLoaded", () => {
//         this.element = document.querySelector(selector);
//         if (typeof this.callback === 'function') {
//             this.callback();
//         }
//     });
// };

// //HERE WE HAVE CALLBACK WHEN OUR MODULE CAN BE USED
// currentItem.prototype.onReady = function (callback) {
//     this.callback = callback;
// };

// currentItem.prototype.getElement = function () {
//     //example object method
//     return this.element;
// };

// currentItem.prototype.write = function (text) {
//     return this.element.innerText=text;
// };

export { CurrentItem };
