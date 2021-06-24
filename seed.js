const mongoose = require('mongoose');

const Blog=require('./models/blogs.js')

mongoose.connect('mongodb://localhost:27017/blog-app', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log("Connected to MongoDB")
})
.catch(e=>{
	console.log('OH NON ERROR')
	console.log(e)
})

const newBlog = new Blog({
	title:'Hello baby',
	author:'faizan',
	body:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum v lorem ipsum v lorem ipsum v lorem ipsum'
})

newBlog.save()
.then(b=>{
	console.log(b)
})
.catch(e=>{
	console.log(e)
})