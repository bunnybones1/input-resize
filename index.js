var EventUtils = require('browser-event-adder');
var signals = require('signals');
var onResize = new signals.Signal();

var Resize = {
	width: 16,
	height: 16,
	minHeight: 16,
	maxHeight: 100000,
	minWidth: 16,
	maxWidth: 100000,
}

function adjustedWidth() {
	var width = window.innerWidth || document.documentElement.clientWidth;
	return Math.max(Resize.minWidth, Math.min(Resize.maxWidth, width));
}

function adjustedHeight() {
	var height = window.innerHeight || document.documentElement.clientHeight;
	return Math.max(Resize.minHeight, Math.min(Resize.maxHeight, height));
}

function bump() {
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
	if(w === Resize.width && h === Resize.height) return;
	Resize.width = w;
	Resize.height = h;
	onResize.dispatch(w, h);
});

Resize.onResize = onResize;
Resize.bump = bump;

module.exports = Resize;
