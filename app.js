const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')

const routesUser = require("./routes/routesUser")
const routesTest = require("./routes/routesTest")
const routesQuestion = require("./routes/routesQuestion")

const User = require('./models').User
const Test = require('./models').Test
const Question = require('./models').Question

app.use(express.urlencoded({extended: false}))

let sess = {
	secret : 'mainyuk',
	cookie :{},
	isLogin : false
}

app.use(session(sess))




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





app.use("/user", routesUser)
app.use("/test", routesTest)
app.use("/question", routesQuestion)
app.listen(port, () => console.log(`Clone Duolingo Apps listening on port ${port}!`))