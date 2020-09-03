var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
//==============================
//comment route
//========================
router.get("/campground/:id/comments/new",isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("newcomments",{campground:campground});
        }
    });
});

router.post("/campground/:id/comments",isloggedin,function(req,res){
    //lookup for id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{

                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added commment");
                    res.redirect('/campground/' + campground._id);
                }
            });
        }
    });
});

//edit route
router.get("/campground/:id/comments/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(!foundComment){
            req.flash("error","item not found");
            res.redirect("back");
        }
            res.render("editcomment",{campground_id:req.params.id,comment:foundComment});
        
    });
});
//Update route
router.put("/campground/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campground/" + req.params.id);
        }
    });
});
//Destroy route
router.delete("/campground/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","comment deleted");
            res.redirect("/campground/" + req.params.id);
        }
    });
});
function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in");
    res.redirect("/login");
 }
 
 //campgroundOwner middleware
 function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(!foundComment){
                    req.flash("error","item not found");
                    res.redirect("back");
                }
                if(foundComment.author.id.equals(req.user._id)){
                    next();

                }else{
                    req.flash("error","You dont have permission");
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