const Question = require("../models").Question
function randomNum() {
	let number = Math.floor(Math.random()*4+8)
	return number
}

module.exports = randomNum