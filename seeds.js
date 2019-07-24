var mongoose= require("mongoose");
var campgrounds=require("./models/campgrounds");
var comments=require("./models/comments");

var data=[
	{name: "nameri eco camp", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/nameri-eco-camp-assam.jpg",description: "hey"},
	{name: "anjuna beach", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/anjuna-beach-goa.jpg", description: "hi"},
	{name: "sam sand dunes", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/sam-sand-dunes-%E2%80%93jaisalmer.jpg", description:"hello"},
];

function seedDB(){
	//delete
	campgrounds.deleteMany({},function(err,camp){
		//if(err){
		//	console.log(err);
		//}else{
		//	console.log("camps removed");
			//create
		//	data.forEach(function(seed){
		//		campgrounds.create(seed, function(err,datac){
		//			if(err){
		//				console.log(err);
		//			}else{
		//				console.log("camps added");
		//				comments.create(
		//					{
		//					text:"this place is great af",
		//					author:"homer"
		//					}, function(err,comm){
		//						if(err){
		//					console.log(err);
		//					}else{
		//					  datac.comments.push(comm);
		//				      datac.save();
		//				      console.log("comment created");
		//					   }});
		//			}
		//		});
		//	});
		//}
	});

}

module.exports= seedDB;
