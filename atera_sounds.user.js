// ==UserScript==
// @name         AteraSounds
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Change Atera Alerts Sounds to customs one
// @author       BigYass
// @match        https://app.atera.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/atera_sounds.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/atera_sounds.user.js
// ==/UserScript==
!function(){"use strict";const o={"bike.mp3":null,"door.mp3":"none","horn.mp3":null,"houston.mp3":"https://github.com/BigYass/ressources/raw/refs/heads/main/ding.mp3","siren.mp3":null},e=HTMLAudioElement.prototype.play;HTMLAudioElement.prototype.play=function(...s){console.log("▶️ Interception d’un .play()");try{if(this.src){console.log("src = ",this.src);for(const[e,s]of Object.entries(o))if(this.src.endsWith(e)&&s){if("none"===s)return Promise.resolve();this.src=s,this.load(),console.log("new src =",this.src)}}}catch(o){console.log("erreur : ",o)}return e.apply(this,s)},console.log("✅ Script de remplacement de sons chargé.")}();