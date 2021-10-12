// require dependencies
const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/users");
const session = require("express-session");
const sessionController = require("./controllers/sessions");
const methodOverride = require("method-override")

// Initialize express App
const app = express();

// Configure Settings
require("dotenv").config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Database Configuration
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on("connected", () => {
    console.log(`Connected to MongoDB`)
});

db.on("error", (error) => {
    console.log(`An Error Occurred with MongoDB ${error.message}`)
});

// Mount Middleware
app.use(express.urlencoded({extended:false}));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
    );
app.use(methodOverride("_method"))
app.use("/sessions", sessionController);
app.use("/users", userController);
const Game = require("./models/game")




//////// ROUTES INDUCES////////


// Index route
app.get("/", (req, res) => {

  Game.find({}, (error, allGames) => {
    res.render("dashboard.ejs", {
      games: allGames,
    currentUser: req.session.currentUser,

    });
  });
});

  //   if (req.session.currentUser) {
  //     res.render("dashboard.ejs", {
  //       currentUser: req.session.currentUser,
  //     })
  //   }
     
    
  // });


  

// New Route
app.get("/new", (req, res) => {
  res.render("new.ejs")
});


// Delete Route
// app.delete("/games/:id", (req, res) => {
//   res.send("deleting...")
// })



// Update Route




// Create Route
app.post("/", (req, res) => {
  Game.create(req.body, (error, createdGame) => {
    res.redirect("/") 

  });
});

// app.get("/games", (req, res) => {
//   Game.find({}, (error, allGames) => {
//     res.render("index.ejs", {
//        games: allGames,
//     });
//   });
// });



// Edit Route
// app.get("/games/:id/edit", (req, res) => {
//     Game.findById(req.params.id, (error, foundgame) => {
//       res.render("edit.ejs", {
//        game: foundGame,
//      });
//   });
// });




// Show Route
app.get("/games/:id", (req, res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render("show.ejs", {
      game: foundGame,
    });
  });
});
  




app.listen(PORT, () => {
    console.log(`You are now listening to the smooth sounds of typing on port: ${PORT}`)
});
