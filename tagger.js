var request = require('request'),
	fs = require('fs'),
	yaml = require('yaml'),
	config = {
		users: [{
		alexy@codeforamerica.org : 'philadelphia',
		liz@codeforamerica.org : 'philadelphia'	
		}]
	};

fs.readFile('key', function(err, data){
	if (err) throw err;
	config.key = data.toString();

});


