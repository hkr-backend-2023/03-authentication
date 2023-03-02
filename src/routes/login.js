const express = require('express')
const router = express.Router()

const { userExists, validateLogin } = require('../database.js')


router.post('/', async (req, res) => {
	console.log('login.js: POST /')
	// Does user(name) exist?
	// Do passwords match?
	const { username, password } = req.body

	if( await validateLogin(username, password) ) {
		res.sendStatus(200)
	} else {
		res.sendStatus(401)
	}
})



module.exports = router
