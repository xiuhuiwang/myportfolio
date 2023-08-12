const express = require('express');
const app = express();

const port = 3001, host = '127.0.0.1';

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    console.log(__dirname + '/pages');
    res.sendFile('main.html', {root: __dirname + '/public/pages'});
});

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

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port} at ${new Date()}`);
});

