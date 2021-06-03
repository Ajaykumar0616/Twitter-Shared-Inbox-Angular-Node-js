const express = require("express");
const router = express.Router();
const Twit = require("twit");
const config = require("./config");
var passport = require("passport");
var Strategy = require("passport-twitter").Strategy;
var session = require("express-session");
const cors = require("cors");
const url = require("url");
//const timeLine
var storage = require("session-storage");
var store = require("store");
const bodyParser = require("body-parser");
var reqSecret;

passport.use(
  new Strategy(
    {
      consumerKey: "",
      consumerSecret: "",
      callbackURL: "http://localhost:3000/posts/signIn/",
    },
    function (token, tokenSecret, profile, callback) {
      console.log("token:" + token);
      console.log("secretToken:" + tokenSecret);
      console.log("profile:" + JSON.stringify(profile));
      store.set(profile.id, {
        accessToken: token,
        accessTokenSecret: tokenSecret,
        name: profile.username,
        profile: profile,
      });
      console.log(store.get(profile.id));
      /* storage.setValue(profile.id + "accessToken", token, (err, result) => {
        console.log(err);
      });
      storage.setValue(profile.id + "accessTokenSecret", tokenSecret);*/
      return callback(null, profile);
    }
  )
);
passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});
router.use(
  session({ secret: "whatever", resave: true, saveUninitialized: true })
);
router.use(passport.initialize());
/*router.use(
  cors({
    origin: "http://localhost:3000",
  })
);*/
router.use(passport.session());
router.get("/twitter/login/", passport.authenticate("twitter"));
router.get(
  "/signIn/",
  passport.authenticate("twitter", {
    failureRedirect: "/",
  }),
  function (req, res) {
    console.log(res);
    console.log(store.get(req.user.id));
    console.log(req.user.id);
    res.redirect(
      url.format({
        pathname: "/posts/helpdesk/",
        query: {
          id: req.user.id,
        },
      })
    );
  }
);

router.post("/getTimeLine/", bodyParser.json(), (req, res) => {
  console.log("req:" + req.body.id);
  var userTokens = store.get(req.body.id);
  console.log("userToken:" + JSON.stringify(userTokens));
  var client = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: userTokens.accessToken,
    access_token_secret: userTokens.accessTokenSecret,
  });
  var timelineList;
  console.log(JSON.stringify(client));
  /*client.get("statuses/home_timeline", { count: 10 }, function (
    err,
    data,
    response
  ) {
    timelineList = data;
    console.log("after tweet:" + JSON.stringify(data));
    res.status(200).json({
      name: store.get(req.body.id).name,
      timeLineData: data,
      user: store.get(req.body.id).profile,
    });
  });*/
  console.log("search Key" + store.get(req.body.id).profile.username);

  client.get("statuses/user_timeline", { count: 10 }, function (
    err,
    data,
    response
  ) {
    console.log("@mentions:" + JSON.stringify(data));
    /*res.status(200).json({
      name: store.get(req.body.id).name,
      timeLineData: data,
      user: store.get(req.body.id).profile,
    });*/
  });
  client.get(
    "search/tweets",
    { q: "@" + store.get(req.body.id).profile.username, count: 10 },
    function (err, data, response) {
      console.log("searchResult:" + JSON.stringify(data));
      res.status(200).json({
        name: store.get(req.body.id).name,
        timeLineData: data,
        user: store.get(req.body.id).profile,
      });
    }
  );
});
router.post("/getHelpDeskDetails/", bodyParser.json(), (req, res) => {
  console.log("req:" + req.body.id);
  var userTokens = store.get(req.body.id);
  console.log("userToken:" + JSON.stringify(userTokens));
  var client = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: userTokens.accessToken,
    access_token_secret: userTokens.accessTokenSecret,
  });
  console.log(JSON.stringify(client));
  client.post("statuses/update", { status: req.body.textMsg }, function (
    err,
    data,
    response
  ) {
    console.log("after tweet:" + JSON.stringify(data));
    res.status(200).json({
      name: store.get(req.body.id).name,
      user: store.get(req.body.id).profile,
    });
  });
});

router.get("/", (req, res) => {
  try {
    console.log(JSON.stringify(session));
    res.status(200).json({ name: "Ajay" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
