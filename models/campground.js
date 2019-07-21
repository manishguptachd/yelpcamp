var mongoose = require("mongoose"); //require mongoose
//===========================Creating Schema/Structure and Table/Collections for the Database==================// 
//SCHEMA SETUP
//=============Creating a Schema/Structure in Database==============//
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    //associate db which shows the details of logged in user 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
//=============End of Creating a Schema/Structure in Database==============//

//compile it into a model
//=============Creating singular name of db "Campground"===================//
//             which converted as plural "campgrounds" in db               //
module.exports = mongoose.model("Campground", campgroundSchema);
//=============End of Creating singular name of db "Campground"===================//
//             which converted as plural "campgrounds" in db                     //

//===========================End of Creating Schema/Structure and Table/Collections for the Database==================//