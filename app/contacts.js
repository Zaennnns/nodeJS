const fs=require('fs');
const chalk=require('chalk');
const validator=require("validator");
// const readline=require('readline');

// const rl=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// })

// check apakah ada folder data atau tidak 
const dirData="./data"
if (!fs.existsSync(dirData)){
    fs.mkdirSync(dirData);
};

// // cek apakah ada file contact.json data atau tidak
const dataPath="./data/contact.json"
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, "[]",'utf-8');
};

// const tulisPertanyaan=(pertanyaan)=>{
//     return new Promise((resolve, reject)=>{
//         rl.question(pertanyaan, (nama)=>{
//             resolve(nama)
//         });
//     });
// }

const simpanContact=(nama, email, noHP)=>{
    const contact = {nama, email, noHP}
    const file=fs.readFileSync('data/contact.json', 'utf-8');
    const contacts=JSON.parse(file);
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

module.exports={simpanContact}