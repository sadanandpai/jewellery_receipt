var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var jewel = require('./models').jewel;
var labourService = require('./models').labourService;


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/", express.static('client'));

app.use(function(req, res, next) {
  	
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

//Setting up jewellery receipt router
var jewelRouter = express.Router();
var labourServiceRouter = express.Router();
var countRouter = express.Router();

app.use('/labourService',labourServiceRouter);
app.use('/jewel', jewelRouter);
app.use('/count', countRouter);

jewelRouter.route('/')
	.get(function(req,res){
		jewel.find({deleted:false},function(err,data){
			if(err)
				res.status(500).send(err);
			else
				res.json(data);
		});
	})
	.post(function(req,res){
		var new_invoice = new jewel(req.body);
		new_invoice.save(function (err) {
			if (err) {
				return err;
			}
			else {
				res.send(new_invoice);
			}
		});
	});


labourServiceRouter.route('/')
	.get(function(req,res){
		labourService.find({deleted:false},function(err,data){
			if(err)
				res.status(500).send(err);
			else
				console.log("testing get for labour service router");
				res.json(data);
		});
	})
	.post(function(req,res){
		var new_invoice = new labourService(req.body);
		new_invoice.save(function (err) {
			if (err) {
				return err;
			}
			else {
				res.send(new_invoice);
				console.log("testing post for labour service router");
			}
		});
	});


jewelRouter.route('/:id')
	.get(function(req,res){
		jewel.findById(req.params.id, function(err, doc){
			if(err)
				res.status(500).send(err);
			else
				res.json(doc);
		});
	})
	.delete(function(req,res){
		console.log(req.params.id);
		jewel.findById(req.params.id, function(err, doc){
			if(err)
				res.status(500).send(err);
			else
				doc.deleted = true;
				doc.save();
			res.send("The item is deleted");
		});
	});

labourServiceRouter.route('/:id')
	.get(function(req,res){
		labourService.findById(req.params.id, function(err, doc){
			if(err)
				res.status(500).send(err);
			else
				res.json(doc);
		});
	})
	.delete(function(req,res){
		console.log(req.params.id);
		labourService.findById(req.params.id, function(err, doc){
			if(err)
				res.status(500).send(err);
			else
				doc.deleted = true;
				doc.save();
			res.send("The item is deleted");
		});
	});
	
countRouter.route('/jewel')
	.get(function(req,res){
		console.log('invoice number request came');
		jewel.count({}, function(err,count){
			if(err)
				console.log(err);
			res.send({"invoiceCount" : count});
		});
	});

countRouter.route('/labourService')
	.get(function(req,res){
		console.log('labour service count req came');
		labourService.count({}, function(err,count){
			if(err)
				console.log(err);
			res.send({"entryCount" : count});
		});
	});


app.listen(port, function(){
	console.log("the server is up on 3000");
});

//count router
