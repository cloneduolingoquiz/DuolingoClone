const Router = require("express").Router()
const sequelize = require('sequelize')
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question
const randomNum = require("../helpers/randomNumQ.js")

Router.get('/',(req,res) =>{
	let arrId = []
	while(arrId.length < 3){
		let flag = false
		let num = randomNum()
		for( let i = 0 ; i < arrId.length ; i++){
			if(arrId[i] === num){
				flag = true
			}
		}
		if(!flag){
			arrId.push(num)
		}
	}
	
	let arrQ = []
	Question.findAll()
	.then(value =>{
		let arrParse = []
		for(let i = 0 ; i < value.length ; i++){
			arrQ.push([value[i].question,value[i].id])
		}
		let arrIdSorted = arrId.sort(function(a, b){return a-b})
		// console.log(arrIdSorted)
		// console.log(arrQ)
		for(let i = 0 ; i < arrId.length ; i++){
			for (var j = 0; j < arrQ.length; j++) {
				if(arrId[i] === arrQ[j][1]) {
					arrParse.push(arrQ[j])
				}
			}
		}
		res.render("test.ejs",{
			questionData: arrParse
		})
		// console.log(arrParse)
	})
	.catch(err =>{
		res.send(err)
	})
})


Router.post('/',(req,res) =>{
	let questionName = req.body.que
	let answer = req.body.answer
	// console.log(req.session.UserId, 'SADSADASDASDA')
	let obj = []
	questionName.forEach(ques => {
		obj.push(
			Question.findOne({where: {question: ques}})
		)
	})
	console.log(obj)
	Promise.all(obj)
		.then(found => {
			
			let ids =found.map(test => {
				return [test.id,test.answer]
			})
			// console.log(ids)
			return ids
		})
		.then(value => {
			let ids = value
			console.log(ids)
			let creating = []
			ids.forEach((cre,index) => {
				// console.log(cre)
				let flag = 0
				if(cre[1] === answer[index]){
					flag = 1
					creating.push(
						Test.create({
							UserId: req.session.UserId,
							QuestionId: cre[0],
							userAnswer: answer[index],
							countTrue: flag
						})
					)	
				}else{
					creating.push(
						Test.create({
							UserId: req.session.UserId,
							QuestionId: cre[0],
							userAnswer: answer[index],
							countTrue: flag
						})
					)
				}
				
			})
			console.log(creating)
			Promise.all(creating)
				.then(value => {
					res.redirect('/')
				})
				.catch(err =>{
					res.send(err)
				})
		})
	// for (var i = 0; i < questionName.length; i++) {
	// 	Question.findOne({where : {
	// 		question: questionName[i]
	// 	}
	// 	})
	// 	.then(value => {
	// 		obj.push(value)
	// 	// 	let flag = 0
	// 	// 	if(value.answer === answer[i]){
	// 	// 		flag = 1
	// 	// 	}
	// 	// 	console.log(req.session.UserId, req.body.answer[i])
	// 	// 	Test.create({
	// 	// 		UserId: req.session.UserId,
	// 	// 		QuestionId: value.id,
	// 	// 		userAnswer: req.body.answer[i],
	// 	// 		countTrue: flag
	// 	// 	})
	// 	// 	.then(value => {
	// 	// 		res.redirect('/')
	// 	// 	})
	// 	// 	.catch(err => {
	// 	// 		res.send(err)
	// 	// 	})
	// 	})
	// 	.catch(err =>{
	// 		res.send(err)
	// 	})
	
})



module.exports = Router
