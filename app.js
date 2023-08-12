const express = require('express');
const connectDB = require('./modules/db.js');
const modelMessage = require('./modules/createMessageSchema.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3001, host = '127.0.0.1';

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Use bodyParser middleware 
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res){
    res.sendFile('main.html', {root: __dirname + '/public/pages'});
});

app.post('/contact', formSubmit);

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


function formSubmit(req, res){
    // create a new message object from the form data
    const messageObj = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    };
    connectDB(true);
    const dataMessage = modelMessage.create(messageObj);
    dataMessage.then( function() {
        console.log(JSON.stringify(messageObj) + "saved to database");
        connectDB(false);
        // send a response to the client
        res.status(200).json({ success: true });
    }).catch(error => {
        console.error("Error saving message to the database:", error);
        connectDB(false);
        // send an error response to the client
        res.status(500).json({ success: false, error: "Database error" });
    });
    
}
