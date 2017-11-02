// function SpritesheetHero() {

// }

// SpritesheetHero.prototype.playFragment = function(fragment) {
// 	console.log(fragment);
// }

// function VideoHero() {

// }

// VideoHero.prototype.playFragment = function(fragment) {
// 	console.log(fragment);
// }

function Hero(container) {
	this.container = container;
	this.current = 'idle';
	this.idleTime = 0;

	this.spritesheet = null;

	this.video = null;
	this.videoChapters = {
		IDLE: { start: 4.15, end: 19.22 },
		DRINK: { start: 36, end: 42  },
		LOOKRIGHT: { start: 20, end: 26 },
		SCRATCH1: { start: 26, end: 28 },
		SCRATCH2: { start: 30, end: 32 }
	}

	this.setMode('spritesheet');	
}

Hero.prototype.playFragment = function(fragment) {
	if(this.mode === 'video') {
		switch(fragment	){
			case 'idle':
				this.video.currentTime = this.videoChapters.IDLE.start;
				break;
			case 'drink':
				this.video.currentTime = this.videoChapters.DRINK.start;
				break;	
			case 'scratch0':
				this.video.currentTime = this.videoChapters.SCRATCH1.start;
				break;	
			case 'scratch1':
				this.video.currentTime = this.videoChapters.SCRATCH2.start;
				break;	
			case 'lookright':
				this.video.currentTime = this.videoChapters.LOOKRIGHT.start;
				break;	
		}
		this.current = fragment;
		if(fragment != 'idle'){
			this.idleTime = 0;
		}
	}
}

Hero.prototype.setMode = function(mode) {
	this.mode = mode;

	if(mode === 'video') {
		if(!this.video){
			var ua = detect.parse(navigator.userAgent);			
			this.container.append("<video id='hero-video' src='/resources/sequence-" + ua.browser.family.toLowerCase() + ".webm' autoplay loop></video>");
			this.video = document.getElementById('hero-video');

			this.video.addEventListener('timeupdate', this.onVideoUpdate.bind(this), false);

			this.video.addEventListener('mousedown', this.onClick.bind(this));
			$(this.video).on('contextmenu', this.onClick.bind(this));			
		}
		this.video.style.display = 'block';
		if(this.spritesheet) {
			this.spritesheet.style.display = 'none';
		}	
	}
	else if (mode === 'spritesheet') {
		if(!this.spritesheet){
			this.container.append("<div id='hero-spritesheet' style='background-image: url(\"/resources/sequence-spritesheet.png\")'></div>");
			this.spritesheet = document.getElementById('hero-spritesheet');			
		}
		this.spritesheet.style.display = 'block';
		if(this.video) {
			this.video.style.display = 'none';
		}	
	}
}

Hero.prototype.onVideoUpdate = function () {
	//debug: ocument.title = this.current + ' ' + this.video.currentTime;
	switch(this.current){
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

	// This horrible thing is needed because browser don't support webm video with transparency equally
	var ua = detect.parse(navigator.userAgent);
	switch (ua.browser.family) {
		case 'Firefox':
			if(ua.browser.version < 53) {
				// Firefox supports transparent video after version 53
				break;
			}
		case 'Chrome':
			hero.setMode('video');
		}
});

