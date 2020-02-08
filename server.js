const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); 



app.use(express.json()); 

const database = {
	users: [
		{
			id:  '123', 
			name: 'John', 
			email: 'john@gmail.com', 
			password: 'cookies', 
			entries: 0, 
			joined: new Date()
		},
		
		{
			id:  '456', 
			name: 'Alan', 
			email: 'alan@gmail.com', 
			password: 'cofee', 
			entries: 0, 
			joined: new Date()
		} 
	]
}

// Root route request.
app.get('/', (req, res) => {
	res.send(database.users);
})

// /signin route. 
app.post('/signin', (req, res) => {
	(req.body.email === database.users[0].email && req.body.password === database.users[0].password) ? 
		res.json('Signin Success!') : 
		res.status(400).json('error logging in.');  
	
});

//Register route:  
app.post('/register', (req, res) => {
	const { name, email, password } = req.body; 
	database.users.push({
		id:  '456'+1, 
		name,   
		email, 
		password,
			entries: 0, 
			joined: new Date()
	})
	res.json(database.users[database.users.length-1]); 
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
			res.status(400).json('No matching user found.');
		}
}); 

// Fire up the server: 
app.listen(3000, ()=> {
	console.log('App listening on port 3000.'); 
})



