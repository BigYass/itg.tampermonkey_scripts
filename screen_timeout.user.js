// ==UserScript==
// @name         ScreenConnect Timeout
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Color old chat with red 
// @author       BigYass
// @match        https://connect.itguard.fr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=itguard.fr
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_timeout.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/screen_timeout.user.js
// ==/UserScript==

(function() {
  'use strict';

  /**
   * Time before the chat is to be turned red
   */
  const timeout = 30

  const default_color = ''
  const new_color = 'red'

  let interval = 1000

  let time = 0

  /**
   * Parse une durée au format "[Nh][Mm]" (ex. "2h20m", "50m", "1h") et renvoie
   * le nombre total de minutes (int).
   * 
   * @param {string} str Durée au format "XhYm" (heures et minutes facultatives)
   * @return {number} Nombre total de minutes. Si le format n'est pas valide, renvoie NaN.
   */
  const parseDuration = (str) => {
    // Explication du regex :
    //  ^\s*            → début de chaîne, on accepte des espaces éventuels
    //  (?:(\d+)h)?     → groupe facultatif pour les heures, ex. "2h" (capture les chiffres avant "h")
    //  \s*             → éventuellement des espaces entre heures et minutes
    //  (?:(\d+)m)?     → groupe facultatif pour les minutes, ex. "20m" (capture les chiffres avant "m")
    //  \s*$            → fin de chaîne, on accepte des espaces éventuels
    const regex = /^\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*$/i;

    const match = str.match(regex);
    if (!match) {
      // Le format n'est pas valide
      return NaN;
    }

    // match[1] = valeur des heures ("\d+" avant "h"), ou undefined
    // match[2] = valeur des minutes ("\d+" avant "m"), ou undefined
    const heuresPart = match[1] ? parseInt(match[1], 10) : 0;
    const minutesPart = match[2] ? parseInt(match[2], 10) : 0;

    return heuresPart * 60 + minutesPart;
  }

  /**
   * Check every chat and color them if needed
   */
  const check = () => {
    const hosts = document.querySelectorAll('div.Host.Connected')

    hosts.forEach(host => {
      const desc = host.querySelector('p.Description')
      if (desc) {
        const text_array = desc.textContent.split(/[-)]/)

        let text = ''

        if (text_array.length > 1) {
          text = text_array[text_array.length - 1].trim()
        } else if (text_array.length > 0) {
          text = text_array[0].trim()
        }

        const time = parseDuration(text)

        const chat = host.closest('tr')

        const title = chat.querySelector('h3.SessionTitle')

        if (title) {
          if (time > timeout && title.style.color != new_color) {
            console.log(title.textContent.trim(), "turned red")
            title.style.color = new_color
          } else if (time <= timeout && title.style.color != default_color) {
            console.log(title.textContent.trim(), "turned to default")
            title.style.color = default_color
          }
        }
        else {
          console.log('Non trouver :', desc.textContent.trim())
        }

      }
    })


  }

  const loop = () => {
    time += interval

    check()

    setTimeout(loop, interval)
  }

  const onDomChanged = (mutationsList, observer) => {
    check()
  }

  const observer = new MutationObserver(onDomChanged);

  observer.observe(document.body, {
    childList: true,         // Ajout/suppression d’enfants
    subtree: true,           // Sur tout le DOM (pas juste le body direct)
    attributes: true         // Suivre les changements d’attributs (optionnel)
  })

  setTimeout(loop, interval)


})();
