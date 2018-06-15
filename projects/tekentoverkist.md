---
layout: project
title: karmaṭha | project tekentoverkist
images: 
- '../../css/images/projects/2018_tekentoverkist/klaslokaal.jpg'
- '../../css/images/projects/2018_tekentoverkist/tekentoverkist_unity.png'
- '../../css/images/projects/2018_tekentoverkist/tekentoverkist_unity2.png'
---
<section class="content-block multi-lang-block">
    <div lang="en">
        <p>
            What if your drawings could come to life? With tekentoverkist (magic drawing box) you can unleash your creativity upon a colouring picture of one of ten possible farm animals. Then place the colouring picture in the box and, like magic, the animal you created appears on screen, in the farm and will roam around, eat, sleep and more!
        </p>
        <p>
            Tekentoverkist is a project, aimed at young children. They are given a colouring picture of a farm animal (alpaca, cat, chicken, cow, dog, duck, goat, horse, pig, rabbit or sheep). After finishing colouring it they will place it in a specially designed box. The box has a camera and will scan the colouring picture. Reading the AR marker on the drawing, a Unity application will spawn a 3D model of the animal that was coloured, and apply the drawing as a texture on the model. After a short animation, the animal will start to exhibit certain behaviour, like foraging for food, resting, idling etc. When more than 10 animals have been created, the oldest one will leave the farm.
        </p>
        <p>
            The scanning was realized through OpenCV. I was responsible for creating the farm 3D world, ensuring the right model was spawned upon scanning and the behaviour of the animals. To that end I created a comprehensive animal behaviour script that could be applied to a Unity object. Within it the characteristics of each animal type can be defined: some animals are jittery, always on the move. Some animals are lazy and sleep for a long while, while other animals have shorter but more frequent sleep cycles, etc etc. The likelihood and duration of each action (including random variation) can be tweaked using GUI tools. These tools also provide useful debugging options.
        </p>
        <p>       
            Although this was a relatively small project, I was really enthusiastic to work with an original idea that really fuses the physical and digital worlds and is a great way to stimulate creativity in children.
        </p>
        <p>
            Technologies: Unity3D
            <br>
            Project URL: <a href="http://www.tekentoverkist.nl">http://www.tekentoverkist.nl</a>
        </p>
    </div>
    <div lang="nl">
        <p>
            Wat als jouw tekeningen tot leven gewekt konden worden? Met tekentoverkist kun je je creativiteit loslaten op een kleurplaat met een boerderijdier. Plaats dan de kleurplaat in de kist en zie dan het dier wat jij gekleurd hebt op het scherm rondlopen, eten, slapen en meer!
        </p>
        <p>
            Tekentoverkist is een project voor jonge kinderen. Zij krijgen een kleurplaat met een boerderijdier erop (alpaca, kat, kip, koe, hond, eend, geit, varken, konijn of schaap). Nadat ze het gekleurd hebben plaatsen ze het in een speciaal ontworpen kist. De kist heeft een camera en zal de kleurplaat scannen. Met behulp van een AR marker op de kleurplaat zal een Unity applicatie een 3D model van het dier wat gekleurd is in de wereld plaatsen, met de kleurplaat als textuur. Na een korte animatie zal het dier bepaald gedrag vertonen, zoals zoeken naar eten, uitrusten of slapen. Wanneer er meer dan 10 dieren zijn zal de oudste de boerderij verlaten.
        </p>
        <p>
            Het scannen is verwezelijkt door middel van OpenCV. Ik was verantwoordelijk voor het creeren van de boerderij 3D wereld, het juiste dier op de wereld zetten wanneer er een tekening gescand is en het gedrag van de dieren. Daarvoor creerde ik een uitgebreid dierengedrag script dat op ieder Unity object geplaatst kan worden. Daarbinnen kunnen de karaktereigenschappen van ieder type dier worden vastgelegd, sommige dieren zijn schichtig, altijd in bewewing. Andere dieren zijn lui en slapen gedurende lange tijd en weer andere dieren slapen vaker, maar korter en op verschillende plekken. De kans en duur van iedere actie (plus een willekeurige variatie) kan via de GUI tools worden ingesteld. Deze tools bieden ook handige debugging functionaliteit.
        </p>
        <p>
            Hoewel dit een klein project is, was ik erg enthousiast om met een origineel idee te werken wat echt de fysieke en digitale werelden met elkaar versmelt en creativiteit in kinderen stimuleert.
        </p>
        <p>
            Technologie: Unity3D
            <br>
            Project URL: <a href="http://www.tekentoverkist.nl">http://www.tekentoverkist.nl</a>
        </p>
    </div>
</section>