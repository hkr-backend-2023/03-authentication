const express = require('express')
const router = express.Router()
const { authenticatedUserInfo } = require('../authentication.js')


router.get('/', (req, res) => {
	// check token
	let userInfo = authenticatedUserInfo(req)
	if( !userInfo ) {
		res.sendStatus(401)
		return
	}

	// We can use the information in the payload (userInfo.username or similar) to fetch information from the database

	res.send({
		data: 'Some very interesting, protected data!',
		username: userInfo.username
	})
})


module.exports = router
