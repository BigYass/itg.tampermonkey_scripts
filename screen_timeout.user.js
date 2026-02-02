// ==UserScript==
// @name         ScreenConnect Timeout
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Color old chat with red + rainbow for dev machine
// @author       BigYass
// @match        https://connect.itguard.fr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=itguard.fr
// @grant        none
// @updateURL    https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_timeout.user.js
// @downloadURL  https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_timeout.user.js
// ==/UserScript==
!function(){"use strict";const t=()=>{const t=document.querySelectorAll("div.Host");t&&0!==t.length&&t.forEach(t=>{const e=t.closest("tr");if(!e)return;const n=e.querySelector("h3.SessionTitle");if(!n)return;if("ITG-LAP-YBA (Yassine)"===(n.textContent||"").trim())return void n.classList.add("rainbow-text");const o=t.querySelector("p.Description");if(!o)return;const r=(o.textContent||"").split(/[-)]/),s=(t=>{const e=String(t||"").match(/^\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*$/i);if(!e)return NaN;const n=e[1]?parseInt(e[1],10):0,o=e[2]?parseInt(e[2],10):0;return e[1]||e[2]?60*n+o:NaN})((r.length>0?r[r.length-1]:"").trim());var l;Number.isNaN(s)||(s>30?(l=n)&&"red"!==l.style.color&&(l.style.color="red"):(t=>{t&&t.style.color&&t.style.removeProperty("color")})(n))})},e=()=>{t(),window.setTimeout(e,1e3)};let n=null;const o=new MutationObserver(()=>{n||(n=window.setTimeout(()=>{n=null,t()},150))}),r=()=>{(()=>{if(document.getElementById("itg-rainbow-style"))return;const t=document.createElement("style");t.id="itg-rainbow-style",t.textContent="\n      .rainbow-text {\n        animation: colorFloat 2s linear infinite;\n        will-change: color;\n      }\n\n      @keyframes colorFloat {\n        0%   { color: hsla(0, 94%, 74%, 1.00); }\n        25%  { color: hsla(90, 87%, 73%, 1.00); }\n        50%  { color: hsla(180, 97%, 85%, 1.00); }\n        75%  { color: hsla(270, 100%, 79%, 1.00); }\n        100% { color: hsla(0, 94%, 74%, 1.00); }\n      }\n    ",document.head.appendChild(t)})(),t(),o.observe(document.body,{childList:!0,subtree:!0,attributes:!0}),e()};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r,{once:!0}):r()}();