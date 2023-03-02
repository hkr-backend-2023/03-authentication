// Imports
const express = require('express')
const registerRoute = require('./routes/register.js')
const loginRoute = require('./routes/login.js')
const secretApiRoute = require('./routes/secret.js')



// Setup
const port = 2345
const app = express()
const staticPath = 'src/static'


// Middleware
app.use( express.json() )
app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url}  `, req.body)
	next()
} )
app.use( express.static(staticPath) )



// Routes
// POST /register
app.use('/register', registerRoute)

// POST /login
app.use('/login', loginRoute)

app.use('/secret', secretApiRoute)


// Start the server
app.listen(port, () => {
	console.log(`Server is listening on ${port}...`)
})
