var hash = {};

var rollSlot = function($slot) {
	var $ul = $slot.find('ul');
	var slotId = $ul.attr('id');
	var spinCount = 10 + Math.floor(Math.random() * 10);
	var spinsRemaining = spinCount;
	while (spinCount) {
		$ul.animate({ top: "-=66px" }, 50, function(){
			var $first = $ul.find('li').first();
			$first.detach();
			$ul.append($first).css({ top: 0 });
			spinsRemaining--;
			if (spinsRemaining === 0) {
				hash[slotId] = $ul.find('li').first().html();
				if (hash['machine'] && hash['filter'] && hash['grounds']) {
					console.log(hash['machine'] + " / " + hash['filter'] + " / " + hash['grounds']);
				}
			}
		});
		spinCount--;
	}
}


$('button').on('click',function(){
	hash = {};
	$('.slot').each(function(){
		rollSlot($(this));
	})
})
