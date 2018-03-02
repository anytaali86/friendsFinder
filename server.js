//Dependencies 
//--------------------------------------
var express = require('express'); 
var path = require('path'); 
var bodyParser = require('body-parser'); 

//express configuration
//-------------------------------------- 
var app = express(); 


//secure the port / remote environment 
//--------------------------------------
var PORT = process.env.PORT || 8080; 

app.use(express.static(path.join(__dirname,'./app/public'))); 


//Sets up the Express app to handle data parsing
//--------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES
//--------------------------------------
require('./app/routing/apiRoutes')(app); 
require('./app/routing/htmlRoutes')(app); 

//Listener 
app.listen(PORT, function(){
    console.log('The application is listening on the port '+ PORT); 
}); 