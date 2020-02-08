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

app.listen(3000, ()=> {
	console.log('App listening on port 3000.'); 
})


/* API plan. 
	/profile/: userId --> GET = return the user object. 
	/image --> PUT --> return the updated user object/count.
 */