var request = require('request'),
	fs = require('fs'),
	yaml = require('yaml'),
	config = {};

fs.readFile('key.yml', function(err, data){
	if (err) throw err;
	console.log(data);
	config = yaml.eval(data.toString);
	console.log(config);
});


