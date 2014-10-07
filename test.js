var ResizeManager = require('./');
var label = document.createTextNode("Hello World");
document.body.appendChild(label);

ResizeManager.onResize.add(function(x, y) {
	label.replaceWholeText(x + ' ' + y);
});
