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
const dialog = select('dialog');
const addModal = select('.add-contact-modal');
const addModalBtn = select('.add-modal-btn');
const addBtn = select('.add-btn');
const cancelBtn = select('.cancel-btn');

// EVENT LISTENERS
// Showing Add Contact Modal
onEvent('click', addModalBtn, () => {
    addModal.showModal();
});

// Closing Modals
onEvent('click', cancelBtn, () => {
    addModal.close();
});

onEvent('click', dialog, function(event) {
    const rect = this.getBoundingClientRect();

    if(event.clientY < rect.top || event.clientY > rect.bottom || 
      event.clientX < rect.left || event.clientX > rect.right) {
        dialog.close();
    }
});
