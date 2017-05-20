var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var verbEndingSchema = new Schema({
	vowel: {
		type:String,
		required: true
	},
	consonant: {
		type:String,
		required: true
	},
	speech: {
		type: Number,
		set: v => Math.round(v),
		default: 0
	},
	type: {
		type: Number,
		set: v => Math.round(v),
		default: 0
	},
	tense: {
		type: Number,
		set: v => (Math.abs(v) <= 1) ? v : 0,
		default: 0
	},
	honorific: {
		type:Boolean,
		default: false
	}
}, {versionKey: false});

verbEndingSchema.plugin(autoIncrement.plugin, 'VerbEnding');

module.exports = mongoose.model('VerbEnding', verbEndingSchema);