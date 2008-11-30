jQuery.fn.inspect = function(output) {
	jQuery.inspect($(this), output);
	return this;
}

jQuery.inspect = function(obj, output) {	
	output = (output ? output : 'alert')
	var text = "";
	var _build = null;
	var _dump = null;

	switch (output) {
		case 'console': 
			_build = jQuery.inspect._buildText;
			_dump = jQuery.inspect._console;
			break;
		case 'window': 
			_build = jQuery.inspect._buildHTML;
			_dump = jQuery.inspect._window;
			break;
		default:
		  _build = jQuery.inspect._buildText;
			_dump = jQuery.inspect._alert;
	}

	switch (typeof obj) {
		case 'string': 
			text = "String: " + obj;
			break;
		case 'number': 
			text = "Number: " + obj;
			break;
		case 'boolean': 
			text = "Boolean: " + obj;
			break;
		case 'undefined':
			alert('Object is undefined');
			return true;
		default:
			text = jQuery.inspect._parseObject(obj, _build);
	}

	_dump(text);
}

jQuery.inspect._parseObject = function(obj, _dumpTo) {
	var text = ""
	for (field in obj) { 
		try { 
			text += _dumpTo(field, obj[field]);
	  } 
		catch (err) {
			// do nothing
	  } 
	}

	return text;
}

jQuery.inspect._buildText = function(key, value) {
  return key + ":" + value + "\n";
}

jQuery.inspect._buildHTML = function(key, value) {
  return "<tr><td>" + key + "</td><td>" + value + "</td></tr>\n";
}

jQuery.inspect._console = function(text) {
	console.log(text);
}

jQuery.inspect._alert = function(text) {
	alert(text);
}

jQuery.inspect._window = function(text) {
	text = "<html><head>" + jQuery.inspect._windowSettings.styles + "</head><body><table>" + text + "</table></body></html>";
	dump_window = window.open('', '', jQuery.inspect._windowSettings.config);
	dump_window.document.write(text);
	dump_window.document.close();
	dump_window.focus();
}

jQuery.inspect._windowSettings = jQuery.extend({
	width: 800,
	height: 600
});

jQuery.inspect._windowSettings.styles = "\
<style> \
	* { \
	  margin: 0; \
	} \
	html, body { \
	  height: 100%; \
	  text-align: center; \
	  margin-bottom: 1px; \
	  font-family: verdana,helvetica,sans-serif; \
	} \
	table { \
		width: " + (jQuery.inspect._windowSettings.width - 20) + "px; \
		border: 1px solid black; \
  } \
  td { \
    vertical-align: top; \
  } \
</style>";

jQuery.inspect._windowSettings.config = "width=" + jQuery.inspect._windowSettings.width + ",height=" + jQuery.inspect._windowSettings.height + ",scrollbars=yes,location=no,menubar=no,toolbar=no";
