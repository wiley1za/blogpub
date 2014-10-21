var program = require('commander');
var util = require('util');

program
    .version('0.0.1')
    .usage('[options]')
    .option('-u, --user [user]', 'Set user name')
    .option('-p, --password [password]', 'Set password')
    .option('-b, --blog [blog]', 'Set blog url')
    .parse(process.argv);

if (!program.blog) {
    console.log('--blog option required');
    return;
}
if (!program.user) {
    console.log('--user option required');
    return;
}
if (!program.password) {
    console.log('--password option required');
    return;
}

console.log(
    util.format(
        'Connecting to blog %s with user name "%s" and password "%s"', 
	    program.blog, 
	    program.user, 
	    program.password
    )
);


var wordpress = require("wordpress");
var client = wordpress.createClient({
    url: program.blog,
    username: program.user, 
    password: program.password
});

client.getPosts(function(error, posts) {
    console.log("Found " + posts.length);
});

client.newPost({
    title: "Test from api 4",
    author: 9784918,
    status: "publish",
    content: "Testing the content story, this is *emphasised*",
    terms_names: { 
	"category": ["test"]
    }        
}, function(error, id) {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Post created: " + id);
    }
});
