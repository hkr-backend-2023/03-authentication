// Step 1: fake database
// Step 2: real database

const sqlite3 = require('sqlite3').verbose()

const file = 'sqlite-database'
const db = new sqlite3.Database(file)



async function userExists(username) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM Users WHERE username = $username `, { $username: username }, (error, rows) => {
			if( error ) reject(error)
			else resolve(rows.length > 0)
		})
	})
}


// Note: this function does not check if user exists or password is strong enough.
async function registerUser(username, password) {
	const sql = `INSERT INTO Users (username, password) VALUES ($username, $password)`
	const params = { $username: username, $password: password }

	return new Promise((resolve, reject) => {
		db.run(sql, params, (error) => {
			if( error ) reject(error)
			else resolve()
		})
	})
}

async function validateLogin(username, password) {
	const sql = 'SELECT * FROM Users WHERE username = $username AND password = $password '
	const params = { $username: username, $password: password }

	return new Promise((resolve, reject) => {
		db.all(sql, params, (error, rows) => {
			if( error ) reject(error)
			else resolve(rows.length === 1)
		})
	})
}


module.exports = { userExists, registerUser, validateLogin }
