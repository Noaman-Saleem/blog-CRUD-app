const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Blog = require('./models/blogs.js')
//connected to mongoDB
mongoose.connect('mongodb://localhost:27017/blog-app', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch(e => {
		console.log('OH NON ERROR')
		console.log(e)
	})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
	const allBlogs = await Blog.find({})
	res.render('home', { allBlogs })
})

app.get('/blogs/new', (req, res) => {
	res.render('newBlog')
})

app.post('/blogs', async (req, res) => {
	// console.log(req.body)
	const blog = await new Blog(req.body)
	blog.save()
	res.redirect('/')
})

app.get('/blogs/:id/edit', async (req, res) => {
	const { id } = req.params
	const blog = await Blog.findById(id)
	res.render('editBlog', { blog })
})

app.put('/blogs/:id', async (req, res) => {
	const { id } = req.params
	const blog = await Blog.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
	res.redirect('/')
})

// app.get('/blogs/:id/delete',async (req,res)=>{
// 	const {id}=req.params
// 	await Blog.findByIdAndDelete(id)
// 	res.redirect('/')
// })

app.delete('/blogs/:id', async (req, res) => {
	const { id } = req.params
	await Blog.findByIdAndDelete(id)
	res.redirect('/')
})

app.listen(3000, () => {
	console.log('Server started at PORT 3000')
})