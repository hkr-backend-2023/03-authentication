const inputUsername = document.querySelector('#inputUsername')
const inputPassword = document.querySelector('#inputPassword')
const btnRegister = document.querySelector('#btnRegister')
const btnLogin = document.querySelector('#btnLogin')
const btnSecret = document.querySelector('#btnSecret')

// Used with localStorage
const key = '03-authentication-jwt'


btnRegister.addEventListener('click', async () => {
	const packet = {
		username: inputUsername.value,
		password: inputPassword.value
	}
	
	const url = '/register'
	const options = {
		method: 'POST',
		body: JSON.stringify(packet),
		headers: {
			"Content-Type": "application/json"
		}
	}
	console.log('About to send packet: ', options)
	const response = await fetch(url, options)

	// Remember to show feedback to the user

	console.log('POST /register status=' + response.status)
})

btnLogin.addEventListener('click', async () => {
	const packet = {
		username: inputUsername.value,
		password: inputPassword.value
	}

	const url = '/login'
	const options = {
		method: 'POST',
		body: JSON.stringify(packet),
		headers: {
			"Content-Type": "application/json"
		}
	}

	console.log('About to send packet: ', options)
	const response = await fetch(url, options)

	if( response.status !== 200 ) {
		return
	}

	// If backend sends the token inside an object, we use response.json instead
	const token = await response.text()
	console.log('Login success. token=', token)

	// Save the token, so we can reuse it in future requests
	localStorage.setItem(key, token)
})


btnSecret.addEventListener('click', async () => {
	// Attempt to get some secret data

	const token = localStorage.getItem(key)
	const url = '/secret'
	const options = {
		headers: {
			"authorization": "Bearer " + token
		}
	}
	const response = await fetch(url, options)
	if( response.status !== 200 ) {
		return
	}

	const data = await response.json()

	// In a real app: display feedback to the users. Either the data requested, or an error message.
	console.log('The secret data we got: ', data)
})