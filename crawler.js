var http = require('http');
var os = require('os');
var fs = require('fs');
var worker_num = process.argv[2] || 8;
var exeClicker = process.argv[3] || true;

var crawlers = {"remain" : 0};
var clickers = {"remain" : 0};

process.env.PATH=process.env.PATH+":node_modules/phantomjs-prebuilt/bin/"+":node_modules/casperjs/bin/";

var targetUrls =[
 /*
  *  adding your targting urls in here.
  */
  
 /*'http://24h.pchome.com.tw/region/DHBF',
 'http://24h.pchome.com.tw/region/DHAD',
 'http://24h.pchome.com.tw/region/DEBU',*/
 'https://tw.mall.yahoo.com/2144872346-category.html?.r=1209980542',
 'https://tw.mall.yahoo.com/979249070-category.html?.r=2147103549',
 'https://tw.mall.yahoo.com/979365093-category.html?img_only=1&sort_by=%5Brank%5D&order_by=0',
];
var targetLinks=[];

fs.writeFileSync("./result.html" ,"");
crawlers.remain = worker_num;
workerHandler(crawler);

function workerHandler(cb){
	for(var i =0 ;i < worker_num; ++i) cb();
}

function crawler(){
	if(targetUrls.length>0){
		var url = targetUrls.pop();
		
		var command = "casperjs getLink.js --url="+url;
		require('child_process').exec(command, function (error, stdout, stderr) {	
			//
			if (error !== null) console.error("fail\nlog:\n------\n"+stdout+"------");        
			//else console.log("success\nlog:\n------\n"+stdout+"------");
			else console.log(url+" success");
			var links=[];
			if(stdout.split("<List>").length >1 ) links = stdout.split("<List>")[1].split("</List>")[0].split(",");
			console.log("total link: "+links.length);
			//write to file
			var data="<br>\n";
			if(links.length>0){
				for(var i=0;i<links.length;i++){
					data += '<a href="'+links[i]+'" target="_blank">'+links[i]+'</a><br>'+"\n";
					targetLinks.push(links[i]);
				}
			}
			fs.appendFileSync("./result.html" ,data);
			crawler();
		});
	}
	else{
		console.log("Crawler finish");
		--crawlers.remain;
		if(crawlers.remain==0){
			if(exeClicker==true ){
				clickers.remain = worker_num;
				console.log("total links:"+ targetLinks.length);
				workerHandler(clicker);
			}
		}
	}
}

function clicker(){
	if(targetLinks.length>0){
		var link = targetLinks.pop();
		
		var command = "casperjs loadLink.js --link="+link;
		require('child_process').exec(command, function (error, stdout, stderr) {	
			//
			if (error !== null) console.error("fail\nlog:\n------\n"+stdout+"------");        
			//else console.log("success\nlog:\n------\n"+stdout+"------");
			else console.log(link+" success");
			
			clicker();
		});
	}
	else{
		console.log("Clicker finish");
		--clickers.remain;
		if(clickers.remain==0) console.log("All finish");
	}
}