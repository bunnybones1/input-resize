var EventUtils = require('browser-event-adder');
var signals = require('signals');
var onResize = new signals.Signal();
EventUtils.addEvent(window, "resize", function(event) {
	onResize.dispatch(window.innerWidth, window.innerHeight);
});
module.exports = {
	onResize: onResize
};