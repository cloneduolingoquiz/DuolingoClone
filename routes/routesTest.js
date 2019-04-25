const Router = require("express").Router()
const User = require("../models").User
const Test = require("../models").Test
const Question = require("../models").Question

Router.get("/", (req, res) => {
	// Subject.findAll({
	// 	include: [{
	// 		model: Teacher
	// 	}]
	// })
	// .then((db) => {
	// 	res.render("subject.ejs", {
	// 		dataSubject: db
	// 	})
	// })
 //  	.catch((err) => {
 //  		res.sender(err)
 //  	})
})

module.exports = Router