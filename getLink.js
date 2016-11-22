var Crawler = require("casper").create();

Crawler.on("page.error", function(msg, trace) {
	//this.echo("Page Error: " + msg, "ERROR");
});

//setup
var url = Crawler.cli.get("url"); //url link recieved from input 


var wait_tag = "#Mid_item > ul > li > a.D-tbc"; // a tag uesd for dynamic dom 
var link_tag = "#Mid_item > ul > li > a.D-tbc"; // targeted link tag  


Crawler.start(url,function(){});

Crawler.waitForSelector(wait_tag,function(){
	//exist, try to query html back
	console.log(1);
	ScrolltoBottom(0,getLinks);
},function(){
	//timeout
	console.log("<List></List>");
	console.error("<status>can not find link_tag </status>");
},4000);


function ScrolltoBottom(Height,cb){
	Crawler.then(function(){
		var NewHeight = this.evaluate(function(Height){
			window.scrollTo(0,Height+1000);
			return document.body.scrollHeight;
		},Height);
		this.wait(1000);
		if(NewHeight > Height) ScrolltoBottom(Height+1000,cb);
		else cb();
	});
}

function getLinks(){
	Crawler.then(function(){
		var data = this.evaluate(function(link_tag){
		var target = document.querySelectorAll(link_tag);
			var list =[];
			for(var i =0 ;i <target.length ; i++){
				list.push(target[i].href);
			}
			return list;
		},link_tag);
		this.then(function(){
			console.log("<List>"+data+"</List>");
			//this.capture("crawler.jpg" );
		});
	});
}

Crawler.run();
