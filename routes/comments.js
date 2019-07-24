var express=require("express");
var app=express.Router({mergeParams: true});
var campgrounds=require("../models/campgrounds");
var comments=require("../models/comments");
var middleware=require("../middleware");

//======================
//   COMMENTS ROUTES
//======================

//new
app.get("/new", middleware.isloggedin , function(req,res){
	campgrounds.findById(req.params.id, function(err, campgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("newcomm",{campgrounds:campgrounds});
		}
    });
});

//create
app.post("/",middleware.isloggedin ,function(req,res){
	campgrounds.findById(req.params.id, function(err, campgrounds){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			var newcomment=req.body.comment;
			comments.create(newcomment, function(err,comm){
				if(err){
					console.log(err);
					res.redirect("/campgrounds");
				}else{
					//add username and id 
					comm.author.id=req.user._id;
					//console.log(req.user.username);
					comm.author.username=req.user.username;
					//save comment
					comm.save();
					campgrounds.comments.push(comm);
					campgrounds.save();
					req.flash("success","Successfully added comment!");
					res.redirect("/campgrounds/" + campgrounds._id);
				}
			}
		);	
	}});	
});

//edit
app.get("/:comm_id/edit",middleware.checkcommentownership, function(req,res){
	comments.findById(req.params.comm_id, function(err,found){
		if(err){
			res.redirect("back");
		}else{
			res.render("editcomm", {campgrounds_id:req.params.id, comments:found});
		}
	});
});

//update
app.put("/:comm_id",middleware.checkcommentownership,function(req,res){
	comments.findByIdAndUpdate(req.params.comm_id, req.body.comment, function(err,found){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Successfully updated comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//delete
app.delete("/:comm_id",middleware.checkcommentownership, function(req,res){
	comments.findByIdAndRemove(req.params.comm_id,function(err){
		req.flash("success","Comment Deleted");
		res.redirect("back");
	});
});

//isloggedin middleware

//autherization middleware


module.exports=app;