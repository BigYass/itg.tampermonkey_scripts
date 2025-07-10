// ==UserScript==
// @name         AteraAutoLogin
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  Au login on Atera
// @author       BigYass
// @match        https://auth.atera.com/* 
// @match        https://app.atera.com/newlogin/errorpage?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	console.log("AteraAutoLogin starting")

	const retry_interval = 200
	const max_try = 120

	const timeout = 0

	let tries = 0

	/**
	 * 
	 * @param {HTMLAllCollection} button The button that we want to click 
	 * @returns {boolean} if we click the button or not given the situation of the page and what button we want to click
	 */
	const isClickAllowed = (button) => {
		const queries = [
			'input[name="username"]',
			'input[name="password"]',
			'input[name="code"]',
		]

		for (const query of queries) {
			const input = document.querySelector(query) 
			console.log('input = ' + input)

			if(input && input.name && input.name === 'code') return true // If auth, then we do not click in any case

			if(input && !input.value.trim()){
				console.log(query + " empty!")
				return true
			} else {
				console.log(query + " not empty (or not found)")
			}
		}

		return false
	}

	/**
	 * 
	 * @returns Find the first button that qualify as a button that we have to click
	 */
	const getButton = () => {
		const queries = [
			'button[value="pick-authenticator"]',
			'button[value="otp::0"]',
			'button[value="default"]',
			'a.link[_ngcontent-ng-c1690244427=""]' // <a _ngcontent-ng-c1690244427="" class="link">Back to login</a>
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

			if(!isClickAllowed(button)){
				button.click()
				again = false
			} 
		} else {
			console.log('Button not found...')
		}

		if (again && tries < max_try) setTimeout(loop, retry_interval)
	}

	// window.addEventListener('DOMContentLoaded', loop);

	loop()
})();
