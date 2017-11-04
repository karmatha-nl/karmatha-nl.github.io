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

Hero.prototype.init = function() {
	// Check if we can support alpha WebM video 
	supportsWebMAlpha(function(useVideo){
		this.setMode(useVideo ? 'video' : 'spritesheet');		
	}.bind(this));

	function supportsWebMAlpha(callback){
		var vid = document.createElement('video');
		vid.autoplay = false;
		vid.loop = false;
		vid.style.display = "none";
		vid.addEventListener("loadeddata", function(){
			document.body.removeChild(vid);
			// Create a canvas element, this is what user sees.
			var canvas = document.createElement("canvas");
	
			//If we don't support the canvas, we definitely don't support webm alpha video.
			if (!(canvas.getContext && canvas.getContext('2d'))){
				callback(false);
				return;
			}
	
			// Get the drawing context for canvas.
			var ctx = canvas.getContext("2d");
	
			// Draw the current frame of video onto canvas.
			ctx.drawImage(vid, 0, 0);
			callback(ctx.getImageData(0, 0, 1, 1).data[3] === 0);
	
		}, false);
		vid.addEventListener("error", function(){
			document.body.removeChild(vid);
			callback(false);
		});
	
		vid.addEventListener("stalled", function(){
			document.body.removeChild(vid);
			callback(false);
		});
	
		//Just in case
		vid.addEventListener("abort", function(){
			document.body.removeChild(vid);
			callback(false);
		});
	
		var source = document.createElement("source");
		source.src="data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4ECQoWBAhhTgGcBAAAAAAACBRFNm3RALE27i1OrhBVJqWZTrIHlTbuMU6uEFlSua1OsggEjTbuMU6uEHFO7a1OsggHo7AEAAAAAAACqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAADIq17GDD0JATYCNTGF2ZjU3LjU3LjEwMFdBjUxhdmY1Ny41Ny4xMDBEiYhARAAAAAAAABZUrmsBAAAAAAAARq4BAAAAAAAAPdeBAXPFgQGcgQAitZyDdW5khoVWX1ZQOYOBASPjg4QCYloA4AEAAAAAAAARsIFAuoFAmoECU8CBAVSygQQfQ7Z1AQAAAAAAAGfngQCgAQAAAAAAAFuhooEAAACCSYNCAAPwA/YAOCQcGFQAADBgAABnP///NXgndmB1oQEAAAAAAAAtpgEAAAAAAAAk7oEBpZ+CSYNCAAPwA/YAOCQcGFQAADBgAABnP///Vttk7swAHFO7awEAAAAAAAARu4+zgQC3iveBAfGCAXXwgQM=";
		source.addEventListener("error", function()
		{
		   document.body.removeChild(vid);
		   callback(false);
		});
		vid.appendChild(source);
	
		//This is required for IE
		document.body.appendChild(vid);
	};	
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
		
		this.update();		
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
this.fps = 30;
this.lastUpdate = Date.now();
// Spritesheet update 
Hero.prototype.update = function() { 
	if(this.mode !== 'spritesheet'){
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

	// // This horrible thing is needed because browser don't support webm video with transparency equally
	// var ua = detect.parse(navigator.userAgent);
	// switch (ua.browser.family) {
	// 	case 'Firefox':
	// 		if(ua.browser.version < 53) {
	// 			// Firefox supports transparent video after version 53
	// 			break;
	// 		}
	// 	case 'Chrome':
	// 		hero.setMode('video');
	// 	}
});

