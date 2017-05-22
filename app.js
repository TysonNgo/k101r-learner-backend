var bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    Word = require('./models/Word'),
    VerbEnding = require('./models/VerbEnding');

var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 8080;
var router = express.Router();

var connection = mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;


function createDocumentFor(Model, req, attrs) {
    var doc = new Model();
    for (attr in attrs)
    	doc[attr] = req.body[attr] || attrs[attr];
    return doc;
};


router.route('/words')
	.post((req, res) => {
    	var word = createDocumentFor(Word, req, {
			korean: undefined,
			type: 0,
			english: '',
			english_alias: '',
			description: '',
			vocab_id: '',
			honorific: false,
    	});

    	word.save(err => {
    		if (err){console.log(err);}
    		res.json(word);
    	});
    })
    .get(function(req, res){
    	var query = {};
    	if (req.query.hasOwnProperty('id'))
    		query._id = req.query.id;
    	if (req.query.hasOwnProperty('korean'))
    		query.korean = new RegExp(req.query.korean);
    	if (req.query.hasOwnProperty('english'))
    		query.english = new RegExp(req.query.english, 'i');
    	if (req.query.hasOwnProperty('type'))
    		query.type = req.query.type;
    	if (req.query.hasOwnProperty('honorific'))
    		query.honorific = req.query.honorific;
    	if (req.query.hasOwnProperty('dictation_id'))
    		query.dictation_id = req.query.dictation_id
    	if (req.query.hasOwnProperty('vocab_id'))
    		query.vocab_id = req.query.vocab_id

    	Word.find(query, (err,obj) => {
    		res.json(obj);
    	});
    });


router.route('/verb_endings')
    .post((req,res) => {
    	var verbEnding = createDocumentFor(VerbEnding, req, {
    		vowel: undefined,
    		consonant: undefined,
    		honorific: false,
            negative: false,
    		speech: 0,
    		type: 0,
    		tense: 0
    	})

    	verbEnding.save(err => {
    		if (err){console.log(err);}
    		res.json(verbEnding);
    	});
    })

    .get(function(req, res){
    	var query = {};
    	if (req.query.hasOwnProperty('id'))
    		query._id = req.query.id;
    	if (req.query.hasOwnProperty('tense'))
    		query.tense = req.query.tense;
        if (req.query.hasOwnProperty('honorific'))
            query.honorific = req.query.honorific;
        if (req.query.hasOwnProperty('negative'))
            query.negative = req.query.negative;
    	if (req.query.hasOwnProperty('type'))
    		query.type = req.query.type;
    	if (req.query.hasOwnProperty('speech'))
    		query.speech = req.query.speech;

    	VerbEnding.find(query, (err,obj) => {
    		res.json(obj);
    	});
    });


app.use(process.env.ROUTE, router);
app.listen(port);

console.log("API on port: "+ port);
