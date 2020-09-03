var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
      name:"Runn of Kutch",
      image:"https://s3.ap-south-1.amazonaws.com/campmonk.com/blogs/ae8fd190-be61-11e9-8c3a-6f0a1037c94e-1200-1200.jpeg",
      description:"white sand desert"
    },
    {
       name:"Leh Ladhak",
       image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
       description:"Best camp place in the world ,in the lap of mountains",

    },
    {
      name:"BRIGHOUSE BAY",
      image:"https://static2.tripoto.com/media/filter/tst/img/1558375/TripDocument/1557737973_camping_tents_0.jpg",
      description:"great for night camping"
    }
]
 
function seedDB(){
   //Remove all campgrounds
  // Campground.remove({}, function(err){
      //  if(err){
        //    console.log(err);
       // }
       // console.log("removed campgrounds!");
        //Comment.remove({}, function(err) {
            //if(err){
              //  console.log(err);
            //}
              //console.log("removed comment");
              //add campground
  //          data.forEach(function(seed){
    //            Campground.create(seed, function(err, campground){
      //              if(err){
              //          console.log(err)
        //            } else {
            //            console.log("added a campground");
          //             // create a comment
                       // Comment.create(
                         //   {
                           //     text: "This place is great, but there was internet",
                             //   author: "Yelpcamp"
                            //}, function(err, comment){
                              //  if(err){
                                //    console.log(err);
                                //} else {
                                  //  campground.comments.push(comment);
                                    //campground.save();
                                    //console.log("Created new comment");
                                //}
                            //});
                //    }
               // });
           // });
       // });
    //}); 
    //add a few comments
}
 
module.exports = seedDB;