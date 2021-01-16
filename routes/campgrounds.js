 var express=require("express");
var app=express.Router();
var campgrounds=require("../models/campgrounds");
var middleware=require("../middleware/index");

//INDEX ROUTE
app.get("/", function(req,res){
	campgrounds.find(function(err,allcamps){
		if(err){
		console.log(err);
	}else{
		res.render("index", {camps:allcamps});

}});
});

//CREATE ROUTE
app.post("/", middleware.isloggedin,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var price=req.body.price;
	var desc=req.body.desc;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newcamp={name:name, image:image, price:price, description:desc, author:author};
	campgrounds.create(newcamp,function(err,campg){
		if(err){
			console.log(err);
		}else{
			req.flash("success","New Campground Created");
			res.redirect("/campgrounds");
		}
	});
});

//NEW ROUTE
app.get("/new",middleware.isloggedin, function(req,res){
	res.render("new");
});

//SHOW ROUTE
app.get("/:id",function(req,res){
	console.log("hey there"); 
	campgrounds.findById(req.params.id).populate("comments").exec(function(err,found){
		if(err){
			console.log(err);
		}else{
			res.render("show", {camping:found});
		}
	});
});

// EDIT ROUTE
app.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
	campgrounds.findById(req.params.id, function(err,found){
	res.render("edit", {campgrounds:found});
	});
});

//UPDATE ROUTE
app.put("/:id",middleware.checkcampgroundownership,function(req,res){
	var data={name:req.body.name, image:req.body.image,  price:req.body.price, description:req.body.desc};
	campgrounds.findByIdAndUpdate(req.params.id, data, function(err,updated){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Campground Updated Successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY ROUTE
app.delete("/:id",middleware.checkcampgroundownership,function(req,res){
	campgrounds.findByIdAndRemove(req.params.id, function(err){
		req.flash("success","Campground Deleted");
		res.redirect("/campgrounds");
	});
});

//middleware


//auth middleware

module.exports=app;