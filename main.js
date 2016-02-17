var reels = {};

var spinReel = function($reel) {
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
				reels[reelId] = $reel.find('li').first().html();
				if (allReelsFilled()) {
					console.log(reels['maker'] + " / " + reels['filter'] + " / " + reels['grounds']);
				}
			}
		});
		spinCount--;
	}
}

var allReelsFilled = function() {
	return (reels['maker'] && reels['filter'] && reels['grounds']);
}

$('button').on('click',function(){
	reels = {};
	$('.reel').each(function(){
		spinReel($(this));
	})
})
