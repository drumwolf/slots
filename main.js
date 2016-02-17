var reels = {};

var spinReel = function($reel) {
	var slotId = $reel.attr('id');
	var spinCount = 10 + Math.floor(Math.random() * 10);
	var spinsRemaining = spinCount;
	while (spinCount) {
		$reel.animate({ top: "-=66px" }, 50, function(){
			var $first = $reel.find('li').first();
			$first.detach();
			$reel.append($first).css({ top: 0 });
			spinsRemaining--;
			if (spinsRemaining === 0) {
				reels[slotId] = $reel.find('li').first().html();
				if (reels['maker'] && reels['filter'] && reels['grounds']) {
					console.log(reels['maker'] + " / " + reels['filter'] + " / " + reels['grounds']);
				}
			}
		});
		spinCount--;
	}
}

$('button').on('click',function(){
	reels = {};
	$('.reel').each(function(){
		spinReel($(this));
	})
})
