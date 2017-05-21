var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var wordSchema = new Schema({
	korean: {
		type:String,
		required: true
	},
	description: {
		type:String,
		default: ''
	},
	vocab_id: {
		type: String,
		default: ''
	},
	english: {
		type:String,
		default: ''
	},
	english_alias: {
		type:String,
		default: ''
	},
	type: {
		type: Number,
		set: v => Math.round(v),
		default: 0
	},
	honorific: {
		type:Boolean,
		default: false
	}
}, {versionKey: false});

wordSchema.plugin(autoIncrement.plugin, 'Word');

module.exports = mongoose.model('Word', wordSchema);
