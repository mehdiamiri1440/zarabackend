var express = require("express");
var app = express();
app.use(express.json());
const posts = [
  { id: 1, name: "mehdi amiri" },
  { id: 2, name: "reza razavi" },
  { id: 3, name: "mamd hoseyni" }
];
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.get("/posts/:id", (req, res) => {
  posts.find(post => {
    let postobj = post.id == parseInt(req.params.id);
    if (!postobj) res.status(404).send("the requested file was not found");
    res.send(post);
  });
});
app.post("/posts", (req, res) => {
  const post = {
    id: posts.length++,
    name: req.body.name
  };
  posts.push(post);
  res.send(post);
});
var port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
