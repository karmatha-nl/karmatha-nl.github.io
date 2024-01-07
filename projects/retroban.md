---
layout: project
title: karmaṭha | project Retroban
# images: 
project-name: retroban
retroban-url: https://spassvogel.github.io/retroban/
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
    if (iFrameEl.requestFullscreen || iFrameEl.msRequestFullscreen || iFrameEl.mozRequestFullScreen || iFrameEl.webkitRequestFullScreen) {
      
      const icon = $('.retroban-supportsfullscreen-icon');
      icon.show();
      icon.on('click', () => {
        
        // take away the theme url param
        iFrameEl.src = '{{ page.retroban-url }}';
        if (iFrameEl.requestFullscreen) {
          fullscreen = true
          iFrameEl.requestFullscreen();
        } else if (iFrameEl.msRequestFullscreen) {
          fullscreen = true
          iFrameEl.msRequestFullscreen();
        } else if (iFrameEl.mozRequestFullScreen) {
          fullscreen = true
          iFrameEl.mozRequestFullScreen();
        } else if (iFrameEl.webkitRequestFullScreen) {
          fullscreen = true
          iFrameEl.webkitRequestFullScreen();
        }
      })
    } else {
      document.href = "{{ page.retroban-url }}";
    }   

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
    <svg height="14px" class="retroban-supportsfullscreen-icon" title="Go fullscreen" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="white" transform="translate(-215.000000, -257.000000)"><g id="fullscreen" transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" id="Shape"/></g></g></g></svg>

    <iframe src="{{ page.retroban-url }}?theme=karmatha" id="retroban" class="retroban iframe"></iframe>

    <!-- <iframe src="http://localhost:5173/retroban/?theme=karmatha" id="retroban" class="retroban iframe"></iframe> -->
  </div>
</section>

