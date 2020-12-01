var audio = {
	getEl: function(targetId){
    	var targetEl = document.getElementById(targetId);
    	return targetEl;
	},
    play: function(targetId) {
    	var target = this.getEl(targetId);
        target.play();
    },
    pause: function(targetId) {
    	var target = this.getEl(targetId);
        target.pause();
    },
    end: function(targetId){
    	var target = this.getEl(targetId);
        target.currentTime = 0;
    }
};