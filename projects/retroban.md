---
layout: project
title: karmaṭha | project Retroban <img src="https://spassvogel.github.io/retroban/img/crate.png" class="retroban-icon">
images: 
---

<script>
  window.addEventListener("message", (event) => {
    if (!event.data.levelCount) {
      return
    }
    $('.retroban-level-count').html(event.data.levelCount);
  });
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
  <div>
    <iframe src="https://spassvogel.github.io/retroban/?theme=karmatha" id="retroban" class="retroban iframe"></iframe>
    <!-- <iframe src="http://localhost:5173/retroban/?theme=karmatha" id="retroban" class="retroban iframe"></iframe> -->
  </div>
</section>

