const Router = require("express").Router()
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question
const Score = require('../models').Score
const dynamicSort = require('../helpers/dynamicSort')


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
		res.redirect("/")
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
			if(value.id === 5){
			req.session.UserId = value.id
			req.session.isLogin = true
			res.redirect('/admin')
			}else{
			req.session.UserId = value.id
			req.session.isLogin = true
			// console.log( req.session.UserId)
			// let ok = req.session
			// console.log(ok);
			// console.log(req.session.id, '------');
			// console.log(value.dataValues.id,'++++++++');
			res.redirect('/')
			}
		}else{
			res.redirect('/home')
		}
	})
	.catch(err =>{
		console.log(err);
		
		res.send(err)
	})
})

Router.get('/score',function(req,res){
	let id = req.session.UserId
	User.findByPk(id,{
		include : {
			model : Test,
			include : {
				model : Question
			}
		},hooks:false
	})
	.then(value => {
		// res.send(value)
		// console.log(value.dataValues[0].Tests)
		// console.log(value.dataValues.Tests);
		let totalSoal = 10
		let data = value.dataValues.Tests
		let score = 0
		for(let i = data.length-1 ; i > data.length - (totalSoal+1) ; i--){
			// console.log(data[i].dataValues.countTrue);
			score += data[i].dataValues.countTrue
		}
		return score = Math.round((score * 100)/totalSoal)
		// console.log(score);
		})
	.then(value =>{
		let scorePlay = value
		Score.create({
			UserId : req.session.UserId,
			score : value
		})
		.then(value =>{
			res.render('score.ejs',{
				dataScore : scorePlay
			})
		})
		.catch(err =>{
			res.send(err)
		})
	})
	.catch(err =>{
		console.log(err)
		res.send(err)
	})
})

Router.get('/leaderboard',function(req,res){
	let arrUser = []
	Score.findAll({hooks:false,
		include : {
			model: User
		}
	})
	.then(value =>{
		// console.log(value[0].score,value[0].dataValues.User.name);
		// res.send(value)
		
		let arrObj = []
		// for(i = 0 ; i < 11 ; i++){
		// 	arrObj.push({
		// 		name: value[i].dataValues.User.name,
		// 		score: value[i].score
		// 	})
		// }
		// console.log(arrObj);
		
		value.forEach(value => {
			// console.log(user.Scores.length);
			arrObj.push({
				name: value.dataValues.User.name,
				score: value.score
			})
		});


		arrObj.sort(dynamicSort('score'))

		// let sorted = score.sort(function(a,b){return b-a})
		// console.log(arrObj);

		
	console.log(req.session.id,'====');
		res.render('leaderboard.ejs',{
			UserId  : req.session.UserId, 
			objData : arrObj,
			loginStat: req.session.isLogin
		})
	})
	.catch(err =>{
		res.send(err)
	})

})

Router.get('/logout',function(req,res){
	req.session.destroy(function(err){
		res.send(err)
	})
	res.redirect('/home')
})

// User.findAll({
// 	include : {
// 		model : Test
// 	},hooks : false
// })
// .then(value => {
// 	// res.send(value)
// 	console.log(value)
// })
// .catch(err =>{
// 	console.log(err)
// 	res.send(err)
// })

module.exports = Router