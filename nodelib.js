var nodelib = (function() {
	function touchPath(path) {
    var parts = path.split('/');
    for( var i = 1; i < parts.length; i++ ) {
      var partPath = parts.slice(0, i).join('/');
      try {
        fs.mkdirSync(partPath);
      } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
      }
    }		
	}
  return {
		touchPath:touchPath,
  }
})();

if (typeof module !== 'undefined') 
	module.exports = nodelib;