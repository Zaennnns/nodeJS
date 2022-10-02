const fs=require('fs');

const dirData="./data"
if (!fs.existsSync(dirData)){
    fs.mkdirSync(dirData);
};
const dataPath="./data/contact.json"
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, "[]",'utf-8');
};
const loadContact=()=>{
    const file=fs.readFileSync('data/contact.json', 'utf-8');
    return JSON.parse(file);
}

const findContact = nama => {
    const contacts = loadContact();
    return contacts.find(contact =>nama === contact.nama)
}

const saveContacts = (contacts) => {
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
}

const addContact = (contact) =>{
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

const cekDuplikat = (nama)=>{
    const contacts = loadContact();
    return contacts.find(contact=>contact.nama === nama)
}

const deleteContact = nama =>{
    const contacts = loadContact();
    const filteredContacts = contacts.filter(contact => contact.nama !== nama);
    saveContacts(filteredContacts)
}

const updateContacts = contactBaru =>{
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact)=>contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts)
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}