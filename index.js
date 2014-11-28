var EventUtils = require('browser-event-adder');
var signals = require('signals');
var onResize = new signals.Signal();

var Resize = {
	width: 16,
	height: 16,
	minHeight : 16,
	maxHeight : 100000,
	minWidth : 16,
	maxWidth : 100000,
	debounce : 50
}

function adjustedWidth() {
	return Math.max(Resize.minWidth, Math.min(Resize.maxWidth, window.innerWidth));
}

function adjustedHeight() {
	return Math.max(Resize.minHeight, Math.min(Resize.maxHeight, window.innerHeight));
}

function bump(resizeCallback) {
	Resize.width = adjustedWidth();
	Resize.height = adjustedHeight();
	onResize.dispatch(
		Resize.width, 
		Resize.height
	);
}

EventUtils.addEvent(window, "resize", function(event) {
	var w = adjustedWidth();
	var h = adjustedHeight();
	if(w == Resize.width && h == Resize.height) return;
	Resize.width = w;
	Resize.height = h;
	if(Resize.debounce > 0) {
		if(!Resize.debouncing) {
			setTimeout(function() {
				Resize.debouncing = false;
				onResize.dispatch(Resize.width, Resize.height);
			}, Resize.debounce);
		}
		Resize.debouncing = true;
	} else {
		onResize.dispatch(w, h);
	}
});

Resize.onResize = onResize;
Resize.bump = bump;

module.exports = Resize;