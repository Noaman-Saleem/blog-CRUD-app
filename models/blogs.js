const mongoose = require('mongoose');

const { Schema } = mongoose;

  const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String
  });

const Blog = mongoose.model('Blog', blogSchema);
module.exports=Blog;