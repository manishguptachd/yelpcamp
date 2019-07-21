var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//====================Creating a "/campgrounds" ROUTE for all campground page===================//
//INDEX - REST conventional names as GET which show us all the Campgrounds 
router.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });
    // res.render("campgrounds", { campgrounds: campgrounds });
});
//====================End of Creating a "/campgrounds" ROUTE for all campground page===================//



//====================Creating a "/campgrounds" ROUTE for all new campground form page===================//
//REST conventional names as POST which allow us to create a new Campgrounds 
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //make an array object to insert new Campgrounds
    var newCampground = { name: name, price: price, image: image, description: desc, author: author };

    //create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);    
});
//====================End of Creating a "/campgrounds" ROUTE for all new campground form page===================//



//========================Route for creating a new campground and then redirect===============//
//REST conventional names which show the form that will send data to the POST route
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});
//========================End of Route for creating a new campground and then redirect===============//



//=========================Show/Description ROUTE for the specific campground===================//
//SHOW - show more info about one campgrounds
router.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
    //render show template with that campgrounds
    // console.log("THIS WILL BE THE SHOW PAGE ONE DAY!");
    // res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
    // res.render("show");
});
//=========================End of Show/Description ROUTE for the specific campground===================//


// EDIT CAMPGROUND 
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

// DELETE CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;