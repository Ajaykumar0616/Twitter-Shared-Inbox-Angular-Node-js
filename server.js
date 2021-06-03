const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const posts = require("./server/routes/posts");
app.use(express.static(path.join(__dirname, "./dist/sharedInbox")));
/*app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/
app.use("/posts", posts);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/sharedInbox/index.html"));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
