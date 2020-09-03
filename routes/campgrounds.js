var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

router.get("/campground",function(req,res){
    //res.render("camping",{camp:camp});
    //get all the campground in the db
    
    Campground.find({},function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{camp:camp,currentUser:req.user});
        }
    });
    
 });

 router.get("/campground/new",isloggedin,function(req,res){
    res.render("newcampground");
});

 router.post("/campground",isloggedin,function(req,res){
     var name=req.body.name;
     var image=req.body.image;
     var desc=req.body.Description;
     var author={
         id:req.user._id,
         username:req.user.username
     };
     
     var newcampground={name: name, image: image, description:desc,author:author};
    /* camp.push(newcampground);
     res.redirect("/campground");*/
     //create a new campground and save to db
     
      Campground.create(newcampground,function(err,newlycreated){
          if(err){
              console.log(err);
          }
          else{
              res.redirect("/campground");
          }

      });
     
 });

 

//show more info about campgrounds
router.get("/campground/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log("error from show");
            console.log(err);
        }
        else{
            if(!foundcampground){
                req.flash("error","item not found");
                res.redirect("back");
            }
            res.render("show",{campground: foundcampground});
        }
    });
    
});

//edit route
router.get("/campground/:id/edit",checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(!foundCampground){
            req.flash("error","item not found");
            res.redirect("back");
        }
            res.render("edit",{campground:foundCampground});
    });
    
});
//update route
router.put("/campground/:id/edit",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.edit,function(err,updateCampground){
        if(err){
            res.redirect("/campground");
        }else{
            res.redirect("/campground/" + req.params.id);
        }
    });

});

//DESTROY Route
router.delete("/campground/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,){
        if(err){
            res.redirect("/campground");
        }else{
            res.redirect("/campground");
        }
    });
});
//add middleware
function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in");
    res.redirect("/login");
 }
 
 //campgroundOwner middleware
 function checkCampgroundOwnership(req,res,next){
     if(req.isAuthenticated()){
         Campground.findById(req.params.id,function(err,foundCampground){
             if(err){
                 req.flash("error","Campgroundnot found");
                 res.redirect("back");
             }else{
                 if(!foundCampground){
                     req.flash("error","item not found");
                     return res.redirect("back");
                 }
                 if(foundCampground.author.id.equals(req.user._id)){
                     next();

                 }else{
                     req.flash("error","You do not have permission to do that");
                     res.redirect("back");
                 }
             }
         });
         
     }else{
        req.flash("error","You need to be logged in");
         res.redirect("back");
     }
}
module.exports=router;