var mongoose= require("mongoose");

var commentSchema= new mongoose.Schema({
	author: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username:String
	},
	text: String
});

var comments= mongoose.model("comments", commentSchema);

module.exports= comments;