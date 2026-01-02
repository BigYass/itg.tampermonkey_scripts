// ==UserScript==
// @name         AteraAutoLogin
// @namespace    http://tampermonkey.net/
// @version      1.0.10
// @description  Au login on Atera
// @author       BigYass
// @match        https://auth.atera.com/* 
// @match        https://app.atera.com/newlogin/errorpage?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/auto_login.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/auto_login.user.js
// @grant        none
// ==/UserScript==
!function(){"use strict";console.log("AteraAutoLogin starting");let o=0;const n=()=>{let t=!0;o+=1,console.log("loop, tries = "+o);const e=(()=>{const o=['button[value="pick-authenticator"]','button[value="otp::0"]','button[value="default"]','a.link[_ngcontent-ng-c1690244427=""]','a.link[_ngcontent-ng-c218642649=""]'];for(const n of o){const o=document.querySelector(n);if(o)return o}return null})();e?(console.log(e+"found!"),(()=>{const o=['input[name="username"]','input[name="password"]','input[name="code"]'];for(const n of o){const o=document.querySelector(n);if(console.log("input = "+o),o&&o.name&&"code"===o.name)return!0;if(o&&!o.value.trim())return console.log(n+" empty!"),!0;console.log(n+" not empty (or not found)")}return!1})()||(e.click(),t=!1)):console.log("Button not found..."),t&&o<120&&setTimeout(n,200)};n()}();