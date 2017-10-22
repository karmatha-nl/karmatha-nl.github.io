
$(document).ready(function() {    
	var video = document.getElementById('hero-video');
	var current = 'idle';

	// Assign random icon to appear
	var ICONS = ['icon_unity','icon_html5','icon_vr','icon_nodejs'];
	document.getElementById('icon1').classList.add(ICONS[Math.floor(Math.random() * ICONS.length)]);

	video.addEventListener('timeupdate', function () {
		// debug: document.title = current + ' ' + video.currentTime;
		switch(current){
			case 'idle':
				if (video.currentTime >= 23) {
					playFragment('idle');
				}
				break;
	
			case 'drink': 
				if (video.currentTime >= 45) {
					playFragment('idle');
				}
				break;
	
			case 'scratch1': 
				if (video.currentTime >= 38) {
					playFragment('idle');
				}
				break;
	
			case 'lookright':
				if (video.currentTime >= 32) {
					playFragment('idle');
				}
				break;
		}
	}, false);
	
	video.addEventListener('mousedown ', function(e) {
		playFragment('scratch1');
		e.preventDefault();
	});
    $(video).on('contextmenu', function(e) {
		e.preventDefault();
		playFragment('scratch1');
		
		return false;
	});
	
	function playFragment(fragment) {
		video.attributes.title = fragment;
		switch(fragment	){
			case 'idle':
				video.currentTime = 7.5;
				break;
			case 'drink':
				video.currentTime = 39;
				break;	
			case 'scratch1':
				video.currentTime = 36;
				break;	
			case 'lookright':
				video.currentTime = 29;
				break;	
		}
		current = fragment;
	}

	var s = skrollr.init({
		render: function(data) {
			//Log the current scroll position.
			if(data.curTop > 200 && data.curTop < 300 && current !== 'lookright'){
				console.log('looking right')
				playFragment('lookright');
			}
		}
	});
	skrollr.menu.init(s);
});

