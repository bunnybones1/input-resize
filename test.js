var ResizeManager = require('./');
var label = document.createTextNode("Hello World");
document.body.appendChild(label);

ResizeManager.minWidth = 800;
ResizeManager.minHeight = 600;

ResizeManager.onResize.add(function(x, y) {
	label.replaceWholeText(x + ' ' + y);
});
