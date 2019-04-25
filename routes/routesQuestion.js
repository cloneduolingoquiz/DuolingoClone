const Router = require("express").Router()
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question
const sequelize = require('sequelize')

Router.get("/", (req, res) => {
	Question.findAll({
		order: sequelize.col('id')
	})
	.then(value => {
		// console.log(value);
		// res.send(value)
		res.render('question.ejs',{
			questionData : value
		})
	})
})

Router.get("/add",(req,res)=>{
	res.render("registerQuestion.ejs")
})

Router.post("/add",(req,res)=>{
	Question.create({
		question: req.body.question,
		answer: req.body.answer
	})
	.then(value =>{
		res.redirect('/question')
	})
	.catch(err =>{
		res.send(err)
	})
})

Router.get('/:id/edit',(req,res) =>{
	let id = req.params.id
	Question.findByPk(id)
	.then(value =>{
		res.render("editQuestion.ejs",{
			questionData : value
		})
		// res.send(value)
		// console.log(value);
	})
	.catch(err =>{
		res.send(err)
	})
})

Router.post('/:id/edit',(req,res)=>{
	let id = req.params.id
	console.log(req.body);
	Question.update({
		question : req.body.question,
		answer: req.body.answer
	},{where : {
		id : id
	}})
	.then(value =>{
		res.redirect('/question')
	})
	.catch(err =>{
		res.send(err)
	})
})

Router.get('/:id/delete',(req,res) => {
	let id = req.params.id
	Question.destroy({
		where : {id : id}
	})
	.then(value =>{
		res.redirect('/question')
	})
	.catch(err => {
		res.send(err)
	})
})

module.exports = Router