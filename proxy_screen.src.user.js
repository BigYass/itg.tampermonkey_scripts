// ==UserScript==
// @name         Screen Proxy
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Un proxy pour ConnectWise
// @author       BigYass
// @match        https://connect.itguard.fr/*
// @icon         https://connect.itguard.fr/FavIcon.axd
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// ==/UserScript==

(function() {
  'use strict';

  const _open = XMLHttpRequest.prototype.open
  const _send = XMLHttpRequest.prototype.send

  const STORAGE_KEY = "__itguard_block_eventtype3_enabled";

  let enabled = (localStorage.getItem(STORAGE_KEY) ?? "1") !== "0";

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__tm_url = url;
    this.__tm_method = method;

    return _open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    if (enabled && this.__tm_url === "https://connect.itguard.fr/Services/PageService.ashx/AddSessionEvents"){
      if (body.length > 1 && /"EventType"\s*:\s*3/.test(body)){
        console.log(this.__tm_url + " blocked")
        this.abort()
        return
      }
    }

    return _send.apply(this, arguments);
  }
  
  function setBtnStyle(btn) {
    btn.style.position = "fixed";
    btn.style.right = "12px";
    btn.style.top = "12px";
    btn.style.zIndex = "999999";
    btn.style.padding = "8px 10px";
    btn.style.borderRadius = "8px";
    btn.style.border = "1px solid #999";
    btn.style.font = "12px/1.2 Arial, sans-serif";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 8px rgba(0,0,0,.15)";
    btn.style.userSelect = "none";

    btn.style.opacity = "1";
    btn.style.transition = "opacity 0.3s ease, transform 0.15s ease";
  }

  let fadeTimeout = null;

  function scheduleFade(btn) {
    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(() => {
      btn.style.opacity = "0";
    }, 2000);
  }

  function updateBtn(btn) {
    btn.textContent = enabled ? "Block: ON" : "Block: OFF";
    btn.style.background = enabled ? "#67f86cff" : "#d2d2d2c1";
  }

  function injectButton() {
    if (document.getElementById("itguard-toggle-block-btn")) return;

    const btn = document.createElement("button");
    btn.id = "itguard-toggle-block-btn";
    btn.type = "button";
    setBtnStyle(btn);
    updateBtn(btn);

    btn.addEventListener("mouseenter", () => {
      btn.style.opacity = "1";
      btn.style.transform = "scale(1.03)";
      clearTimeout(fadeTimeout);
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
      scheduleFade(btn);
    });

    btn.addEventListener("click", () => {
      enabled = !enabled;
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      updateBtn(btn);
    });

    document.documentElement.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectButton, { once: true });
  } else {
    injectButton();
  }
})();
