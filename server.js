const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectMongoDb = require('./db');
// mongodb Connection
connectMongoDb();
app.use(express.json({extended: false}));
app.get('/api/hello', (req, res) => {
	res.send({express: 'Hello From Express'});
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/room', require('./routes/api/room'));
app.use('/api/userinfo', require('./routes/api/userInfo'));
app.post('/api/world', (req, res) => {
	console.log(req.body); // eslint-disable-line no-console
	res.send(
		`I received your POST request. This is what you sent me: ${req.url}`,
	);
});
app.get('/hello', (req, res)=> {
	res.send('HELLO WORLD NICE TO MEET U');
});
app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
