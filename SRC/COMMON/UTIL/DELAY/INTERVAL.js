/**
 * Interval class
 */
global.INTERVAL = CLASS({

	init : function(inner, self, seconds, func) {
		'use strict';
		//REQUIRED: seconds
		//OPTIONAL: func

		var
		// interval
		interval,

		// remove.
		remove;

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}

		interval = setInterval(function() {
			if (func(self) === false) {
				remove();
			}
		}, seconds === 0 ? 1 : seconds * 1000);

		self.remove = remove = function() {
			clearInterval(interval);
		};
	}
});
