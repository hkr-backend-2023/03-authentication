const express = require('express')
const router = express.Router()



router.post('/', (req, res) => {
	console.log('register.js: POST /')
	res.sendStatus(400)
})


module.exports = router
