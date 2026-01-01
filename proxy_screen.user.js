// ==UserScript==
// @name         Screen Proxy
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Un proxy pour ConnectWise
// @author       BigYass
// @match        https://connect.itguard.fr/*
// @icon         https://connect.itguard.fr/FavIcon.axd
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// ==/UserScript==
!function(){"use strict";const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send,o="__itguard_block_eventtype3_enabled";let n="0"!==(localStorage.getItem(o)??"1");XMLHttpRequest.prototype.open=function(e,o){return this.__tm_url=o,this.__tm_method=e,t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return n&&"https://connect.itguard.fr/Services/PageService.ashx/AddSessionEvents"===this.__tm_url&&t.length>1&&/"EventType"\s*:\s*3/.test(t)?(console.log(this.__tm_url+" blocked"),void this.abort()):e.apply(this,arguments)};let s=null;function l(t){t.textContent=n?"Block: ON":"Block: OFF",t.style.background=n?"#67f86cff":"#d2d2d2c1"}function r(){if(document.getElementById("itguard-toggle-block-btn"))return;const t=document.createElement("button");t.id="itguard-toggle-block-btn",t.type="button",function(t){t.style.position="fixed",t.style.right="12px",t.style.top="12px",t.style.zIndex="999999",t.style.padding="8px 10px",t.style.borderRadius="8px",t.style.border="1px solid #999",t.style.font="12px/1.2 Arial, sans-serif",t.style.cursor="pointer",t.style.boxShadow="0 2px 8px rgba(0,0,0,.15)",t.style.userSelect="none",t.style.opacity="1",t.style.transition="opacity 0.3s ease, transform 0.15s ease"}(t),l(t),t.addEventListener("mouseenter",()=>{t.style.opacity="1",t.style.transform="scale(1.03)",clearTimeout(s)}),t.addEventListener("mouseleave",()=>{t.style.transform="scale(1)",function(t){clearTimeout(s),s=setTimeout(()=>{t.style.opacity="0"},2e3)}(t)}),t.addEventListener("click",()=>{n=!n,localStorage.setItem(o,n?"1":"0"),l(t)}),document.documentElement.appendChild(t)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r,{once:!0}):r()}();