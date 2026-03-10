// ==UserScript==
// @name         ScreenConnect Tweaks
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  ScreenConnect Tweaks
// @author       BigYass
// @match        https://*.fr/Host
// @include      /^https://connect\.[^/]+\.fr\/Host$/
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZTE3NDRjIiBkPSJtMTIuMDUgMTlsMi44NS0yLjgyNWwtMi44NS0yLjgyNUwxMSAxNC40bDEuMDc1IDEuMDc1cS0uNy4wMjUtMS4zNjItLjIyNXQtMS4xODgtLjc3NXEtLjUtLjUtLjc2My0xLjE1dC0uMjYyLTEuM3EwLS40MjUuMTEzLS44NXQuMzEyLS44MjVsLTEuMS0xLjFxLS40MjUuNjI1LS42MjUgMS4zMjVUNyAxMnEwIC45NS4zNzUgMS44NzV0MS4xIDEuNjV0MS42MjUgMS4wODh0MS44NS4zODdsLS45NS45NXptNC4xMjUtNC4yNXEuNDI1LS42MjUuNjI1LTEuMzI1VDE3IDEycTAtLjk1LS4zNjMtMS44ODhUMTUuNTUgOC40NXQtMS42MzgtMS4wNzV0LTEuODYyLS4zNUwxMyA2LjA1TDExLjk1IDVMOS4xIDcuODI1bDIuODUgMi44MjVMMTMgOS42bC0xLjEtMS4xcS42NzUgMCAxLjM3NS4yNjN0MS4yLjc2MnQuNzYzIDEuMTV0LjI2MiAxLjNxMCAuNDI1LS4xMTIuODV0LS4zMTMuODI1ek0xMiAyMnEtMi4wNzUgMC0zLjktLjc4OHQtMy4xNzUtMi4xMzdUMi43ODggMTUuOVQyIDEydC43ODgtMy45dDIuMTM3LTMuMTc1VDguMSAyLjc4OFQxMiAydDMuOS43ODh0My4xNzUgMi4xMzdUMjEuMjEzIDguMVQyMiAxMnQtLjc4OCAzLjl0LTIuMTM3IDMuMTc1dC0zLjE3NSAyLjEzOFQxMiAyMiIvPjwvc3ZnPg==
// @grant        none
// @updateURL    https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_tweaks.user.js
// ==/UserScript==
!function(){"use strict";function e(e=document){const t=e.querySelector?.("#dialogContainer");t&&t.remove()}const t=setInterval(()=>{e(document),"loading"!==document.readyState&&clearInterval(t)},50),n=new MutationObserver(t=>{for(const n of t)for(const t of n.addedNodes)t&&1===t.nodeType&&("dialogContainer"!==t.id?e(t):t.remove())}),o=()=>n.observe(document.documentElement,{childList:!0,subtree:!0});document.documentElement?o():document.addEventListener("DOMContentLoaded",o,{once:!0})}();