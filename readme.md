#YelpCamp

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all Campgrounds

Each Campgrounds has:
    * Name
    * Image

#Layout and Basic Styling
* Create and Header and Footer Partials
* Add a Bootstrap

#Creating New Campgrounds
* Setup new Campgrounds POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the Campgrounds Page
* Make a better header/title
* Make Campgrounds display in a Grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new Campgrounds form

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

#Comment New/Create
* Discuss Nested Routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely 

#Finish Styling Show Page
* Add public directory
* Add custom stylesheet

#Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

#Auth Pt. 2 - Register
* Configure Passport
* Add Register Routes
* Add Register Template

#Auth Pt. 3 - Login
* Add Login Routes
* Add Login Template

#Auth Pt. 4 - Logout/Navbar
* Add Logout Route
* Prevent user from adding a comment if not signed in
* Add Links to Navbar
* Show/Hide Auth links correctly

#Auth Pt. 5 - Show/Hide Links
* Show/Hide Auth Links in Navbar correctly 

#Refactor the Routes
* Use Express router to recognize all routes

#Users + Comments
* Associates Users and Comments
* Save author's name to a comment automatically

#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

#Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

#Deleting Campgrounds 
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

#Deleting Comments
* Add Destroy Route
* Add Delete Button

#Authorization Part 2: Comments 
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header
