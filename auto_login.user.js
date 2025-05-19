// ==UserScript==
// @name         Athera
// @namespace    http://tampermonkey.net/
// @version      2025-05-19
// @description  try to take over the world!
// @author       BigYass
// @match        https://auth.atera.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const retry_interval = 1000
	const max_try = 30 * retry_interval
	let tries = 0


	const getButton = () => {
		const queries = [
			'button[value="pick-authenticator"]',
			'button[value="otp::0"]',
		]

		queries.forEach(query => {
			const button = document.querySelector(query)

			return button
		});

		return null
	}

	const loop = () => {
		tries += 1

		const button = getButton()

		if (button) {
			button.click()
		}else if (tries < max_try){
			setInterval(loop, retry_interval)
		}
	}

	window.addEventListener('DOMContentLoaded', loop);
})();
