var express=require("express");
var app=express.Router();
var passport=require("passport");
var localstrategy=require("passport-local");
var user=require("../models/user");

//passport configuration
app.use(require("express-session")({
	secret: " i am the best",
	resave:false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//root route
app.get("/", function(req,res){
	res.render("landing");
});

//===============
//  AUTH ROUTES
//===============


app.get("/register", function(req,res){
	res.render("register");
});

//sign up logic
app.post("/register",function(req,res){
	var newuser= new user({username: req.body.username});
	user.register(newuser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			req.flash("success","Welcome To Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

app.get("/login", function(req,res){
	res.render("login",{message:req.flash("error", "Log In First")});
});

app.post("/login", passport.authenticate("local",
	{successRedirect: "/campgrounds",
	failureRedirect:"/login"
	}) ,function(req,res){
});

app.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out");
	res.redirect("back");
});

//middleware


module.exports=app;