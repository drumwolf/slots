var SlotMachine = function() {
	this.reels = {};
	this.$slotMachine = $('#slotmachine');
	this.$reel   = this.$slotMachine.find('.reel');
	this.$button = this.$slotMachine.find('button');
	this.init();
}
SlotMachine.prototype.init = function() {
	this.activateButton();
}
SlotMachine.prototype.activateButton = function() {
	var _this = this;
	_this.$button.on('click',function(){
		_this.reels = {};
		_this.$reel.each(function(){
			var $reel = $(this);
			_this.spinReel($reel);
		});
		$(this).addClass('inactive');
	});
}
SlotMachine.prototype.spinReel = function($reel) {
	var reelId = $reel.attr('id');
	var spinCount = 10 + Math.floor(Math.random() * 10);
	var spinsRemaining = spinCount;
	while (spinCount) {
		$reel.animate({ top: "-=66px" }, 50, function(){
			var $first = $reel.find('li').first();
			$first.detach();
			$reel.append($first).css({ top: 0 });
			spinsRemaining--;
			if (spinsRemaining === 0) {
				this.reels[reelId] = $reel.find('li').first().html();
				if (this.allReelsFilled()) {
					this.processResults();
				}
			}
		}.bind(this));
		spinCount--;
	}
}
SlotMachine.prototype.allReelsFilled = function() {
	return (this.reels['maker'] && this.reels['filter'] && this.reels['grounds']);
}
SlotMachine.prototype.processResults = function() {
	this.$button.removeClass('inactive');
	console.log(this.reels['maker'] + " / " + this.reels['filter'] + " / " + this.reels['grounds']);
}

// instantiate new instance of SlotMachine
$(function(){
	new SlotMachine();
})