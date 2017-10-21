
$(document).ready(function() {    
	var video = document.getElementById('hero-video');
	var current = 'idle';
	video.addEventListener('timeupdate', function () {
		document.title = current + ' ' + video.currentTime;
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
	
	video.addEventListener('click', function() {
		playFragment('lookright');
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
				video.currentTime = 28;
				break;	
		}
		//video.play();
		current = fragment;
	}

	var s = skrollr.init({
		render: function(data) {
			//Log the current scroll position.
			if(data.curTop > 180 && data.curTop < 300 && current !== 'lookright'){
				console.log('looking right')
				playFragment('lookright');
			}
		}
	});
	skrollr.menu.init(s);
});

