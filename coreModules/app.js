// core  modules


// file system

const fs=require('fs');

// menuliskan string ke file (synchronous)
// try{
//     fs.writeFileSync('data/test.txt', 'Hello World Secara Synchronous');
// }catch(e){
//     console.log(e);
// }

// menuliskan string ke file (asynchronous)

// fs.writeFile('data/test.txt', 'hello world secara asynchronous',(err)=>{
//     console.log(err);
// })

// membaca isi file (synchronous)
// const data=fs.readFileSync('data/test.txt');// isinya buffer supaya berubah jadi string dengan method tostring
// console.log(data.toString());

// atau bisa kita pillih parameter encoding sehingga tidak perlu method to string
// const data=fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca isi file (asynchronous)

// fs.readFile('data/test.txt','utf-8',(e,data)=>{
//     if (e)throw e;
//     console.log(data);
// });


// readline
const readline=require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

// rl.question('masukan nama anda : ', (nama)=>{
//     console.log(`terimakasih ${nama}`)
//     rl.close();
// })
// jika ingin membuat dua pertanyaan


rl.question('masukan nama anda : ', (nama)=>{
    rl.question('Masukan No HP anda : ', (noHP)=>{
        const contact = {nama,noHP}
        const file=fs.readFileSync('data/contact.json', 'utf-8');
        const contacts=JSON.parse(file);
        contacts.push(contact);
        console.log(contacts)
        fs.writeFileSync('data/contact.json',JSON.stringify(contacts));
        console.log('terima kasih sudah memasukan data');
        rl.close();
    })
})

// console.log(file)
