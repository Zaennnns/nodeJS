const fs=require('fs');
const chalk=require('chalk');
const validator=require("validator");

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

const simpanContact=(nama, email, noHP)=>{
    const contact = {nama, email, noHP};
    const contacts=loadContact();
    // cek jika nama duplikat
    const duplikat=contacts.find(contact=>contact.nama===nama);
    if (duplikat){
        console.log(chalk.red.inverse.bold("contact sudah terdaftar, gunakan nama lain!"));
        return false;
    }

    // cek email
    if (email){
        if (!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold("Email tidak valid"));
            return false
        }
    }

    // cek no HP
    if (!validator.isMobilePhone(noHP, "id-ID")){
        console.log(chalk.red.inverse.bold("Nomor Handphone tidak valid"));
        return false
    }

    contacts.push(contact);
    fs.writeFileSync('data/contact.json',JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('terima kasih sudah memasukan data'));
};

const listContact=()=>{
    const contacts=loadContact()
    console.log(chalk.cyan.inverse.bold`Daftar Contact : \n`)
    contacts.forEach(({nama, email, noHP}, i)=>{
        console.log(chalk`{grey.bold ${i+1}}. {red.bold ${nama}} -  {green.bold ${noHP}}`);
    });
}

const detailContact=(nama)=>{
    const contacts=loadContact();
    const contact=contacts.find(contact=>contact.nama.toLowerCase()===nama.toLowerCase());
    if (!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`));
        return false
    }
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(chalk.grey.bold(contact.noHP));
    if (contact.email){
        console.log((contact.email));
    }
}


const removeContact=(nama)=>{
    const contacts=loadContact();
    const contact=contacts.find(contact=>contact.nama.toLowerCase()===nama.toLowerCase());
    const updateContact=contacts.filter(c=>c.nama.toLowerCase()!==nama.toLowerCase());
    if (contacts.length===updateContact.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`));
        return false
    }
    fs.writeFileSync('data/contact.json',JSON.stringify(updateContact));
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));

}

module.exports={simpanContact, listContact, detailContact, removeContact}