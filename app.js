var express     =require("express"),
    app         =express(),
    bodyparser  =require("body-parser"),
    mongoose    =require("mongoose"),
    flash       =require("connect-flash"),
    passport    =require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment");
    User        =require("./models/user");
    seedDB      =require("./seed")
 
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index");    

mongoose.connect("mongodb://localhost:27017/yelp_camp_v4",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('connected to db'))
.catch(error =>console.log(error.message));

app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

seedDB();

//Passport configuration
app.use(require("express-session")({
    secret:"once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);    
//var Campground=mongoose.model("Campground",campgroundSchema);
/*var camp=[
    {name:"THREE CLIFFS BAY, GOWER",image:"https://s3.ap-south-1.amazonaws.com/campmonk.com/blogs/ae8fd190-be61-11e9-8c3a-6f0a1037c94e-1200-1200.jpeg"},
    {name:"TURNER HALL FARM, CUMBRIA",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name:"BRIGHOUSE BAY, DUMFRIES AND GALLOWAY",image:"https://static2.tripoto.com/media/filter/tst/img/1558375/TripDocument/1557737973_camping_tents_0.jpg"}
];*/

/*Campground.create({
    name:"BRIGHOUSE BAY, DUMFRIES AND GALLOWAY",
    image:"https://static2.tripoto.com/media/filter/tst/img/1558375/TripDocument/1557737973_camping_tents_0.jpg" ,
    decription: "this is beautiful sites on cityside,beautiful camp are setup on riverside"
},
function(err,campground){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(campground);
    }
  
});*/
app.listen(3000,function(){
    console.log("Yelpcamp sever has started");
});
