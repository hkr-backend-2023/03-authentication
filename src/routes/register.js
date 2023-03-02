const express = require('express')
const router = express.Router()

const { userExists, registerUser } = require('../database.js')


// Step 1: fake database
// Step 2: add real database
let fakeIdCounter = 1

router.post('/', async (req, res) => {
	console.log('register.js: POST /')
	// Is username available?
	// Is password secure ?
	const { username, password } =  req.body
	// const username = req.body.username

	if( await userExists(username) ) {
		// Usernames match, username not available
		console.log('Username not available')
		res.sendStatus(400)
		return
	}

	if( !isValidPassword(password) ) {
		console.log('Too easy password')
		res.sendStatus(400)
		return
	}

	await registerUser(username, password)
	res.sendStatus(200)
	// It's also possible to send a file or render a view
})

function isValidPassword(pw) {
	// What makes a password too simple?
	// You decide, but good security practices exist
	// Examples: minimum 8 characters; mix of capital+small letters, numbers and special characters
	return pw.length >= 8
}


module.exports = router
