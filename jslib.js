var jslib = (function() {
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
	
  function replace(str, source, target) {
    return str.split(source).join(target);
  }

  return {
		endsWith:endsWith,
		replace: replace,
  }
})();

if (typeof module !== 'undefined') 
	module.exports = jslib;