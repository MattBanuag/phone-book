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

// Query Selector All Function
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function clearInputs(inputs) {
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function randomId() {
    let id = `${Math.floor(Math.random() * 100)}CO`;
    return id;
}

// Preparing LocalStorage Function
function prepStorage() {
    if(localStorage.getItem('Contacts') == null) {
        localStorage.setItem('Contacts', '[]');
    }
}

// Show Contacts Function
function showData() {
    const allContacts = JSON.parse(localStorage.getItem('Contacts'));

    for(let contact of allContacts) {
        table.innerHTML += `
        <tr class="contact-box">
            <td>${contact.name}</td>
            <td>${contact.address}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td class="action-btns">
                <i class="fa-solid fa-trash-can ${contact.id}"
                onClick="deleteContact(this)"></i>
            </td>
        </tr>
        `;
    }
}

// Save Result Function
function saveData(id, name, address, phone, email) {
    const contactInfo = {
        id: id,
        name: name,
        address: address,
        phone: phone,
        email: email
    };

    // Getting Old Data and Pushing New Data
    const oldContacts = JSON.parse(localStorage.getItem('Contacts'));
    oldContacts.push(contactInfo);

    localStorage.setItem('Contacts', JSON.stringify(oldContacts));
}

// Delete Contact Function
function deleteContact(btn) {
    const myContacts = JSON.parse(localStorage.getItem('Contacts'));
    const id = btn.classList[2].toString();
    const index = myContacts.findIndex(btn => {
        return btn.id === id;
    });

    // Delete item/contact
    myContacts.splice(index, 1);

    // After splicing update localstorage
    localStorage.setItem('Contacts', JSON.stringify(myContacts));
    location.reload();
}

// HTML DOC BRIDGE
const dialog = select('dialog');
const addModal = select('.add-contact-modal');
const addModalBtn = select('.add-modal-btn');
const addBtn = select('.add-btn');
const cancelBtn = select('.cancel-btn');
const table = select('table');
const inputs = selectAll('input');

// APP SETUP
let id = 0;
clearInputs(inputs);
prepStorage();
showData();

// EVENT LISTENERS
// Showing Add Contact Modal
onEvent('click', addModalBtn, () => {
    addModal.showModal();
});

onEvent('click', addBtn, () => {
    let id = randomId();
    let name = select('.name-input').value;
    let address = select('.address-input').value;
    let phone = select('.phone-input').value;
    let email = select('.email-input').value;

    saveData(id, name, address, phone, email);
    clearInputs(inputs);
    location.reload();
    addModal.close();
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
