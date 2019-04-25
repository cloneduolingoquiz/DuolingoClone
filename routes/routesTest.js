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
					arrParse.push(arrQ[j][0])
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

Router.post("/", (req,res) => {
	Test.create({
		testData: 
	})
	let arrAnswer = []
	while(arrAnswer.length < arrId.length) {
		console.log(req.body.answer)
		arrAnswer.push(req.body.answer)	
	}
	console.log(arrAnswer)
	// Test.create({
	// 	userAnswer: req.body.answer,
	// })
})

module.exports = Router
