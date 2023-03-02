const express = require('express')
const router = express.Router()

const { createToken } = require('../authentication.js')
const { userExists, validateLogin } = require('../database.js')



router.post('/', async (req, res) => {
	console.log('login.js: POST /')
	// Does user(name) exist?
	// Do passwords match?
	const { username, password } = req.body

	if( await validateLogin(username, password) ) {
		let token = createToken({ username })
		res.status(200).send(token)
	} else {
		res.sendStatus(401)
	}
})

// In the lab, you should be able to write: (for a failed login)
// res.status(401).render('fail.ejs')



module.exports = router
