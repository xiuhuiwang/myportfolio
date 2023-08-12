const express = require('express');
const config = require('./modules/config.js');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Use bodyParser middleware 
app.use(express.json());

// Use routes module
require('./routes/routes.js')(app);

// error handling
app.use(function(req, res, next) {
	let error = new Error("Page not found");
	error.code = 404;
	next(error);
});

app.use(function(err, req, res, next) {
	let errCode = err.code || 500;
	let errMsg = err.message || 'Internal Server Error';
	res.status(errCode);
	res.send(`<h2>Error has occured</h2>
		
		<p>Error: ${errCode} <br/>
		${errMsg}</p>
		`);
});

app.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port} at ${new Date()}`);
});



