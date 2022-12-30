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
                <i class="fa-solid fa-trash-can delete-btn"></i>
            </td>
        </tr>
        `;
    }
}

// Save Result Function
function saveData(name, address, phone, email) {
    const contactInfo = {
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

// HTML DOC BRIDGE
const dialog = select('dialog');
const addModal = select('.add-contact-modal');
const addModalBtn = select('.add-modal-btn');
const addBtn = select('.add-btn');
const cancelBtn = select('.cancel-btn');
const table = select('table');
const inputs = selectAll('input');

// APP SETUP
clearInputs(inputs);
prepStorage();
showData();

// EVENT LISTENERS
// Showing Add Contact Modal
onEvent('click', addModalBtn, () => {
    addModal.showModal();
});

onEvent('click', addBtn, () => {
    let name = select('.name-input').value;
    let address = select('.address-input').value;
    let phone = select('.phone-input').value;
    let email = select('.email-input').value;

    saveData(name, address, phone, email);
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
