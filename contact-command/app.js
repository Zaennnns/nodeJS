const contacts=require("./contacts.js")

// mengambil argument dari command

// const command=process.argv[2];
// if (command === 'add'){
//     // some to do
// }else if(command === 'remove'){
//     // some todo
// }

// atau menggunakan sebuah module di npm
// yang fungsinya untuk mengelola argument pada command line

const yargs=require("yargs");

// yargs.command(
//     "add", 
//     "menambahkan contact baru", 
//     ()=>{},
//     (argv)=>{
//     console.log(argv.nama);
// });    parameternya satuan bukan object

yargs.command({
    command:'add',
    describe:'menambahkan contact baru',
    builder:{
        nama:{
            describe:"Nama Lengkap",
            demandOption:true,
            type:'string'
        },
        email:{
            describe:"Email",
            demandOption:false,
            type:'string'
        },
        noHP:{
            describe:"Nomor Handphone",
            demandOption:true,
            type:'string'
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    },
}).demandCommand();

// menampilkan daftar semua nama dan no HP contact

yargs.command({
    command:"list",
    describe:"menampilkan daftar contact",
    handler(){
        contacts.listContact()
    },
})

yargs.command({
    command:"detail",
    describe:"menampilkan detail Contact",
    builder:{
        nama:{
            describe:"Nama Lengkap",
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },    
})


yargs.command({
    command:"remove",
    describe:"menghapus Contact",
    builder:{
        nama:{
            describe:"Nama Lengkap",
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        contacts.removeContact(argv.nama);
    },    
})



yargs.parse();