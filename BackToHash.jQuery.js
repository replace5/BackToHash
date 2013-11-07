;(function(global, $){
	if (!$) { throw 'No jQuery/$ object to integrate BackToHash into.'; }
	$.fn.BackToHash = function(mayAdd) {
		var mayAdd      = !!mayAdd, //if the selector element may add to the dom, make it true.
			$this 		= $(this), //if isn't mayAdd, cache the jQuery object
			tSelector   = this.selector,
			$view       = $(global), 
			$collection = $this,
			checkScroll = function() {
				if(mayAdd) {
					$collection = $(tSelector);
				}
				$collection.each(function() {
					var hash = $(this).attr('id') || $(this).attr('name'),
						BoundingClientRect = $(this).offset().top - $view.scrollTop(),
						inSetArea = Math.abs(BoundingClientRect) < 20;
					if(hash && inSetArea) {location.hash = hash;}
				});
			};
		//if isn't mayAdd,but you also need add new element to use this plugin, after do add, call this function, the parameter is the selector you want to add in.
		$collection.add = function(selector) {
			$collection = $.merge($collection, $(selector));
			return $collection;
		}
		$view.bind('scroll.backtohash', checkScroll);
		return $collection;
	}
}(window, jQuery));