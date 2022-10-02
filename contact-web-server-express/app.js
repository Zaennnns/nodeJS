const express = require('express');
const app = express();
const port = 3000;
const expressLayout = require('express-ejs-layouts');
const {body, validationResult, check} = require('express-validator')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require("./utils/contacts")
const session = require("express-session");
const cookieParser =require("cookie-parser");
const flash = require("connect-flash")

app.set('view engine','ejs');


app.use(expressLayout)
app.use(express.static("public"))
app.use(express.urlencoded());

app.use(cookieParser('secret'));
app.use(session({
	cookie:{maxAge:6000},
	secret:'secret',
	resave:true,
	saveUninitialized:true,
}));

app.use(flash());



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
	const contacts = loadContact();
	res.render("contact", {
		layout:"layouts/main_layout",
		title:"halaman Contact ",
		contacts,
		msg:req.flash('msg')
	})
});

app.get("/contact/add", (req, res)=>{
	res.render("add-contact",{
		title: "tambah data contact",
		layout: "layouts/main_layout",
	})
});

app.post("/contact", [
	body("nama").custom((value)=>{
		const duplikat = cekDuplikat(value);
		if (duplikat){
			throw new Error("Nama Contact sudah digunakan")
		}
		return true
	}),
	check("email", "Email tidak valid").isEmail(),
	check("nohp", "no HP tidak valid").isMobilePhone('id-ID')
], (req, res)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		res.render("add-contact", {
			title:"Form Tambah Contact",
			layout:"layouts/main_layout",
			errors:errors.array(),
		})
		// return res.status(400).json({errors:errors.array()})
	}else{
		addContact(req.body);
		req.flash("msg", "Data Contact Berhasil ditambahkan")
		res.redirect("/contact");
	}
})

app.get('/contact/delete/:nama', (req, res)=>{
	const contact = findContact(req.params.nama);
	if (!contact){
		res.status(404);
		res.send("<h1>404</h1>");
	}else{
		deleteContact(req.params.nama);
		req.flash("msg", "Data Contact Berhasil dihapus")
		res.redirect("/contact");
	}
})

app.get("/contact/edit/:nama", (req, res)=>{
	const contact = findContact(req.params.nama);

	res.render("edit-contact",{
		title: "Form Ubah data",
		layout: "layouts/main_layout",
		contact,
	})
});

app.post("/contact/update", [
	body("nama").custom((value, {req})=>{
		const duplikat = cekDuplikat(value);
		if (value !== req.body && duplikat){
			throw new Error("Nama Contact sudah digunakan")
		}
		return true
	}),
	check("email", "Email tidak valid").isEmail(),
	check("nohp", "no HP tidak valid").isMobilePhone('id-ID')
], (req, res)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		res.render("edit-contact", {
			title:"Form Ubah Data Contact",
			layout:"layouts/main_layout",
			errors:errors.array(),
			contact:req.body,
		})
	}else{
		updateContacts(req.body);
		req.flash("msg", "Data Contact Berhasil diubah")
		res.redirect("/contact");
	}
})

app.get('/contact/:nama', (req, res)=>{
	const contact = findContact(req.params.nama);
	res.render("detail", {
		layout:"layouts/main_layout",
		title:"halaman Contact ",
		contact
	})
});

app.use('/', (req, res)=>{
	res.status(404);
	res.send("<h1>404</h1>")
})

app.listen(port, ()=>{
	console.log(`Example app listening at http://localhost:${port}`)
});

