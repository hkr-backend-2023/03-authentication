// Imports
const express = require('express')
const registerRoute = require('./routes/register.js')
const loginRoute = require('./routes/login.js')



// Setup
const port = 2345
const app = express()



// Middleware
app.use( express.json() )
app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	next()
} )



// Routes
// POST /register
app.use('/register', registerRoute)

// POST /login
app.use('/login', loginRoute)



// Start the server
app.listen(port, () => {
	console.log(`Server is listening on ${port}...`)
})
