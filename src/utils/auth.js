import { request } from "./api";

const baseUrl = "http://localhost:3001";


function signUpUser({ email, password, name, avatarUrl }) {
	return request(`${baseUrl}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, avatarUrl, email, password }) 
	})
}

function signInUser({ email, password }) {
	return request(`${baseUrl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password })
	})
}

function validateUser(token){
	return request(`${baseUrl}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		}
	})
}

export { signUpUser, signInUser, validateUser }
