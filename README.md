# ProductLinkCrawler
A simple Crawler for querying targeted urls and aggregate to a link list, which represents the product set we collected, like [this](http://dev3.pushfun.com/~jalexchang/shirley_crawler/result.html). Also, this Crawler can automately click/open url links for checking web status in a headless browser.  
This web crawler is built by [CasperJS](https://github.com/casperjs/casperjs), which is a famework of [PhantomJS](https://github.com/ariya/phantomjs).

# Guideline
## Clone this Repository
    git clone git@github.com:JalexChang/ProductLinkCrawler.git
## Install node modules
    npm install
## Add targeted webpage urls in *[crawler.js](https://github.com/JalexChang/ProductLinkCrawler/blob/master/crawler.js)*
    var targetUrls =[
      // adding your targting urls in here.
    ];
## Change link tag and wait tag in *[getLink.js](https://github.com/JalexChang/ProductLinkCrawler/blob/master/getLink.js)*
    var wait_tag = "#Mid_item > ul > li > a.D-tbc";
    var link_tag = "#Mid_item > ul > li > a.D-tbc";
## Execution 
    node crawler.js <arg1> <arg2>
## Optional
#### *\<arg1\>* indicates to number of workers, which are child processes executing get / click link.
#### *\<arg2\>* indicates to the flag represneted whether execute click job or not. 
