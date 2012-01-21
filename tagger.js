var request = require('request'),
	fs = require('fs'),
	yaml = require('yaml'),
	config = {};

config.key = process.argv[2];
config.users = [{ 'alexy@codeforamerica.org' : 'philadelphia' }, 
	{'liz@codeforamerica.org' : 'philadelphia'}];

if (!config.key) {
	config.key = fs.readFileSync('key').toString();
}

console.log(config);
