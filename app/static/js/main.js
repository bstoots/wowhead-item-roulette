// if (document.readyState != 'loading') {
//     console.log('loaded');
// }
// else {
//     document.addEventListener('DOMContentLoaded', () => {
//         console.log('loading');
//     });
// }

import { CurrentItem } from './modules/CurrentItem.js';

// console.log($WowheadPower);

let currentItem = new CurrentItem();
currentItem.bindClickEventTo('#randomItem')
// d.onReady(() => { console.log('ready') });
