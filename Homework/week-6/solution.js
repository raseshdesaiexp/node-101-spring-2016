'use strict';
var http = require('http');
var queryString = require('querystring');
var dateFormat = require('dateformat');

function runMe(callback, location, startDate, numberOfNights) {
    try{
        var requestParams = buildRequestParams(location, startDate, numberOfNights);    
        sendHttpRequest(requestParams, callback);
    } catch(err){
        callback(err, null);
    }
};

function buildRequestParams(location, startDate, numberOfNights){
    // console.log("Location: " + location);
        
    if(!numberOfNights || typeof numberOfNights != Number){
        numberOfNights = 1;
    }
    // console.log("numberOfNights: " + numberOfNights);
    
    var checkInDateObject = new Date(startDate);
    if(checkInDateObject.getTime() < new Date().getTime()){
        throw new Error("CheckInDate < today");
    }
    
    var checkInDate = dateFormat(new Date(startDate), "yyyy-mm-dd");
    // console.log("checkInDate: " + checkInDate);

    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numberOfNights);
    var checkOutDate = dateFormat(endDate, "yyyy-mm-dd");
    
    var params;
    if(typeof location === "number"){
        params = {
            regionId: location,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            room: '1'
        };
    } else{
        params = {
            city: location,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            room: '1'
        };
    }

    var queryParams = queryString.stringify(params);
    console.log("Query Params: " + queryParams);

    var requestParams = {
        hostname: 'www.expedia.com',
        port: 80,
        path: "/m/api/hotel/search?" + queryParams,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return requestParams;
};

function sendHttpRequest(requestParams, callback){
    var req = http.request(requestParams, function(res){
        //Events on response
        var completeResponse = [];  
        res.on('data', function(chunk) { 
            //Because data is coming in chunks
            completeResponse.push(chunk);                 
        });
        res.on('end', function () {
            callback(null, JSON.parse(Buffer.concat(completeResponse).toString()));
        });
    });

    //Events on request
    req.on('error', function(err){
        console.log("Http Request Error: " + err.message); 
        console.log( err.stack );
    });

    req.end();  //this is technically like send(), actual call is made here all above is just declaration
    
    return;
};

module.exports.run = runMe;