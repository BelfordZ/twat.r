var lowestID = "9999999999999999999999999999999999";
var baseURL = "http://search.twitter.com/search.json?callback=?&";
var intervalID = "";
var visited = [];
var searchParams = {};
var numTweetsFound = 0;

var numTweetsEle;
var resultEle;

var jsonData = "";

var makeParams = function() {
   searchParams.max_id = lowestID;
   return Object.toQueryString(searchParams);
};

var stopStepping = function() {
   clearInterval(intervalID);
};

var go = function() {
   $(numTweetsEle).text("Number of Tweets: " + visited.length);
   var url = baseURL + makeParams(lowestID);
   
   $.ajaxSetup({cache: true});
   $.getJSON(url, function(data){
	 
	 if (data.results.length > 1) {
	    $.each(data.results, function(i, twit) {
		  //if (!visited[twit.id_str]) {
		  jsonData += JSON.stringify(twit);
		  lowestID = [twit.id_str, lowestID].min();
		  visited.push(true);
		  //  }
	       });
	 } else {
	    stopStepping();
	    $(resultEle).append(jsonData);
	 }
      });
};

var init = function() {
   numTweetsEle = $("#numTweetsPulled");
   resultEle = $("#result");
   
   searchParams.q = $("#search").val().escapeURL();
   searchParams.include_entities = true;
   searchParams.rpp = 100;

   intervalID = setInterval(go, 275);
};