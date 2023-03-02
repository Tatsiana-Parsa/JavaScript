class User {
    constructor(data) {
        this.data = {
            id: data.id,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone
          }
    }

    editUser(dataNew) {
        if(dataNew.id) {
            this.data.id = dataNew.id;
        }
        if(dataNew.name) {
            this.data.name = dataNew.name;
        }
        if(dataNew.email) {
            this.data.email = dataNew.email;
        }
        if(dataNew.address) {
            this.data.address = dataNew.address;
        }
        if(dataNew.phone) {
            this.data.phone = dataNew.phone;
        }
    }

    get() {
        return this.data;
    }
}


class Contacts {

    static data = [];

    static addContact(newContact) {
        this.data.push(new User(newContact));
    }

    static editContact(id, dataNew) {
        let idFind = -1;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].data.id === id) {
                idFind = i;
            }
        }
        if(idFind!== -1) {
            this.data[idFind].editUser(dataNew);
            return true;
        } else {
            return false;
        }
    }

    static deleteContact(id) {
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].data.id === id) {
               this.data.splice(i, 1)
            }
        }
    }

    static getArray() {
        return this.data;
    }
}


class ContactApp extends Contacts {
    constructor() {
        super();
    
    this.app = document.createElement('form');
    this.app.classList.add('contactForm');
    document.body.appendChild(this.app);

    this.app.addEventListener('submit', (e)=> {
            e.preventDefault();
    });

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('fieldsetMain');
    this.app.appendChild(fieldset);
    
    const labelId = document.createElement('label'); 
    labelId.innerHTML = '#ID';
    labelId.setAttribute("for", "inputId");
    fieldset.appendChild(labelId);
    let inputId = document.createElement('input');
    inputId.setAttribute("id", "inputId");
    inputId.setAttribute("type", "number");
    inputId.setAttribute("name", "id-number");       
    labelId.appendChild(inputId);

    const labelName = document.createElement('label'); 
    labelName.innerHTML = 'Name';
    labelName.setAttribute("for", "inputName");
    fieldset.appendChild(labelName);
    let inputName = document.createElement('input');
    inputName.setAttribute("id", "inputName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "person-name");       
    labelName.appendChild(inputName);

    const labelEmail = document.createElement('label'); 
    labelEmail.innerHTML = 'E-mail';
    labelEmail.setAttribute("for", "inputEmail");
    fieldset.appendChild(labelEmail);
    let inputEmail = document.createElement('input');
    inputEmail.setAttribute("id", "inputEmail");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email-address");
    inputEmail.setAttribute("placeholder", "name@domain.com");        
    labelEmail.appendChild(inputEmail);

    const labelAddress = document.createElement('label'); 
    labelAddress.innerHTML = 'Address';
    labelAddress.setAttribute("for", "inputId");
    fieldset.appendChild(labelAddress);
    let inputAddress = document.createElement('input');
    inputAddress.setAttribute("id", "inputAddress");
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("name", "address");     
    labelAddress.appendChild(inputAddress);

    const labelPhone= document.createElement('label'); 
    labelPhone.innerHTML = 'Phone number';
    labelPhone.setAttribute("for", "labelPhone");
    fieldset.appendChild(labelPhone);
    let inputPhone = document.createElement('input');
    inputPhone.setAttribute("id", "inputPhone");
    inputPhone.setAttribute("type", "tel");
    inputPhone.setAttribute("name", "phone-number");
    inputPhone.setAttribute("placeholder", "+375(00)0000000");       
    labelPhone.appendChild(inputPhone);

    const addBTN = document.createElement('button');
    addBTN.classList.add('btn_add');
    addBTN.innerText = 'Add Contact';
    fieldset.appendChild(addBTN);
    addBTN.addEventListener('click', addNewContact);

    function addNewContact() {

        if(!+inputId.value || inputId.value === '') {
            return;
        }
        if(inputName.value === '') {
            return;
        }
        if(inputAddress.value === '') {
            return;
        }
        if(inputEmail.value === '') {
            return;
        }
        if(inputPhone.value === '') {
            return;
        }
        const inputValues = {
            id: +inputId.value,
            name: inputName.value,
            email: inputEmail.value,
            address: inputAddress.value,
            phone: inputPhone.value
        };
    
        Contacts.addContact(inputValues);
    
        updateList();  
    }
    
    const editBTN = document.createElement("button");
    editBTN.classList.add('btn_edit');
    editBTN.innerText = 'Edit Contact';
    fieldset.appendChild(editBTN);
    editBTN.addEventListener('click', function() {

        if((!+inputId.value) || (inputId.value === '')) {
            return;
        }
        if(inputName.value === '') {
            return;
        }
        if(inputAddress.value === '') {
            return;
        }
        if(inputEmail.value === '') {
            return;
        }
        if(inputPhone.value === '') {
            return;
        }
        const inputValues = {
            id: +inputId.value,
            name: inputName.value,
            email: inputEmail.value,
            address: inputAddress.value,
            phone: inputPhone.value
        };
        if(!Contacts.editContact(+inputId.value, inputValues)) {
            alert("Id not found");
        } else {
            updateList();
        }

        Contacts.editContact(inputValues);
    
        updateList();
    });

    const deleteBTN= document.createElement("button");
    deleteBTN.classList.add('btn_delete');
    deleteBTN.innerText = "Delete Contact";
    fieldset.appendChild(deleteBTN);
    deleteBTN.addEventListener('click', cleanAllContacts);
    
    function cleanAllContacts() {

         Contacts.deleteContact(+inputId.value);
    
        updateList(); 
    };

    }
}

function updateList() {
    inputId.value = '';
    inputName.value = '';
    inputPhone.value = '';
    inputAddress.value = '';
    inputEmail.value = '';

    const array = Contacts.getArray();
    document.querySelectorAll(".all_contacts").forEach(el => el.remove());
        for(let i = 0; i < array.length; i++) {

    const allContacts = document.createElement('div');
    allContacts.classList.add('all_contacts');
    document.body.appendChild(allContacts);

    const pId = document.createElement('p');
    pId.innerText = `ID: ${array[i].data.id}`;
    allContacts.appendChild(pId);

    const pName = document.createElement('p');
    pName.innerText = `Name: ${array[i].data.name}`;
    allContacts.appendChild(pName);

    const pEmail = document.createElement('p');
    pEmail.innerText = `Email: ${array[i].data.email}`;
    allContacts.appendChild(pEmail);

    const pAddress = document.createElement('p');
    pAddress.innerText = `Address: ${array[i].data.address}`;
    allContacts.appendChild(pAddress);
        
    const pPhone = document.createElement('p');
    pPhone.innerText = `Phone: ${array[i].data.phone}`;
    allContacts.appendChild(pPhone);
        
    }
}

const contactApp = new ContactApp();
console.log(ContactApp.getArray())