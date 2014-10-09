var EventUtils = require('browser-event-adder');
var signals = require('signals');
var onResize = new signals.Signal();

var lastW = 0,
	lastH = 0;

var Resize = {
	minHeight : 16,
	maxHeight : 100000,
	minWidth : 16,
	maxWidth : 100000
}

function adjustedWidth() {
	return Math.max(Resize.minWidth, Math.min(Resize.maxWidth, window.innerWidth));
}

function adjustedHeight() {
	return Math.max(Resize.minHeight, Math.min(Resize.maxHeight, window.innerHeight));
}

function bump(resizeCallback) {
	onResize.dispatch(
		adjustedWidth(), 
		adjustedHeight()
	);
}

EventUtils.addEvent(window, "resize", function(event) {
	var w = adjustedWidth();
	var h = adjustedHeight();
	if(w == lastW && h == lastH) return;
	onResize.dispatch(w, h);
	lastW = w;
	lastH = h;
});

Resize.onResize = onResize;
Resize.bump = bump;

module.exports = Resize;