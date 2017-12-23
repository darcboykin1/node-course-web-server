const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// __dirname is a variable for the current directory that your project is currently in
// in this case, that would be node_web_server

// app.use is used for defining middleware that will be used throughout our application
app.use((req, res, next)=>{
	var now = new Date().toString(); 
	let log = `${now}: ${req.method} ${req.url}`
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err){
			console.log("Unable to append to server.log");
		}
	});
	next();
});

// app.use((req, res, rext)=>{
// 	res.render('maintenance.hbs', {
// 		pageName: "Site under maintenance",
// 		message: "will be back shortly"
// 	});
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getFullYear', ()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (str)=>{
	return str.toUpperCase();
});

// app.get is used for defining routes and data to be sent in those routes
app.get('/', (req, res)=>{
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to the page biotches'
	})
})

app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		data: "bad request"
	});
});

app.listen(3000, ()=>{
	console.log("listening on port 3000")
});