var getHotelList = require('./week4-solution.js');
var getSearchResults = require('./get-search-results.js');

function run(callbackSentByTest) {
    
    //We have to notify the test on our experience when we invoke the remote service (which is an expectation from test)
    var callbackDefinedByThisClass = function(jsonString) {
        try{
            callbackSentByTest(null, getHotelList.run(jsonString));     //Positive, no error encountered calling getHotelList 
        } catch(err){
            callbackSentByTest(err, null);      //Negative, error encountered calling getHotelList
        }    
    };
    
    getSearchResults(callbackDefinedByThisClass);   //this is going to invoke your callback that takes in different type of string data                 
};

module.exports.run = run;