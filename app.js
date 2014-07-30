var express = require('express');
var bodyParser = require('body-parser');
// this var enables the app to utilize the mongoose driver
var mongoose = require('mongoose');
// this next line enables the app to connect via mongoose to the db and push the data from the form found on the applicants.js file
mongoose.connect('mongodb://localhost/sps');
// this next line enables the app to levearage the data model for how the data from the form gets saved to the db
var Applicants = require('./Models/applicants.js')


// Applicant = object model for pushing data pairs to the db

// applicants1 = list of applicants return from a db query

// applicants2 = name of the data model list being passed to the .jade file, must match the first For loop parameter that is found on the .jade file

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// this instructs the app to "render" up this page "index.jade" when the user navs to the localhost page
app.get('/', function(req, res) {
	res.render('index');
});

// this function instructs the app to render up the "applicants.jade" page to display a list of applicants
app.get('/applicants', function(req, res){

// the "Applicants" term is the name of the collection model found on the "applicants.js" file
// applicants1 is a variable defined here within this function
// applicants2 var is used here and on the applicants.jade file
	Applicants.find({}, function(error, applicants1){
		console.log(applicants1)
		if(error){
			res.send(500, "Error accessing applicants collection.")
		}
		else{
			res.render('applicants',{
				applicants2: applicants1
			
			});
		}
	});
});

// after submit takes user to this page
app.get('/success', function(req, res){
	res.render('Success')
});
// creates a new applicants
app.post('/applicant', function(req, res){

// this "var applicants" is only useable wihtin this function the "  .save" must match the var name earlier declared
	var applicants = new Applicants({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});

	applicants.save();
	console.log(req.body)

	// Here is where you need to get the data
	// from the post body and store it in the database
	res.redirect('/success');
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
