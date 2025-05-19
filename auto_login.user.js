// ==UserScript==
// @name         AteraAutoLogin
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       BigYass
// @match        https://auth.atera.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	console.log("AtheraAutoLogin starting")

	const retry_interval = 200
	const max_try = 120

	const timeout = 0

	let tries = 0

	const isClickAllowed = () => {
		const queries = [
			'input[name="username"]',
			'input[name="password"]',
			'input[name="code"]',
		]

		for (const query of queries) {
			const input = document.querySelector(query) 
			console.log('input = ' + input)

			if(input && input.name && input.name === 'code') return query // If auth, then we do not click in any case

			if(input && !input.value.trim()){
				console.log(query + " empty!")
				return query
			} else {
				console.log(query + " not empty (or not found)")
			}
		}

		return false
	}


	const getButton = () => {
		const queries = [
			'button[value="pick-authenticator"]',
			'button[value="otp::0"]',
			'button[value="default"]', 
		]

		for (const query of queries) {
			const button = document.querySelector(query)
			if(button){
				return button
			}
		};

		return null
	}

	const loop = () => {
		let again = true

		tries += 1
		console.log("loop, tries = " + tries)

		const button = getButton()

		if (button) {
			console.log(button + "found!")

			const empty_input = isClickAllowed() 

			if(!empty_input){
				button.click()
				again = false
			} else {
				console.log(empty_input + " empty!")
			}
		} else {
			console.log('Button not found...')
		}

		if (again && tries < max_try) setTimeout(loop, retry_interval)
	}

	// window.addEventListener('DOMContentLoaded', loop);

	loop()
})();
