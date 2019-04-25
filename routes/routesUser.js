const Router = require("express").Router()
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question

Router.get("/", (req, res) => {
	User.findAll()
	.then(user => {
		res.render('user.ejs',{
			userData : user
		})
	})
	.catch(err =>{
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
	User.destroy({
		where : {id : id}
	})
	.then(value =>{
		res.redirect('/user')
	})
	.catch(err => {
		res.send(err)
	})
})

module.exports = Router