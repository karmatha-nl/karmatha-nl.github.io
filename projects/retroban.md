---
layout: project
title: karmaṭha | project Retroban
# images: 
project-name: retroban
retroban-url: https://spassvogel.github.io/retroban/
# retroban-url: http://localhost:5173/retroban/
---

<script>
  window.addEventListener("message", (event) => {
    if (!event.data.levelCount) {
      return;
    }
    $('.retroban-level-count').html(event.data.levelCount);
  });

  $(() => {
    let fullscreen = false

    // go to fullscreen on click
    const iFrameEl = document.getElementById('retroban');
    const icon = $('.retroban-fullscreen-icon');
    icon.show();

    icon.on('click', () => {
      if (fullscreen) {
        document.body.classList.remove('body-noscroll')
        icon.removeClass('retroban-fullscreen-icon--active')
        iFrameEl.parentNode.classList.remove('pseudo-fullscreen')
        iFrameEl.contentWindow.postMessage({ fullscreen: false }, "{{ page.retroban-url }}")

        $('body').unbind('touchmove')
        fullscreen = false
        return
      }      

      fullscreen = true
      if (iFrameEl.requestFullscreen) {
        iFrameEl.src = '{{ page.retroban-url }}';         // take away the theme url param

        iFrameEl.requestFullscreen();
      } else if (iFrameEl.msRequestFullscreen) {
        iFrameEl.src = '{{ page.retroban-url }}';         // take away the theme url param

        iFrameEl.msRequestFullscreen();
      } else if (iFrameEl.mozRequestFullScreen) {
        iFrameEl.src = '{{ page.retroban-url }}';         // take away the theme url param

        iFrameEl.mozRequestFullScreen();
      } else if (iFrameEl.webkitRequestFullScreen) {
        iFrameEl.src = '{{ page.retroban-url }}';         // take away the theme url param

        iFrameEl.webkitRequestFullScreen();
      } else {
        document.body.classList.add('body-noscroll')
        icon.addClass('retroban-fullscreen-icon--active')

        iFrameEl.parentNode.classList.add('pseudo-fullscreen')
        iFrameEl.contentWindow.postMessage({ fullscreen: true }, "{{ page.retroban-url }}")

        $('body').bind('touchmove', (e) => {e.preventDefault()})
      }
    })

    $(window).on('resize', () => {
      if (!document.fullscreenElement && fullscreen) {
        // if coming back from fullscreen, put the theme param back
        iFrameEl.src = '{{ page.retroban-url }}?theme=karmatha';
        fullscreen = false;
      }

    });
  })

</script>
<section class="content-block" id="">
  <div class="multi-lang-block">
    <div lang="en">
      <p>
        As a kid I used to love playing the original <a href="https://en.wikipedia.org/wiki/Sokoban">Sokoban</a> game. 
        This box-pushing game provides interesting puzzles that require you to think
        spatially and ahead of time, even with deceptively simple rules.
      </p>
      <p>
        I created my own version using react and open source game assets, optimized for both mobile (using swiping gestures) and desktop. 
        I created a converter to import <span class='retroban-level-count'>200</span> mazes of varying difficulties (I haven't finished them all 😊). 
        The game has an undo and solve functionality, too. 
      </p>
      <p>
        Play my version, called retroban, below:
      </p>
    </div>
    <div lang="nl">
      <p>
        Als kind speelde ik graag het originele spel <a href="https://en.wikipedia.org/wiki/Sokoban">Sokoban</a>. 
        Dit spel waar je dozen door een warenhuis heen duwt biedt interessante puzzels waarbij je ruimtelijk moet nadenken
        en je zetten moet plannen, zelfs met bedrieglijk eenvoudige regels.
      </p>
      <p>
        Ik heb mijn eigen versie gemaakt met behulp van react- en open source-game-items, 
        geoptimaliseerd voor zowel mobiel (met veegbewegingen) als desktop. 
        Ik heb een converter gemaakt om <span class='retroban-level-count'>200</span> doolhoven met verschillende moeilijkheidsgraden te importeren (ik heb ze nog niet allemaal uitgespeeld 😊).
        De game heeft ook een functionaliteit voor ongedaan maken (undo) en oplossen (solve).
      </p>
      <p>
        Speel hieronder mijn versie, genaamd retroban:
      </p>
    </div>
  </div>
</section>
<section class="content-block">
  <div class="retroban-container">
    <div class="retroban-fullscreen-icon">
      <span class="retroban-fullscreen-text">close fullscreen</span>
      <svg height="14px" title="Go fullscreen" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="white" transform="translate(-215.000000, -257.000000)"><g transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z"/></g></g></g></svg>
    </div>

    <iframe src="{{ page.retroban-url }}?theme=karmatha" id="retroban" class="retroban iframe"></iframe>
  </div>
</section>

