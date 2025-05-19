// ==UserScript==
// @name         AtheraAutoLogin
// @namespace    http://tampermonkey.net/
// @version      2025-05-19
// @description  try to take over the world!
// @author       BigYass
// @match        https://auth.atera.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	console.log("AtheraAutoLogin starting")

	const retry_interval = 1000
	const max_try = 30
	let tries = 0

	const isClickAllowed = () => {
		const queries = [
			'input[name="username"]',
			'input[name="password"]',
			'input[name="auth"]',
		]

		for (const query of queries) {
			const input = document.querySelector(query) 
			console.log('input = ' + input)

			if(input && input.name && input.name === 'auth') return query // If auth, then we do not click in any case

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
		tries += 1
		console.log("loop, tries = " + tries)

		const button = getButton()

		if (button) {
			console.log(button + "found!")

			const empty_input = isClickAllowed() 

			if(!empty_input){
				button.click()
			} else {
				console.log(empty_input + " empty!")
			}
		}else if (tries < max_try){
			console.log('Button not found...')
			setTimeout(loop, retry_interval)
		}
	}

	window.addEventListener('load', loop);
})();
