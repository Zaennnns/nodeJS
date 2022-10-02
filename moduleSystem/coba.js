function cetakNama(nama){
    return `Halo, Nama saya ${nama}`;
}

const PI=3.14;


const mahasiswa={
    nama:'Zaenal',
    umur:20,
    cetakMhs(){
        return `halo nama saya ${this.nama} dan saya ${this.umur} tahun`
    }
}

// class

class Orang{
    constructor(){
        console.log('object orang telah dibuat!');
    }
}



// jika ingin ingin mengeksport lebih dari satu
// kita kirim sebagai properti atau method
// module.exports.cetakNama=cetakNama;
// module.exports.PI=PI;
// // export object
// module.exports.mahasiswa=mahasiswa;
// // export class
// module.exports.Orang=Orang;


// kita bisa mengeksport cuma sekali tapi yang kita isi adalah object

// module.exports={
//     cetakNama:cetakNama,
//     PI:PI,
//     mahasiswa:mahasiswa,
//     Orang:Orang
// }

// dengan notasi es6 jika key dan value sama


module.exports={ cetakNama, PI, mahasiswa, Orang }