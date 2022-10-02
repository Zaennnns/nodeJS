const fs=require('fs');

const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

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

const tulisPertanyaan=(pertanyaan)=>{
    return new Promise((resolve, reject)=>{
        rl.question(pertanyaan, (nama)=>{
            resolve(nama)
        });
    });
}

const simpanContact=(nama, email, noHP)=>{
    const contact = {nama, email, noHP}
    const file=fs.readFileSync('data/contact.json', 'utf-8');
    const contacts=JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contact.json',JSON.stringify(contacts));
    console.log('terima kasih sudah memasukan data');
    rl.close()
};

module.exports={simpanContact, tulisPertanyaan}