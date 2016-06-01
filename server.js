// Node.js Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const handlebars = require('express-handlebars');
const http = require("http").createServer(app);
const passport = require('passport')
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var models = require('./models');

//graph
//var Chart = require('./node_modules/chart.js/dist/Chart.min.js');
//var myChart = new Chart({...})


require('dotenv').config();

require("dotenv").load();
var models = require("./models");
var db = mongoose.connection;

var router = { 
	  index: require("./routes/index"),
    home: require("./routes/home"),
    map: require("./routes/maps"),
    data: require("./routes/data"),
    list: require("./routes/list"),
    graph:require("./routes/graph")//delete later
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

var strategy = { 
	linkedin: require('passport-linkedin').Strategy
};
// Database Connection
mongoose.connect( process.env.MONGODB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});

// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: db })
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: true }));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);

/* Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Use Twitter Strategy for Passport */
passport.use(new strategy.linkedin({
    consumerKey: process.env.LINKEDIN_CONSUMER_ID,
    consumerSecret: process.env.LINKEDIN_CONSUMER_SECRET,
    callbackURL: "/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'picture-url','headline', 'industry']
  },
  function(token, tokenSecret, profile, done) {
    models.User.findOne({ "linkedinID": profile.id }, function(err, user) {
    if(err){
    	return done(err);
    }

    // console.log(profile);

    if(!user) {
  		// (2) since the user is not found, create new user.
  		var newUser = new models.User({
  		    "linkedinID": profile.id,
  		    "token": token,
          "firstName": profile._json.firstName,
          "lastName": profile._json.lastName,
          "headline": profile._json.headline,
          "industry": profile._json.industry,
          "pictureUrl": profile._json.pictureUrl
  		});

   		newUser.save(function(err, data){
   			if(err){
   				console.log(err);
   			}else{
   				console.log("User added: " + data);
   			}
   		});
   		return done(null, newUser);

    } else {
        // (3) since the user is found, update user’s information
        user.twitterID = profile.id;
        user.token = token;
        user.firstName = profile._json.firstName;
        user.lastName = profile._json.lastName;
        user.headline = profile._json.headline;
        user.industry = profile._json.industry;
        user.pictureUrl = profile._json.pictureUrl;
        
        user.save(function(err, data){
     			if(err){
     				console.log(err);
     			}else{
     				console.log("User updated: " + data);
     			}
     		});
        process.nextTick(function() {
            return done(null, user);
        });
    }
  });
  }
));

/* Passport serialization */
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Passport Routes
app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { successRedirect: '/home',
                                     failureRedirect: '/' }));
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// Routes for pages
app.get("/", router.index.view);
app.get("/home", router.home.view);
app.get("/map", router.map.view);
app.get("/list", router.list.view);

//Routes for JSON data
app.get("/getBusinessLocationData", router.index.getBusinessLocationData)

app.get("/getCategories", router.data.getCategories);
app.get("/getSanData", router.data.getSanData);
app.get("/getUserData", router.data.getUserData);
app.get("/getIndustry", router.data.getIndustry);

//Post routes
app.post("/postIndustry", router.data.postIndustry);

app.use(function(req,res){
    res.render('404');
});

// Start Server
http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
