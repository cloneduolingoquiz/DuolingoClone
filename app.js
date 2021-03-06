const express = require('express')
const app = express()
const port = 3000

const routesUser = require("./routes/routesUser")
const routesTest = require("./routes/routesTest")
const routesQuestion = require("./routes/routesQuestion")

const User = require('./models').User
const Test = require('./models').Test
const Question = require('./models').Question

app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
	User.findAll()
	.then((db) => {
		res.render("./index.ejs", {
		dataUser: db,
		})	
	})
  	.catch((err) => {
  		res.send(err)
  	})
})

app.get("/login", (req, res) => {
	res.render("login.ejs")
})

app.get("/register", (req, res) => {
	res.render("register.ejs", {
		error: req.query.errMsg
	})
})

app.post("/register", (req, res) => {
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	.then((data) => {
		res.redirect("/")
	})
	.catch((err) => {
		res.redirect("/register?errMsg=" + err.errors[0].message)
	})
})

app.use("/user", routesUser)
app.use("/test", routesTest)
app.use("/question", routesQuestion)
app.listen(port, () => console.log(`Clone Duolingo Apps listening on port ${port}!`))