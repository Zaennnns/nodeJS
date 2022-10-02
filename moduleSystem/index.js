// modules ?
// sekumpulan kode yang dapat digunakan kembali, dengan antarmuka yang terdefinisi

//node modules
// fungsionalitas yang simpel ataupun kompleks yang tersimpan di dalam sebuah file javascript, yang dapat kita gunakan kembali pada aplikasi node js
// setiap modul di falam node js memiliki konteksnya masing masing, tidak bisa saling tercampur dengan modul lain pada lingkup global
// kecuali kita lakukan export dan require

// node js module
// core modules
// local modules
// third party modules

// require()
// fungsi require mencari modules  dengan urutan sebagai berikut
// 1. core modules
// 2. file atau direktori (./ atau / atau ../)
// 3. folder 'node_modules'

// const fs=require('fs');// core module
// const cetakNama = require('./coba.js');// local modules
// const moment = require('moment')// third party modules/ npm modules/ folder node_modules

// console.log(cetakNama('Zaenal abidin'))

// jika ingin import lebih dari satu

const coba=require('./coba');
// bentuknya object
// console.log(coba.cetakNama('Zaenal'), coba.PI);

// mengimport object dalam object
// console.log(coba.cetakNama('Zaenal'), coba.PI, coba.mahasiswa.cetakMhs());

// import class
console.log(coba.cetakNama('Zaenal'), coba.PI, coba.mahasiswa.cetakMhs(), new coba.Orang());



