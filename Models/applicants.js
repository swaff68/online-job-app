// sets up the data model for stoarge in the db

// this next line telss the app to use mongoose as the db driver
var mongoose = require('mongoose')

// this is the actual data model for the "applicants" collection in the db

var Applicants = mongoose.model('Applicants', {
	
	// _id: mongoose.Schema.Types.ObjectId,
	// email: String
	name: String,
	bio: String,
	skills: String,
	years: Number,
	why: String

});


// this exports the "Applicants" var to be read by the app.js file
module.exports = Applicants