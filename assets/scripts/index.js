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

// Show Add Contact Modal Function
function showAddModal(modal) {
    modal.showModal();
}

// HTML DOC BRIDGE
const addModal = select('.add-contact-modal');
const addBtn = select('.add-btn');

// EVENT LISTENERS
onEvent('click', addBtn, showAddModal(addModal));
