var express = require('express');
var app = express();

var mongojs = require('mongojs');

// which db, collection
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

/** run test server
app.get('/', function (req, res){
	res.send("Hello world from server.js")
});
*/

//to tell server where to look static files (HTML, javascript, css)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {

	console.log("I recieved a GET request.");

	db.contactList.find(function (err, docs) {
		
		console.log(docs);
		res.json(docs);
	});	
});

app.post('/contactList', function (req, res){
	console.log(req.body);

	// teach server to parse the body by install "npm install body-parser"
	//insert body to mongodb
	db.contactList.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/contactList/:id', function (req, res) {
	// get value id from url
	var id = req.params.id;
	console.log(id);

	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

// response to edit function
app.get('/contactList/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
})

app.listen(3000);
console.log("Server running on port  3000");

// listen to post request

