// express view engine
// modul untuk mempermudah mengelola tampilan dari halaman web

// => memungkinkan kita membuat file template statis untuk aplikasi
// engine tersebut mengganti variable pada template dengan nilai sebenarnya lalu menampilkannya dalam bentuk html

// mempermudah pembuatan halaman web



// ejs


const express = require('express');
const app = express();
const port = 3000;
// layout ejs
const expressLayout = require('express-ejs-layouts');

// ejs view engine
app.set('view engine','ejs');
app.use(expressLayout)

app.get('/', (req, res)=>{
	const mahasiswa = [
	{
		nama: "zaenal",
		email: "aszaenal618@gmail.com"
	},
	{
		nama: "abidin",
		email: "abidin@gmail.com"
	},
	{
		nama: "alamsyah",
		email: "alamsyah@gmail.com"
	}
	]

	res.render("index", {
		layout:"layouts/main_layout",
		title : "Halaman Home",
		nama : "zaenal abidin syah",
		mahasiswa
	})
});


app.get('/about', (req, res)=>{
	res.render("about", {
		layout:"layouts/main_layout",
		title:"halaman About"
	})
});
app.get('/contact', (req, res)=>{
	res.render("contact", {
		layout:"layouts/main_layout",
		title:"halaman Contact "
	})
});
app.get('/product/:id', (req, res) => {
	res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});
app.use('/', (req, res)=>{
	res.status(404);
	res.send("<h1>404</h1>")
})
app.listen(port, ()=>{
	console.log(`Example app listening at http://localhost:${port}`)
});

