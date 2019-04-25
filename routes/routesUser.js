const Router = require("express").Router()
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question


Router.get("/", (req, res) => {
	// console.log('masuklog')
	User.findAll({hooks:false})
	.then(user => {
		res.render("user.ejs",{
			userData : user
		})
	})
	// .then(function(value){
	// 	// log(value)
	// 	console.log(value)
	// })
	.catch(err =>{
		console.log(err)
		res.send(err)
	})
})

Router.get('/:id/edit',(req,res) =>{
	let id = req.params.id
	User.findByPk(id)
	.then(value =>{
		res.render("editUser.ejs",{
			userData : value
		})
		// res.send(value)
	})
	.catch(err =>{
		res.send(err)
	})
})

Router.post('/:id/edit',(req,res) => {
	let id = req.params.id
	User.update({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	},{where : {id : id}})
	.then(value =>{
		res.redirect('/user')
	})
	.catch(err=>{
		res.send(err)
	})
})

Router.get('/:id/delete',(req,res) => {
	let id = req.params.id
	User.destroy({
		where : {id : id}
	})
	.then(value =>{
		res.redirect('/')
	})
	.catch(err => {
		res.send(err)
	})
})

Router.get("/register", (req, res) => {
	res.render("register.ejs", {
		error: req.query.errMsg
	})
})

Router.post("/register", (req, res) => {
	console.log(req.body);
	User.create({
		// id : req.body.id,
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	.then(value => {
		// console.log('berhasillll');
		res.redirect("/user")
	})
	.catch((err) => {
		console.log(err);
		
		res.redirect("/user/register?errMsg=" + err.errors[0].message)
		// console.log(err)
		// res.send(err)
	})
})

Router.get("/login", (req, res) => {
	res.render("login.ejs")
})

Router.post('/login',(req,res) =>{
	// console.log(req.body);
	// res.send(req.body)
	User.findOne({where : {
		email : req.body.email,
		password: req.body.password
	}})
	.then(value => {
		if(value){
			req.session.UserId = value.id
			req.session.isLogin = true
			console.log(typeof req.session.UserId)
			// let ok = req.session
			// console.log(ok);
			// console.log(req.session.id, '------');
			// console.log(value.dataValues.id,'++++++++');
			res.redirect('/')
		}else{
			res.redirect('/register')
		}
	})
	.catch(err =>{
		console.log(err);
		
		res.send(err)
	})
})

/*
Albums.findAll({
  include: [{// Notice `include` takes an ARRAY
    model: Artists
  }]
})
.then(albums => console.log(albums))
.catch(console.error)
*/

Router.get('/leaderboard',function(req,res){
	Test.findAll({hooks:false}, {
		include : {
			model : User
		}
	})
	.then(value => {
		// res.send(value)
		console.log(value)
	})
	.catch(err =>{
		console.log(err)
		res.send(err)
	})
})

module.exports = Router