var mongoose=require("mongoose");

var campSchema= new mongoose.Schema({
	name: String,
	image: String,
	price: String,
	description: String,
	author:{
		username: String,
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		}
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"comments"
		}
	]	
});

var campgrounds= mongoose.model("campgrounds", campSchema);

module.exports= campgrounds;





