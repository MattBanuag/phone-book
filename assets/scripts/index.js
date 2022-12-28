'use strict';
// UTILITIES & FUNCTIONS
// Add Event Listener Function
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
// Query Selector Function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// HTML DOC BRIDGE
const addModal = select('.add-contact-modal');
const addModalBtn = select('.add-modal-btn');

// EVENT LISTENERS
// Showing Add Contact Modal
onEvent('click', addModalBtn, () => {
    addModal.showModal();
});
