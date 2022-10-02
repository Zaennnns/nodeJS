const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
	// res.send('hello world');// mengembalikan plain text

	// mengembalikan file html
	res.sendFile('./index.html', {root:__dirname})

	// bisa mengembalikan json
	// res.json({
		// nama:"zaenal",
		// email:"zanss@gmail.com",
		// noHP:"0898876278",
	// })


});
app.get('/about', (req, res)=>{
	res.sendFile('./about.html', {root:__dirname})
});
app.get('/contact', (req, res)=>{
	res.sendFile('./contact.html', {root:__dirname})
});


// product
// app.get('/product/:id/category/:idCat', (req, res) => {
// 	// res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);
// 	// /product/2/category/3
// 	// params => semua variable di url
// });


// category

app.get('/product/:id', (req, res) => {

	// jika kita ingin seperti ini:
	// /product/10?categoy=shoes => categorynya tidak masuk sebagai params
	// maka kita pakai query
	res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);


});








// memanggil seubah midleware atau function
// ini akan selalu  dijalankan untuk request apapun
app.use('/', (req, res)=>{
	res.status(404);
	res.send("<h1>404</h1>")
})

app.listen(port, ()=>{
	console.log(`Example app listening at http://localhost:${port}`)
});





// // membuat web server dengan core module
// // nodejs.org

// const fs=require('fs');
// const http = require('http');
// // create server
// const port = 3000;
// http
// 	.createServer((req, res)=>{
// 	const renderHTML = (path, res)=>{
// 		fs.readFile(path, (err, data)=>{
// 			if (err){
// 				res.writeHead(404);
// 				res.write('Error: File not found');
// 			}else{
// 				res.write(data);
// 			}
// 		res.end();

// 		});
// 	}
// 	res.writeHead(200,{
// 		'Content-Type':'text/html',
// 	});
// 	const url = req.url;
// 	if (url==='/about'){
// 		renderHTML('./about.html', res);
// 	}else if(url === '/contact'){
// 		renderHTML('./contact.html', res);
// 	}else{
// 		renderHTML('./index.html', res);
// 	}
// }).listen(port, ()=>{
// 	console.log(`Server is listening on http://localhost:${port} ... `)
// })