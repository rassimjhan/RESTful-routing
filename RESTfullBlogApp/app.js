var bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.set("view engine", "ejs");

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);

/* Blog.create({
  title: "THIS IS A TEST BLOG",
  image:
    "data:image/jpeg;base64,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",
  body: "TEST BLOG"
}); */

// RESTFUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
  // create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      // then redirect to the index
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlog
  ) {
    if(err){
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
  //destroy blog
  Blog.findByIdAndDelete(req.params.id, function(err) {
    if(err){
      res.redirect("/blogs");
    } else {
  //redirect somewhere
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function() {
  console.log("Server listening on 3000 port");
});
