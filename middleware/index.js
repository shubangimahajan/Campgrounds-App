var campgrounds=require("../models/campgrounds");
var comments=require("../models/comments");

middlewareobj={};

middlewareobj.checkcampgroundownership= function(req,res,next){
	if(req.isAuthenticated()){
	campgrounds.findById(req.params.id, function(err,found){
	if(err){
		res.redirect("/campgrounds");
	}else{
		//does user own the campground
		if(found.author.id.equals(req.user._id)){
		next();
		}else{
			req.flash("error", "You don't have permission to do that!");
			res.redirect("back");
		}	
	}
	});
	}else{
		req.flash("error","You Need To Be Logged In To Do That!");
		res.redirect("back");
	}
};

middlewareobj.checkcommentownership= function(req,res,next){
	if(req.isAuthenticated()){
	comments.findById(req.params.comm_id, function(err,found){
	if(err){
		res.redirect("back");
	}else{
		//does user own the comment
		if(found.author.id.equals(req.user._id)){
		next();
		}else{
			req.flash("error", "You don't have permission to do that!");
			res.redirect("back");
		}	
	}
	});
	}else{
		req.flash("error", "You need to be Logged In to do that!");
		res.redirect("back");
	}	
};

middlewareobj.isloggedin=function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You Need To Be Logged In To Do That!");
	res.redirect("/login");
};

module.exports=middlewareobj;


