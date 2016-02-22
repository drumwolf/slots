var SlotMachine = function() {
	this.reels = {};
	this.$slotMachine   = $('#slot-machine');
	this.$reel          = this.$slotMachine.find('.reel');
	this.$leverArea     = this.$slotMachine.find('.lever-area');
	this.$lever         = this.$slotMachine.find('.lever');
	this.$messageWindow = this.$slotMachine.find('.message-window');
	this.init();
}
SlotMachine.prototype.init = function() {
	this.pullLever();
}
SlotMachine.prototype.pullLever = function() {
	this.$leverArea.on('click',function(){
		this.$leverArea.addClass('lever-active');
		this.spinAllReels();
	}.bind(this));
}
SlotMachine.prototype.spinAllReels = function() {
	var _this = this;
	this.reels = {};
	this.$reel.each(function(index, reel){
		var $reel = $(reel);
		this.spinReel($reel);
	}.bind(this));
}
SlotMachine.prototype.spinReel = function($reel) {
	var reelId = $reel.attr('id');
	var spins = 15 + Math.floor(Math.random() * 15);
	var spinsRemaining = spins;
	while (spins) {
		$reel.animate({ top: "-=180px" }, 50, function(){
			var $first = $reel.find('li').first();
			$first.detach();
			$reel.append($first).css({ top: 0 });
			spinsRemaining--;
			if (spinsRemaining === 0) {
				this.reels[reelId] = $reel.find('li').first().data('drink');
				if (this.allReelsFinished()) {
					this.processResults();
				}
			}
		}.bind(this));
		spins--;
	}
}
SlotMachine.prototype.allReelsFinished = function() {
	return (this.reels['maker'] && this.reels['filter'] && this.reels['grounds']);
}
SlotMachine.prototype.processResults = function() {
	//this.$lever.removeClass('active');
	console.log(this.reels['maker'] + " / " + this.reels['filter'] + " / " + this.reels['grounds']);

}

// instantiate new instance of SlotMachine
$(function(){
	new SlotMachine();
})