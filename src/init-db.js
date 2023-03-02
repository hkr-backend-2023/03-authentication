// Run this only when creating the database and the tables
const sqlite3 = require('sqlite3').verbose()

const file = 'sqlite-database'
const db = new sqlite3.Database(file)


let errors = 0

db.serialize(() => {
	db.run(`
	CREATE TABLE Users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL,
		password TEXT NOT NULL
	)`, {}, error => { errors++ })

	// seedData.forEach(movie => {
	// 	console.log('About to add the movie ' + movie.title)
	// 	db.run(
	// 		`INSERT INTO Movies (title, year) VALUES ($title, $year)`,
	// 		{ $title: movie.title, $year: movie.year },
	// 		error => { errors++ }
	// 	)
	// })
})

console.log(`Number of errors: ` + errors)
