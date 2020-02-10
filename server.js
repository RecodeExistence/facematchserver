//Imports/Requires.
const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');

//Middleware.
app.use(express.json()); 
app.use(cors());

//Database.  Will be shifted out to SQL. Testing only.
const database = {
	users: [
		{
			id:  '123', 
			name: 'John', 
			email: 'john@gmail.com', 
			password: 'passhere!', 
			entries: 0, 
			joined: new Date()
		},
		
		{
			id:  '456', 
			name: 'Alan', 
			email: 'alan@gmail.com', 
			password: 'coffee', 
			entries: 0, 
			joined: new Date()
		} 
	], 
	login: [
		{
			id: '911', 
			hash: '', 
			email: 'user@user.com'
		}
	]
}

// Root route request.
app.get('/', (req, res) => {
	res.send(database.users);
})

// /signin route. 
app.post('/signin', (req, res) => {
	bcrypt.compare("coffee", '$2a$10$fI31aqdDBn/PsHYYoziJl..MIlvX.knbKs3gABnXYye7124CSycC6', function(err, res) {
		console.log('first guess', res)
	});
	bcrypt.compare("veggies", '$2a$10$fI31aqdDBn/PsHYYoziJl..MIlvX.knbKs3gABnXYye7124CSycC6', function(err, res) {
		console.log('Second guess', res);
	});
	
	(req.body.email === database.users[1].email && req.body.password === database.users[1].password) ? 
		res.json(database.users[1]) : 
		res.status(400).json('error logging in.');  
	
});

//Register route:  
app.post('/register', (req, res) => {
	const { name, email, password } = req.body; 
	if(name && email && password) {	
		bcrypt.hash(password, null, null, function(err, hash) {
		});
			database.users.push({
				id:  '456'+1, 
				name,   
				email, 
				password,
				entries: 0, 
				joined: new Date()
	})
	res.json(database.users[database.users.length-1]); 
} else {
	this.onRouteChange('register'); 
	return res.status(400).json('register fail');
	}
});

//Profile route:  
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false; 
	database.users.forEach(user => {
		if(user.id === id) {
			found = true; 
			return res.json(user); 
		} 
	})
	if(!found) {
		res.status(400).json('No matching user found.');
	}
});

//Image Route: increment user count.
app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false; 
	database.users.forEach(user => {
		if(user.id === id) {
			user.entries++;
			return res.json(user.entries); 
		} 
	}) 
		if(!found) {
			res.status(400).json('Not found.');
		}
}); 

// Fire up the server: 
app.listen(3000, ()=> {
	console.log('App listening on port 3000.'); 
}); 