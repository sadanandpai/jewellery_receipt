var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/jewel_api');
//var db = mongoose.connect('mongodb://masters:masteros@ds133428.mlab.com:33428/jewel_api')

var jewelSchema = new mongoose.Schema({
	invoice_num: String,
	buyer: String,
	seller: String,
	items: [],
	total_items: Number,
	vat: Number,
	vat_value: Number,
	gross:Number,
    total_amt: Number,
    //date_of_service: { type: Date, default: Date.now },
	date_of_purchase: String,
	total_words: String,
	deleted: {type: Boolean, default: false}
});


//exports.jewelS = db.model('jewel', jewelSchema);

var labourServiceSchema = new mongoose.Schema({
	invoice_num: Number,
	customer: String,
	labour: String,
	items: [],
	total_items: Number,
	labour_cost: Number,
	vat: Number,
    total_amt: Number,
    date_of_service: { type: Date, default: Date.now },
	deleted: {type: Boolean, default: false}
});


//exports.labourS = db.model('labourService', labourServiceSchema);

module.exports = {
	jewel : db.model('jewel', jewelSchema),
	labourService : db.model('labourService', labourServiceSchema)
}

