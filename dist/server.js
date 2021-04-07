"use strict";
"user strict";
/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)

var USE_TEST_USER = env !== "production" && process.env.TEST_USER_ON; // option to turn on the test user.

var TEST_USER_ID = "5fb8b011b864666580b4efe3"; // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file

var TEST_USER_EMAIL = "test@user.com"; //////

var path = require("path");

var express = require("express");

var app = express();
var log = console.log; // enable CORS if in development, for React local development server to connect to the web server.

var cors = require("cors");

if (env !== "production") {
  app.use(cors());
}

var bodyParser = require("body-parser");

app.use(bodyParser.json());

var _require = require("mongodb"),
    ObjectID = _require.ObjectID;

var _require2 = require("./db/mongoose"),
    mongoose = _require2.mongoose;

var _require3 = require("./models/user"),
    User = _require3.User;

var _require4 = require("./models/project"),
    Project = _require4.Project;

var session = require("express-session");

var MongoStore = require("connect-mongo"); // to store session information on the database in production


var ProjectRoute = require('./routes/project');

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return _typeof(error) === "object" && error !== null && error.name === "MongoNetworkError";
} // ==================parts for middlewares ==========================
// middleware for mongo connection error for routes that need it


var mongoChecker = function mongoChecker(req, res, next) {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
}; // Middleware for authentication of resources


var authenticate = function authenticate(req, res, next) {
  if (env !== "production" && USE_TEST_USER) req.session.user = TEST_USER_ID; // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

  if (req.session.user) {
    User.findById(req.session.user).then(function (user) {
      if (!user) {
        return Promise.reject();
      } else {
        next();
      }
    })["catch"](function (error) {
      res.status(401).send("Unauthorized");
    });
  } else {
    res.status(401).send("Unauthorized");
  }
}; // Create a session and session cookie


app.use(session({
  secret: process.env.SESSION_SECRET || "our hardcoded secret",
  // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
    httpOnly: true
  },
  // store the sessions on the database in production
  store: env === "production" ? MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/StudentAPI"
  }) : null
}));
/* API Routes */
// A route to login and create a session

app.post("/api/login", function (req, res) {
  var userName = req.body.userName;
  var password = req.body.password; // log(email, password);
  // Use the static method on the User model to find a user
  // by their email and password

  User.findByUnamePassword(userName, password).then(function (user) {
    // Add the user's id to the session.
    // We can check later if this exists to ensure we are logged in.
    req.session.user = user._id;
    req.session.userName = user.userName; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).

    console.log("debug", user);
    res.send(user);
  })["catch"](function (error) {
    res.status(400).send();
  });
}); // route to get user profile

app.get("/api/user/:username", function (req, res) {
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  var username = req.params.username;
  User.findOne({
    userName: username
  }).then(function (user) {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.send(user);
  })["catch"](function (error) {
    res.status(500).send("Internal server error");
  });
});
app.get("/api/users", mongoChecker, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.find({});

          case 3:
            users = _context.sent;
            json = JSON.stringify(users);
            res.send(json);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            log(error);
            res.status(500).send("Internal Server Error");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // route to create a new user

app.post("/api/newUser", function (req, res) {
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  console.log(req.body);
  var newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });
  newUser.save().then(function (result) {
    res.send(result);
  })["catch"](function (error) {
    res.status(400).send("Bad Request");
    console.log(error);
  });
}); // route to delete a user

app["delete"]("/api/deleteUser/:username", function (req, res) {
  // TODO: add a middleware to check for admin
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  var username = req.params.username;
  User.deleteOne({
    userName: username
  }).then(function (result) {
    if (result.n === 0) {
      res.status(404).send("user not found");
    } else if (result.ok) {
      res.send(result);
    } else {
      res.status(500).send("Internal server error");
    }
  })["catch"](function (error) {
    res.status(500).send("Internal server error");
  });
}); // route to update user profile

app.patch("/api/updateProfile", function (req, res) {
  // TODO: Add session checks
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  var profileData = ["description", "skills", "experiences", "email", "linkedin", "github"];
  User.findOne({
    userName: req.session.userName
  }).then(function (user) {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    console.log(req.body);
    profileData.forEach(function (name) {
      if (req.body[name]) {
        user[name] = req.body[name];
      }
    });
    user.save().then(function (result) {
      res.send(result);
      console.log("".concat(user["userName"], " updated"));
    })["catch"](function (err) {
      res.status(400).send("bad request");
      return;
    });
  })["catch"](function (err) {
    res.status(500).send("Internal Server error");
    return;
  });
});
app.patch("/connections/reply/:username", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var username, friendName, user, friend;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(mongoose.connection.readyState != 1)) {
              _context2.next = 3;
              break;
            }

            res.status(500).send('Internal server error');
            return _context2.abrupt("return");

          case 3:
            username = req.session.userName;
            friendName = req.params.username;
            _context2.prev = 5;
            _context2.next = 8;
            return User.findOne({
              userName: username
            });

          case 8:
            user = _context2.sent;

            if (user) {
              _context2.next = 12;
              break;
            }

            res.status(404).send('User not found');
            return _context2.abrupt("return");

          case 12:
            if (user.pending.includes(friendName)) {
              _context2.next = 17;
              break;
            }

            res.status(404).send('User not found');
            return _context2.abrupt("return");

          case 17:
            user.pending.remove(friendName);

          case 18:
            if (!req.body.accept) {
              _context2.next = 30;
              break;
            }

            if (user.connections.includes(friendName)) {
              _context2.next = 30;
              break;
            }

            user.connections.push(friendName);
            _context2.next = 23;
            return User.findOne({
              userName: friendName
            });

          case 23:
            friend = _context2.sent;

            if (friend) {
              _context2.next = 27;
              break;
            }

            res.status(404).send('User not found');
            return _context2.abrupt("return");

          case 27:
            friend.connections.push(username);
            _context2.next = 30;
            return friend.save();

          case 30:
            _context2.next = 32;
            return user.save();

          case 32:
            console.log("connection accepted");
            res.send(friendName);
            _context2.next = 40;
            break;

          case 36:
            _context2.prev = 36;
            _context2.t0 = _context2["catch"](5);
            res.status(500).send("Internal Server error");
            return _context2.abrupt("return");

          case 40:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 36]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.post("/connections/request/:username", function (req, res) {
  // TODO: Add session checks
  if (mongoose.connection.readyState != 1) {
    res.status(500).send('Internal server error');
    return;
  }

  var username = req.session.userName;
  var friendName = req.params.username;
  User.findOne({
    userName: friendName
  }).then(function (user) {
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (!user.pending.includes(username)) {
      user.pending.push(username);
    }

    user.save().then(function (result) {
      res.send(result);
    })["catch"](function (err) {
      res.status(400).send("bad request");
      return;
    });
  })["catch"](function (err) {
    res.status(500).send("Internal Server error");
    return;
  });
});
app["delete"]("/connections/remove/:username", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var username, friendName, user, friend;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(mongoose.connection.readyState != 1)) {
              _context3.next = 3;
              break;
            }

            res.status(500).send('Internal server error');
            return _context3.abrupt("return");

          case 3:
            username = req.session.userName;
            friendName = req.params.username;
            _context3.prev = 5;
            _context3.next = 8;
            return User.findOne({
              userName: username
            });

          case 8:
            user = _context3.sent;

            if (user) {
              _context3.next = 12;
              break;
            }

            res.status(404).send('User not found');
            return _context3.abrupt("return");

          case 12:
            if (!user.connections.includes(friendName)) {
              _context3.next = 28;
              break;
            }

            user.connections.remove(friendName);
            _context3.next = 16;
            return User.findOne({
              userName: friendName
            });

          case 16:
            friend = _context3.sent;

            if (friend) {
              _context3.next = 20;
              break;
            }

            res.status(404).send('User not found');
            return _context3.abrupt("return");

          case 20:
            friend.connections.remove(username);
            _context3.next = 23;
            return friend.save();

          case 23:
            _context3.next = 25;
            return user.save();

          case 25:
            console.log("connection accepted");
            _context3.next = 29;
            break;

          case 28:
            res.status(404).send('User not found');

          case 29:
            res.send(friendName);
            _context3.next = 36;
            break;

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](5);
            res.status(500).send("Internal Server error");
            return _context3.abrupt("return");

          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 32]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.use(express["static"](path.join(__dirname, "/client/build"))); // All routes other than above will go to index.html

app.get("*", function (req, res) {
  // check for page routes that we expect in the frontend to provide correct status code.
  var goodPageRoutes = ["/", "/loggin", "/teammates", "/project", "/user", "/profile", "/newProject"];

  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  } // send index.html


  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
app.use("/api", ProjectRoute);
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Listening on port ".concat(port, "..."));
});