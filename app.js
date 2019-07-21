const express = require("express"),
    flash = require("connect-flash"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    request = require("request"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override");
// passportLocalMongoose = require("passport-local-mongoose");


//=============================require all routes======================================//
var campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments");

//=========================End of require all routes===================================//



//========================Creating Database============================================//
//this will create a yelpcamp database     
mongoose.connect("mongodb://localhost/yelp_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Campground = require("./models/campground"), //require Campground modules for db Schema and Table name Creation
    Comment = require("./models/comment"),
    User = require("./models/user");
//========================End of Creating Database============================================//


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //use of css file
app.use(methodOverride("_method")); //this method is used for PUT method in edit.ejs
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
//===============We have to use these two line anytime when we use==========================//
app.use(passport.initialize()); //tell express to use passport
app.use(passport.session());
//===============End of we have to use these two line anytime when we use passportjs==========================//


//====================================Start===================================================//

//==responsible for reading the session, taking the data from the session that's encoded
//==and un-encoding it that's the "deserialize" and then encoding it "serialize" it and 
//==put it back in the session which is what serializeUser does
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encoding the data
passport.deserializeUser(User.deserializeUser()); //un-coding the data

//====================================End====================================================//
// END OF PASSPORT CONFIGURATION

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//==============================use require files for all routes=============================//
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
//==========================end of use require files for all routes==========================//


//create a database
// Campground.create({
//     name: "Granite Hill",
//     image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });

//remove a data
// Campground.deleteMany({
//         name: "Salmon Creek"
//     },
//     function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Removed");
//             console.log(campground);
//         }
//     }
// );

// var campgrounds = [
//     { name: "Salmon Creek", image: "C:/Users/DELL/webdevbootcamp/YelpCamp/images/1.jpg" },
//     { name: "Granite Hill", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg" },
//     { name: "Granite Hill", image: "/images/3" },
//     { name: "Mountain Goat's Rest", image: "/images/4" },
//     { name: "Salmon Creek", image: "/images/5" },
//     { name: "Granite Hill", image: "/images/6" },
//     { name: "Mountain Goat's Rest", image: "/images/1" },
//     { name: "Salmon Creek", image: "/images/2" },
//     { name: "Granite Hill", image: "/images/3" },
//     { name: "Mountain Goat's Rest", image: "/images/4" },
//     { name: "Salmon Creek", image: "/images/5" },
//     { name: "Granite Hill", image: "/images/6" }
// ];



// //======================Creating a "/" route for landing page========================//
// app.get("/", function(req, res) {
//     res.render("landing");
// });
// //======================End of Creating a "/" route for landing page========================//



// //====================Creating a "/campgrounds" ROUTE for all campground page===================//
// //INDEX - REST conventional names as GET which show us all the Campgrounds 
// app.get("/campgrounds", function(req, res) {
//     //Get all campgrounds from DB
//     Campground.find({}, function(err, allCampgrounds) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
//         }
//     });
//     // res.render("campgrounds", { campgrounds: campgrounds });
// });
// //====================End of Creating a "/campgrounds" ROUTE for all campground page===================//



// //====================Creating a "/campgrounds" ROUTE for all new campground form page===================//
// //REST conventional names as POST which allow us to create a new Campgrounds 
// app.post("/campgrounds", function(req, res) {
//     //get data from form and add to campgrounds array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     //make an array object to insert new Campgrounds
//     var newCampground = { name: name, image: image, description: desc };

//     //create a new campground and save it to DB
//     Campground.create(newCampground, function(err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     });
//     // campgrounds.push(newCampground);    
// });
// //====================End of Creating a "/campgrounds" ROUTE for all new campground form page===================//



// //========================Route for creating a new campground and then redirect===============//
// //REST conventional names which show the form that will send data to the POST route
// app.get("/campgrounds/new", isLoggedIn, function(req, res) {
//     res.render("campgrounds/new.ejs");
// });
// //========================End of Route for creating a new campground and then redirect===============//



// //=========================Show/Description ROUTE for the specific campground===================//
// //SHOW - show more info about one campgrounds
// app.get("/campgrounds/:id", function(req, res) {
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             //render show template with that campground
//             res.render("campgrounds/show", { campground: foundCampground });
//         }
//     });
//     //render show template with that campgrounds
//     // console.log("THIS WILL BE THE SHOW PAGE ONE DAY!");
//     // res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
//     // res.render("show");
// });
// //=========================End of Show/Description ROUTE for the specific campground===================//

// //==============================For Comments=============================//
// //==================Create a new db and ROUTE as GET req campgrounds/:id/comments/new===================//
// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
//     //find Campground by id
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", { campground: campground });
//         }
//     });

// });
// //==================End of Create a new db and ROUTE as GET req campgrounds/:id/comments/new===================//

// //==================Create a new db and ROUTE as POST req campgrounds/:id/comments===================//
// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
//     //lookup campground using ID
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             console.log(err);
//             res.redirect("/campgrounds");
//         } else {
//             Comment.create(req.body.comment, function(err, comment) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect('/campgrounds/' + campground._id);
//                 }
//             });
//         }
//     });
//     //create a new comment
//     //connect new comment to campground
//     //redirect campground show page  
// });
// //==================End of Create a new db and ROUTE as POST req campgrounds/:id/comments===================//
// //==============================End of For Comments=============================//



// //===============
// // AUTH ROUTES
// //===============

// //show register form
// app.get("/register", function(req, res) {
//     res.render("register");
// });

// //handle sign up logic
// app.post("/register", function(req, res) {
//     var newUser = new User({ username: req.body.username });
//     User.register(newUser, req.body.password, function(err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function() {
//             res.redirect("/campgrounds");
//         });
//     });
// });


// // show login form
// app.get("/login", function(req, res) {
//     res.render("login");
// });
// // handling login logic
// //app.post("/login", middleware, callback)
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login"
// }), function(req, res) {

// });

// // logout route logic
// app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/campgrounds");
// });

// //logout middleware which added to "/campgrounds/:id/comments/new"
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }


app.listen(process.env.PORT || 5000);