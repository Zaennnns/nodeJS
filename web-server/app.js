// membuat web server dengan core module
// nodejs.org

const fs=require('fs');
const http = require('http');
// create server
const port = 3000;


http
	.createServer((req, res)=>{
	// res.write('hello world')// akan muncul di browser
	// res.end(); // untuk menandakan bahwa perintah di dalam server sudah selesai
	// server sudah jalan tapi yang dikembalikan oleh servernya masih sebuah plain text bukan html



	// agar tipenya html
	// res.writeHead
	// res.writeHead(200,{
	// 	'Content-Type':'text/html',
	// });
	// res.write("hello world");
	// res.end();



	// karena saking sederhananya kita tidak bisa mengelola kalau kita mau ke halamn lain misalnya about
	// harus dibuat secara manual => cek dulu urlnya apa lalu kita harus tulis manual istilahnya kita membuat sistem routing sendiri
	// res.writeHead(200,{
	// 	'Content-Type':'text/html',
	// });
	// const url = req.url;
	// // console.log(url); // dia akan mengambil urlnya , dapat terlihat di terminal
	// // cek manual url
	// if (url==='/about'){
	// 	res.write("<h1>ini adalah halaman about</h1>");
	// }else if(url === '/contact'){
	// 	res.write("<h1>ini adalah halaman contact</h1>");
	// }else{
	// 	res.write("Hello World");
	// }
	// res.end();
	// kalau misalka kita punya halaman lain nambah lagi elifnya


	// bagaimana kalau misalnya yang kita tulis bukan html manual seperti ini
	// misalya kita ingin menampilkan dari file html yang kita tulis sendiri
	// res.writeHead(200,{
	// 	'Content-Type':'text/html',
	// });
	// const url = req.url;
	// if (url==='/about'){
	// 	fs.readFile('./about.html', (err, data)=>{
	// 		if (err){
	// 			res.writeHead(404);
	// 			res.write('Error: File not found');
	// 		}else{
	// 			res.write(data);
	// 		}
	// 	res.end();

	// 	});
	// }else if(url === '/contact'){
	// 	fs.readFile('./contact.html', (err, data)=>{
	// 		if (err){
	// 			res.writeHead(404);
	// 			res.write('Error: File not found');
	// 		}else{
	// 			res.write(data);
	// 		}
	// 	res.end();

	// 	});
	// }else{
	// 	fs.readFile('./index.html', (err, data)=>{
	// 		if (err){
	// 			res.writeHead(404);
	// 			res.write('Error: File not found');
	// 		}else{
	// 			res.write(data);
	// 		}
	// 	res.end();

	// 	});
	// }




	// kita abstaraksi function yang berisi read file
	const renderHTML = (path, res)=>{
		fs.readFile(path, (err, data)=>{
			if (err){
				res.writeHead(404);
				res.write('Error: File not found');
			}else{
				res.write(data);
			}
		res.end();

		});
	}
	res.writeHead(200,{
		'Content-Type':'text/html',
	});
	const url = req.url;
	if (url==='/about'){
		renderHTML('./about.html', res);
	}else if(url === '/contact'){
		renderHTML('./contact.html', res);
	}else{
		renderHTML('./index.html', res);
	}


	// jika ingin membuat web servernya simpel hanya menampilkan beberapa halaman static bisa menggunakan ini

	// tapi kedepannya kita butuh data yang dikirimkan untuk tiap halaman, mungkin kita ingin terkoneksi ke dalam database, mungkin kita ingin mengelola menggunakan request method yang berbeda, jika kita menggunaan server yang sangat sederhana ini cuma nanti banyak hal yang harus kita lakukan secara manual

	// maka dari itu kita butuh bantuan dari sebuah modul di npm yang namanya express semua yang akan kita lakukan akan dapat dengan mudah dilakukan dengan menggunakan express

	

}).listen(port, ()=>{
	console.log(`Server is listening on http://localhost:${port} ... `)
})