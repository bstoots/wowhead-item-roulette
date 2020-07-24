import { NextItemButton } from './NextItemButton.js';
import { Wowhead } from './Wowhead.js';

/**
 * Wowhead Item Roulette Front-end
 * 
 * This class configures and manages the front-end application lifecycle
 */
class WowheadRoulette {

    /**
     * constructor
     * @param {string} nextItemButtonSelector Selector that when clicked will get a new item
     */
    constructor ({domain = 'www', nextItemButtonSelector}) {
        // Initialize Wowhead util instance
        this.wowhead = new Wowhead();
        // Initialize NextItemButton instance
        this.nextItemButtonSelector = nextItemButtonSelector;
        this.nextItemButton = new NextItemButton(this.nextItemButtonSelector);
        // Maximum number of random items to get in a row when encountering undefined items
        this.domain = domain;
        this.maxUndefinedIterations = 100;
    }

    /**
     * Entry point into the front-end application.
     * Note: Top-level async isn't rolled out yet so we handle Promise propagation here.
     * 
     * @param {object|undefined} event Either a DOMContentLoaded event or undefined
     */
    start (event) {
        (async () => {
            try {
                await this.updateCurrentItemLink();
                this.initializeNextItemButton();
                $WowheadPower.refreshLinks();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    /**
     * Generates a new link and replace existing
     * 
     * @async
     * @return {object} jQuery object containing the replaced element
     */
    async updateCurrentItemLink () {
        let i;
        let itemId = this.wowhead.getRandomItemId();
        for (i = 0; i < this.maxUndefinedIterations; i++) {
            if (await this.wowhead.doesIdExistInXmlFeed(itemId)) {
                break;
            }
            itemId = this.wowhead.getRandomItemId();
        }
        // For now just bail out if this case is encountered.  In the future we 
        // should handle this more transparently.
        if (i === this.maxUndefinedIterations) {
            throw new Error("Maximum number of undefined items encountered")
        }
        let newItemLink = this.wowhead.getWowHeadLink(this.domain, itemId, 'large');
        return this.wowhead.replaceCurrentWowheadLink(newItemLink);
    }

    /**
     * Define the next item button functionality and register the on click handler
     */
    initializeNextItemButton () {
        // Define the click handler function
        this.nextItemButton.setClickHandler((event) => {
            event.preventDefault();
            let itemId;
            (async () => {
                let oldItemLink = await this.updateCurrentItemLink();
                this.wowhead.moveWowheadLinkToHistory(oldItemLink);
                $WowheadPower.refreshLinks();
            })().catch(err => {
                console.error(err);
            });
        });
        // register the configured event handler function
        this.nextItemButton.registerClickHandler();
    }

}

export { WowheadRoulette };
