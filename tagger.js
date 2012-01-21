var request = require('request'),
	fs = require('fs'),
	yaml = require('yaml'),
	xml = require('xml2js');

var	config = {},
	api = 'http://codeforamerica.batchbook.com/service';

var parser = new xml.Parser();

config.key = process.argv[2];
config.users = [{ 'alexy@codeforamerica.org' : 'philly' }, 
	{'liz@codeforamerica.org' : 'philly'}];

if (!config.key) {
	config.key = fs.readFileSync('key').toString();
}

console.log(config);

// http://stackoverflow.com/questions/6918302/http-client-based-on-nodejs-how-to-authenticate-a-request
request.get({
	uri: api + '/activities/recent.xml',
	headers: {
		'Authorization': 'Basic ' + new Buffer(config.key + ':x').toString('base64')
	}
}, function(e, r, body){
	if (e) throw e;
	console.log(body);
	parser.parseString(body, function (e, result){
		if (e) throw e;
		console.log(result);
	})
})

/*

Batchbook API

Users:
List All

GET /service/users.xml 
For ease of use, BatchBook now allows a user to query a list of users. The list is filtered by permissions the same way the web application does it. Basic users are only shown themselves.
Note: The user making the request will see their name as "Me". This is the same as the drop down lists on the web application.

Recent Activity:
GET /service/activities/recent.xml 
To retrieve all Recent Activity from a BatchBook account, send an HTTP GET request to the Activities services URL. BatchBook returns an XML representation of the Activity. The Record search is available if you want more information for the records referenced.

Record:
GET /service/records/#{id}.xml 
If for some reason you have a record id but don't know the type, you can now search all Records by id. The record type is returned as the display type. [Individual, Company, To-Do, Deal, Communication]
List By Search Term
GET /service/records.xml 
Returns a collection of records that match the query passed in through the url. Note: The search query options are mutually exclusive and can not be used together.
PARAMETERS
Option	Default	Comment
qtext	None	Search for all records that match the text string. Can not be used with deleted_since.

Company:
CREATE
curl -u #{api_key}: -X POST https://#{your_account}.batchbook.com/service/companies.xml \
       -d "<company><name>foo company</name><notes>Awesome foo</notes></company>" \
       -H "Content-Type: application/xml" -v
    
  
READ
    
       curl -u #{api_key}: -X GET https://#{your_account}.batchbook.com/service/companies/11899
    
  
UPDATE
    
       curl -u #{api_key}: -X PUT https://#{your_account}.batchbook.com/service/companies/11899.xml \
       -d "<company><name>bar company</name><notes>Much better than the foo place</notes> \ 
       </company>" -H "Content-Type: application/xml" -v
    
  
DESTROY
    
      curl -u #{api_key}: -X DELETE https://#{your_account}.batchbook.com/service/companies/11899.xml


Tags:
GET /service/tags/#{record_name}.xml 
Displays the information for a tag. Note: The id is the tag name.
RESPONSE
      Status: 200
      <tag>
        <id type="integer">424</id>
        <name>cool</name>
        <supertag type="boolean">false</supertag>
      </tag>

GET /service/tags.xml 
List all tags

RESPONSE
    
      Status: 200
      <tags type="array">
        <tag>
          <id type="integer">422</id>
          <name>sample</name>
          <supertag type="boolean">true</supertag>
        </tag>
        <tag>
          <id type="integer">423</id>
          <name>money maker</name>
          <supertag type="boolean">false</supertag>
        </tag>
        <tag>
          <id type="integer">424</id>
          <name>cool</name>
          <supertag type="boolean">false</supertag>
        </tag>
      </tags>

PUT /service/#{records}/#{record_id}/add_tag.xml 
Adds a tag or tags to a Person, Company, Deal, Communication or Todo

REQUEST
    
      <tag>
        awesome
      </tag>
    
    
or


      
      <tags>
        important,fun,another tag
      </tags>
      
    
or


      
        <tags type='array'>
          <tag>
            awesome
          </tag>
          <tag>
            great
          </tag>
          <tag>
            tiring
          </tag>
        </tags>
      
  
RESPONSE
    
      Status: 200
      


*/