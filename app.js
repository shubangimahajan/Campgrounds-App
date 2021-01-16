var express= require("express");
var app= express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var localstrategy=require("passport-local");
var methodoverride= require("method-override");
var campgrounds=require("./models/campgrounds");
var comments=require("./models/comments");
var user=require("./models/user");
var seedDB=require("./seeds");

var commentroutes=require("./routes/comments"),
    campgroundroutes=require("./routes/campgrounds"),
    authroutes=require("./routes/auth");

//mongoose.connect("mongodb://localhost:27017/campapp2", {useNewUrlParser: true});
//mongoose.connect("mongodb+srv://shubangi:sstanmay100%2D@cluster01-orioo.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

//var url="mongodb+srv://camps-db:myfirstdb@cluster-campgrounds.erals.mongodb.net/camps-db?retryWrites=true&w=majority";
//mongodb+srv://camps-db:myfirstdb@cluster-campgrounds.erals.mongodb.net/camps-db?retryWrites=true&w=majority
var url=process.env.DATABASEURL || "mongodb://localhost:27017/campapp2";

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true
	}).then(()=>{
	console.log("connected to db");
}).catch(err=>{
	console.log("error:", err.message);
});

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(flash());

//seed the database
//seedDB();

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

app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use("/campgrounds", campgroundroutes);
app.use("/campgrounds/:id/comments", commentroutes);
app.use(authroutes);

//campgrounds.create(
//	{name: "anjuna beach", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/anjuna-beach-goa.jpg"},
//	function(err,campg){
//	if(err){
//		console.log("ERROR!");
//	}else{
//		console.log("CAMP SAVED");
//		console.log(campg);
//	}
//});

//	var campground=[
//		{name:"spiti valley", image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/spiti-valley-himachal-pradesh.jpg"},
//		{name:"tso moriri", image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/tso-Moriri-Ladakh.jpg"},
//		{name:"rishikesh", image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/rishikesh-uttarakhand.jpg"},
//		{name: "nameri eco camp", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/nameri-eco-camp-assam.jpg"},
//		{name: "anjuna beach", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/anjuna-beach-goa.jpg"},
//		{name: "sam sand dunes", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/sam-sand-dunes-%E2%80%93jaisalmer.jpg"},
//		{name: "neora valley", image: "https://toib.b-cdn.net/wp-content/uploads/2017/08/neora-valley-camp-west-Bengal.jpg"},
//	];



app.listen(process.env.PORT || 3000,function(){
	console.log("welcome to yelpcamp :)");
});