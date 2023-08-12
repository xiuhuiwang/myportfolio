/*
    Please note that this web application is a single page application (SPA).
    The server only has one route for the home page, and one for form submission.
    All other routes are handled by the client-side JavaScript code. 
*/
const config = require('../modules/config.js');

module.exports = function(app) {
    const connectDB = require('../modules/db.js');
    const modelMessage = require('../modules/createMessageSchema.js');

    // for home page
    app.get('/', function (req, res){
        console.log(__dirname);
        res.sendFile('main.html', {root: __dirname + '/../public/pages'});
    }),
    
    // for contact form submission
    app.post('/contact', function (req, res){
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
        
    });

    // for client js to fetch config data and date to pupolute the header and the footer
    app.get('/configdata', function (req, res){
        const data = {
            app_name: config.app_name,
            date: new Date().toLocaleDateString()
        };
        res.status(200).json(data);
    });

    // for resume download
    app.get('/resume', function(req, res){
        const filePath = `${__dirname}/../public/assets/Luna_Wang_Resume.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename=Luna_Wang_Resume.pdf');
        res.setHeader('Content-type', 'application/pdf');
        res.status(200);

        res.download(filePath, 'Luna_Wang_Resume.pdf', function(err) {
            if (err) {
                // Handle the error, if any
                console.error('Error sending file:', err);
            } else {
                console.log('File sent successfully');
            }
        });
    });
};