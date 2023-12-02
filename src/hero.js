function Hero(container) {
	this.container = container;
	this.current = 'idle';
	this.idleTime = 0;

	this.spritesheet = null;
	this.fps = 30;
	this.lastUpdate = performance.now();

	this.video = null;
	this.videoChapters = {
		IDLE: { start: 4.15, end: 19.22 },
		DRINK: { start: 36, end: 42  },
		LOOKRIGHT: { start: 20, end: 26 },
		SCRATCH1: { start: 26, end: 28 },
		SCRATCH2: { start: 30, end: 32 }
	}

	this.init();
	this.update = this.update.bind(this);
}

Hero.prototype.init = async function() {
	// Check if we can support alpha WebM video
	const mode = await findBestMode();
  this.setMode(mode)

	// returns a boolean indicating whether we can support web alpha
	async function findBestMode(){
    return new Promise((resolve, reject) => {
      if (location.search.indexOf('?spritesheet') > -1) {
        return 'spritesheet'
      }

      // based on https://stackoverflow.com/a/40511297/3125123
      const vid = document.createElement('video');
      vid.autoplay = false;
      vid.loop = false;
      vid.style.display = "none";

      if (vid.canPlayType('video/mp4;codecs=hvc1') !== "") {
        // We're on a device that supports HEVC (H.265) which supports transparency
        return resolve('video/hevc')
      }

      if (vid.canPlayType('video/webm') === "") {
        // We dont support webm, can't do much at this point...
        return resolve('spritesheet')
      }

      vid.addEventListener("loadeddata", () => {
        document.body.removeChild(vid);

        // Create a canvas element, this is what user sees.
        var canvas = document.createElement("canvas");

        //If we don't support the canvas, we definitely don't support webm alpha video.
        if (!(canvas.getContext && canvas.getContext('2d'))){
          return resolve('spritesheet');
        }

        // Get the drawing context for canvas.
        const ctx = canvas.getContext("2d");

        // Draw the current frame of video onto canvas.
        ctx.drawImage(vid, 0, 0);
        const pixelIsZero = ctx.getImageData(0, 0, 1, 1).data[3] === 0
        return resolve(pixelIsZero ? 'video/webm' : 'spritesheet');
      }, false);

      vid.addEventListener("error", () => {
        document.body.removeChild(vid);
        return resolve('spritesheet');
      });

      vid.addEventListener("stalled", () => {
        document.body.removeChild(vid);
        return resolve('spritesheet');
      });

      //Just in case
      vid.addEventListener("abort", () => {
        document.body.removeChild(vid);
        return resolve('spritesheet');
      });

      const source = document.createElement("source");
      source.src = "data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4ECQoWBAhhTgGcBAAAAAAACBRFNm3RALE27i1OrhBVJqWZTrIHlTbuMU6uEFlSua1OsggEjTbuMU6uEHFO7a1OsggHo7AEAAAAAAACqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAADIq17GDD0JATYCNTGF2ZjU3LjU3LjEwMFdBjUxhdmY1Ny41Ny4xMDBEiYhARAAAAAAAABZUrmsBAAAAAAAARq4BAAAAAAAAPdeBAXPFgQGcgQAitZyDdW5khoVWX1ZQOYOBASPjg4QCYloA4AEAAAAAAAARsIFAuoFAmoECU8CBAVSygQQfQ7Z1AQAAAAAAAGfngQCgAQAAAAAAAFuhooEAAACCSYNCAAPwA/YAOCQcGFQAADBgAABnP///NXgndmB1oQEAAAAAAAAtpgEAAAAAAAAk7oEBpZ+CSYNCAAPwA/YAOCQcGFQAADBgAABnP///Vttk7swAHFO7awEAAAAAAAARu4+zgQC3iveBAfGCAXXwgQM=";
      source.addEventListener("error", () => {
        document.body.removeChild(vid);
        return resolve(false);
      });
      vid.appendChild(source);

      //This is required for IE
      document.body.appendChild(vid);
    });
  };
}

Hero.prototype.playFragment = function(fragment) {
	if(this.mode.startsWith('video')) {
		switch(fragment	){
			case 'idle':
				this.seekTime(this.videoChapters.IDLE.start);
				break;
			case 'drink':
				this.seekTime(this.videoChapters.DRINK.start);
				break;
			case 'scratch0':
        this.seekTime(this.videoChapters.SCRATCH1.start);
				break;
			case 'scratch1':
				this.seekTime(this.videoChapters.SCRATCH2.start);
				break;
			case 'lookright':
				this.seekTime(this.videoChapters.LOOKRIGHT.start);
				break;
		}
		this.current = fragment;
		if(fragment != 'idle'){
			this.idleTime = 0;
		}
	}
}

Hero.prototype.seekTime = function(time) {
  if (this.video.fastSeek) {
    this.video.fastSeek(time);
  } else {
    this.video.currentTime = time;

  }
}

Hero.prototype.setMode = function(mode) {
	this.mode = mode;

  if(mode.startsWith('video')) {
		if(!this.video){
      const path = this.determineVideoPath()

      this.container.append(`<video id='hero-video' autoplay muted loop playsinline preload="metadata" src='${path}'>`);
			this.video = document.getElementById('hero-video');

			this.video.addEventListener('timeupdate', this.onVideoUpdate.bind(this), false);

			this.video.addEventListener('mousedown', this.onClick.bind(this));
			this.video.addEventListener('pointerdown', this.onClick.bind(this));
			$(this.video).on('contextmenu', this.onClick.bind(this));
		}
		this.video.style.display = 'block';

    if (this.spritesheet) {
			this.spritesheet.style.display = 'none';
		}
	}
	else if (mode === 'spritesheet') {

		if (!this.spritesheet){
			this.container.append("<div id='hero-spritesheet' style='background-image: url(\"/resources/sequence-spritesheet.png\")'></div>");
			this.spritesheet = document.getElementById('hero-spritesheet');

			this.spritesheet.className = 'idle'
		}
		this.spritesheet.style.display = 'block';
		if(this.video) {
			this.video.style.display = 'none';
		}

		this.update();
	}
}

Hero.prototype.onVideoUpdate = function () {
	//debug: ocument.title = this.current + ' ' + this.video.currentTime;
	switch (this.current){
		case 'idle':

			if(this.idleTime++ > 260){
				this.playFragment('drink');
			}
			else if (this.video.currentTime >= this.videoChapters.IDLE.end) {
				this.playFragment('idle');
			}
			break;

		case 'drink':
			if (this.video.currentTime >= this.videoChapters.DRINK.end) {
				this.playFragment('idle');
			}
			break;

		case 'scratch0':
			if (this.video.currentTime >= this.videoChapters.SCRATCH1.end) {
				this.playFragment('idle');
			}
			break;

		case 'scratch1':
			if (this.video.currentTime >= this.videoChapters.SCRATCH2.end) {
				this.playFragment('idle');
			}
			break;

		case 'lookright':
			if (this.video.currentTime >= this.videoChapters.LOOKRIGHT.end) {
				this.playFragment('idle');
			}
			break;
	}
}

Hero.prototype.onClick = function(e) {
	e.preventDefault();
	this.playFragment('scratch' + Math.round(Math.random()));

	return false;
}
this.fps = 30;
this.lastUpdate = Date.now();

// Spritesheet update
Hero.prototype.update = function() {
	if (this.mode !== 'spritesheet'){
		return;
	}
	var interval = 1000/this.fps;
	var now = performance.now();
	var	delta = now - this.lastUpdate;
	if (delta > interval) {
		this.lastUpdate = now - (delta % interval);

	}
	requestAnimationFrame(this.update);

}

Hero.prototype.determineVideoPath = function() {
  if (this.mode === 'video/hevc') {
    return "/resources/sequence-hevc.mov";
  }
  return "/resources/sequence-webm.webm";
}

$(document).ready(function() {
	// Assign random icon to appear
	var ICONS = ['icon_unity','icon_html5','icon_vr','icon_nodejs'];
	document.getElementById('icon1').classList.add(ICONS[Math.floor(Math.random() * ICONS.length)]);

	var hero = new Hero($('#video-placeholder'));

	var s = skrollr.init({
		render: function(data) {
			if(data.curTop > 200 && data.curTop < 300 && hero.current !== 'lookright'){
				hero.playFragment('lookright');
			}
		}
	});
	skrollr.menu.init(s);
});

