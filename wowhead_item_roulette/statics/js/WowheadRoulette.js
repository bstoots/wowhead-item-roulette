import { NextItemButton } from './NextItemButton.js';

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
    constructor ({subdomain = 'www', nextItemButtonSelector}) {
        // Initialize NextItemButton instance
        this.nextItemButtonSelector = nextItemButtonSelector;
        this.nextItemButton = new NextItemButton(this.nextItemButtonSelector);
        // 
        this.subdomain = subdomain;
        this.minItemId = 120000;
        this.maxItemId = 180000;
        // Maximum number of random items to get in a row when encountering undefined items
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
        let itemId = this.getRandomItemId();
        for (i = 0; i < this.maxUndefinedIterations; i++) {
            if (await this.doesIdExistInXmlFeed(itemId)) {
                break;
            }
            itemId = this.getRandomItemId();
        }
        // For now just bail out if this case is encountered.  In the future we 
        // should handle this more transparently.
        if (i === this.maxUndefinedIterations) {
            throw new Error("Maximum number of undefined items encountered")
        }
        let newItemLink = this.getWowHeadLink(this.subdomain, itemId, 'large');
        return this.replaceCurrentWowheadLink(newItemLink);
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
                this.moveWowheadLinkToHistory(oldItemLink);
                $WowheadPower.refreshLinks();
            })().catch(err => {
                console.error(err);
            });
        });
        // register the configured event handler function
        this.nextItemButton.registerClickHandler();
    }

    /**
     * Gets a random item id according to global or call-time range
     * @param {integer} minItemId Optionally specify minItemId
     * @param {integer} maxItemId Optionally specify maxItemId
     */
    getRandomItemId (minItemId = this.minItemId, maxItemId = this.maxItemId) {
        // Enforce some basic sanity on min and max item values but if we got garbage warn and proceed
        if (minItemId < 0) {
            console.warn(`minItemId may not be less than zero, got: ${minItemId}.  Proceeding with defaults.`);
            minItemId = this.minItemId;
        }
        if (minItemId > maxItemId) {
            console.warn(`minItemId: ${minItemId} may not be less than maxItemId: ${maxItemId}. Proceeding with defaults.`);
            minItemId = this.minItemId;
            maxItemId = this.maxItemId;
        }
        return Math.floor(Math.random() * (maxItemId - minItemId)) + minItemId;
    }

    /**
     * Send a GET request to our item exists endpoint to make sure the specified itemId actually exists.
     * We need to do this because we are not able to make cross-site requests to Wowhead to determine
     * this from the browser.
     * @param {integer} itemId 
     */
    async doesIdExistInXmlFeed (itemId) {
        let response = await fetch(`/item_id/${itemId}/exists`);
        let data = await response.json();
        // @TODO - More error handling here to make sure the response is as expected.
        return data.exists;
    }

    /**
     * Parse the subdomain from a URL string.
     * @param  {string} url  URL string
     * @return {string}      Subdomain part of the URL.  e.g. www, ptr, de.
     */
    getSubdomainFromUrl (url) {
        const regex = /^https?:\/\/(.+?)\.wowhead.com\/.*?$/;
        let m = regex.exec(url);
        return m[1];
    }

    /**
     * Parse the item ID from a URL string.
     * @param  {string} url  URL string
     * @return {string}      Item ID part of the URL. http://www.wowhead.com/item=37752 returns 37752.
     */
    getItemIdFromUrl (url) {
        const regex = /^https?:\/\/.+?\.wowhead.com\/item=(\d+)$/;
        let m = regex.exec(url);
        return m[1];
    }

    /**
     * Generate an <a> element for a specific subdomain and item ID.
     * @param  {string}  subdomain  Wowhead subdomain: www, ptr, de.
     * @param  {integer} itemId     Wowhead item ID
     * @param  {string}  iconSize   Icon size: tiny, small, medium, large
     * @return {string}             String containing a Wowhead link
     */
    getWowHeadLink (subdomain, itemId, iconSize) {
        let data_wh_icon_added = '';
        let data_wh_icon_size = '';
        if (iconSize == 'tiny' || iconSize == 'small' || iconSize == 'medium' || iconSize == 'large') {
            data_wh_icon_added = 'data-wh-icon-added="false"';
            data_wh_icon_size = `data-wh-icon-size="${iconSize}"`;
        }
        else {
            data_wh_icon_added = 'data-wh-icon-added="false"';
            data_wh_icon_size = 'data-wh-icon-size="tiny"';
        }
        return `<a class="itemLink" target="wowhead" href="http://${subdomain}.wowhead.com/item=${itemId}" rel="item=${itemId}" ${data_wh_icon_added} ${data_wh_icon_size}></a>`;
    }

    /**
     * Handles replacing the current random item link with a new item
     * @param  {string} newItemLinkString String containing a Wowhead link
     * @return {object}                   DOM Element containing the replaced element
     */
    replaceCurrentWowheadLink (newItemLinkString) {
        let newItemLink = this.htmlToElement(newItemLinkString)
        newItemLink.setAttribute('id', 'currentItemLink');
        let oldItemLink = document.querySelector('#currentItemLink');
        if (oldItemLink === null) {
            throw new Error(`No element found for selector: #currentItemLink, in Wowhead#replaceCurrentWowheadLink`)
        }
        oldItemLink.replaceWith(newItemLink);
        return oldItemLink;
    }

    /**
     * Handles moving an element to the history list
     * @param  {object}  DOM Element object containing an anchor <a>
     */
    moveWowheadLinkToHistory (oldItemLink) {
        let oldItemLinkHref = oldItemLink.getAttribute('href');
        let subdomain = this.getSubdomainFromUrl(oldItemLinkHref);
        let itemId = this.getItemIdFromUrl(oldItemLinkHref);
        let historicItemLink = this.getWowHeadLink(subdomain, itemId, 'tiny');
        // Do the DOM manipulation
        let itemHistoryRow = document.querySelector("#itemHistoryRow")
        itemHistoryRow.prepend(
            this.htmlToElement(`<div class="col-12 col-sm-6 col-md-4 col-xl-3">${historicItemLink}</div>`)
        )
    }

    /**
     * Utility function to turn HTML fragments into DOM Elements
     * @param  {string} html String containing a valid HTML fragment
     * @return {object}      DOM Element
     */
    htmlToElement(html) {
        let template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

}

export { WowheadRoulette };
