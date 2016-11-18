var Clicker = require("casper").create();

Clicker.on("page.error", function(msg, trace) {
	//this.echo("Page Error: " + msg, "ERROR");
});

//setup
var link = Clicker.cli.get("link");

//open link and wait 3 seconds.
Clicker.start(link,function(){
	this.wait(3000);
	//this.capture("clicker.jpg" );
});

Clicker.run();



