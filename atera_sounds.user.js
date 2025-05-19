// ==UserScript==
// @name         AteraSounds
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Change Atera Alerts Sounds to customs one
// @author       BigYass
// @match        https://app.atera.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // 1) Déclare un objet de mappage : url/original → url/ton-sound
  const soundReplacements = {
    'bike.mp3': null,
    'door.mp3': null,
    'horn.mp3': null,
    'houston.mp3': null,
    'siren.mp3': null,
  };

  // 2) Sauvegarde la méthode play originale
  const _origPlay = HTMLAudioElement.prototype.play;

  // 3) Remplace play() pour réécrire this.src si on a une correspondance
  HTMLAudioElement.prototype.play = function(...args) {
    const sound = this.src.split('/')[-1]

    if (this.src && soundReplacements[sound]) {
      console.log(`Remplacement son : ${this.src} → ${soundReplacements[sou8nd]}`);
      this.src = soundReplacements[sound];
    }
    return _origPlay.apply(this, args);
  };

  // 4) Optionnel : intercepter aussi les new Audio(src) directs
  const _OrigAudio = window.Audio;
  window.Audio = function(src) {
    let audio = new _OrigAudio(src);
    // Si on veut aussi remplacer au moment de la création
    if (src && soundReplacements[src]) {
      console.log(`🔧 Remplacement Audio() constructeur : ${src} → ${soundReplacements[src]}`);
      audio.src = soundReplacements[src];
    }
    return audio;
  };
  window.Audio.prototype = _OrigAudio.prototype;

  console.log('✅ Script de remplacement de sons chargé.');

})();