/**
 * Interval class
 */
global.INTERVAL = CLASS({

	init : function(inner, self, seconds, func) {
		'use strict';
		//REQUIRED: seconds
		//OPTIONAL: func

		var
		// milliseconds
		milliseconds,
		
		// start time
		startTime = Date.now(),
		
		// remaining
		remaining,
		
		// interval
		interval,
		
		// resume.
		resume,
		
		// pause.
		pause,

		// remove.
		remove;

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}
		
		remaining = milliseconds = seconds === 0 ? 1 : seconds * 1000;
		
		self.resume = resume = RAR(function() {
			
			if (interval === undefined) {
				
				interval = setInterval(function() {
					
					if (func(self) === false) {
						remove();
					}
					
					startTime = Date.now();
					
				}, remaining);
			}
		});
		
		self.pause = pause = function() {
			
			remaining = milliseconds - (Date.now() - startTime);
			
			clearInterval(interval);
			interval = undefined;
		};
		
		self.remove = remove = function() {
			pause();
		};
	}
});
