const jwt = require('jsonwebtoken')


// In a realistic app, the secret would be stored as en ENVIRONMENT VARIABLE
// Use the package "dotenv" to load an ".env" file
const secret = '81340d44466da2782c775178bc3b2d50ca433831d57e0ff7a25d1e85eb8e4a0a629a0ea4d14b5176d8ea4529368fec8d865dfcad0dd0afbf68a161b14a048549'
// require('crypto').randomBytes(64).toString('hex')
// crypto.randomBytes(64).toString('hex')  <- in browser or Node console

function createToken(payload) {
	let token = jwt.sign(payload, secret)
	return token
}

function authenticatedUserInfo(req) {
	// The next evolution of this functionality:
	// - create a middleware function, that saves the decoded information in the request object

	// Auth header: "Bearer token....."
	let authHeader = req.headers['authorization']
	if (!authHeader) {
		return null
	}

	let token = authHeader.substring(7)
	// Alternative: token = authHeader.split(' ')[1]

	try {
		let decoded = jwt.verify(token, secret)
		console.log('Decoded token: ', decoded)
		return decoded

	} catch(error) {
		console.log('Decoding JWT failed: ' + error.message)
		return null
	}
}


module.exports = { createToken, authenticatedUserInfo }
