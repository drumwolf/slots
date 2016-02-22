var SlotMachine = function() {
	this.reels = {};
	this.$slotMachine   = $('#slot-machine');
	this.$reel    = this.$slotMachine.find('.reel');
	this.$lever   = this.$slotMachine.find('.lever-area');
	this.$marquee = this.$slotMachine.find('.marquee');
	this.$drinkWindow = this.$slotMachine.find('.drink-window');
	this.init();
}
SlotMachine.prototype.init = function() {
	this.pullLever();
}
SlotMachine.prototype.pullLever = function() {
	this.$lever.on('click', function(e){
		if (this.$lever.hasClass('down')) {
			this.resetLever();
		} else {
			this.spinAllReels();
		}
	}.bind(this));
}
SlotMachine.prototype.spinAllReels = function() {
	this.$lever.addClass('active down');
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
	var reels = this.reels;
	var drink = (reels['maker'] === reels['filter'] && reels['maker'] === reels['grounds']) ? reels['maker'] : null;
	this.$marquee.find('p').hide();
	if (drink) {
		this.$marquee.find('.win').show();
		this.$marquee.find('.drink').html(drink);
		this.$drinkWindow.addClass('open');
	} else {
		this.$marquee.find('.lose').show();
	}
	this.$lever.removeClass('active')
}
SlotMachine.prototype.resetLever = function() {
	this.$lever.removeClass('down');
	this.$marquee.find('.default').show();
	this.$drinkWindow.removeClass('open');
}

// instantiate new instance of SlotMachine
$(function(){
	new SlotMachine();
})