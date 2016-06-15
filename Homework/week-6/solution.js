'use strict';
var http = require('http');

function runMe(callback, location, startDate, numberOfNights) {
    try{
        // console.log("Running solution.");

        console.log("Location: " + location);
        console.log("startDate: " + startDate);
        console.log("numberOfNights: " + numberOfNights);

        var req = http.request({
            hostname: 'www.expedia.com',
            port: 80,
            path: "/m/api/hotel/search?city=seattle&checkInDate=2016-07-10&checkOutDate=2016-07-20&room=1",
            method: 'GET'
        }, function (res){
            //Events on response/result
            res.on('data', function(res){        
                // console.log(res.toString()); //toString to read complete data instead of buffered data
                callback(null, res);
            });
        });

        //Events on request
        req.on('error', function(err){
            console.log("Http Request Error: " + err.message); 
            console.log( err.stack );
        });

        req.end();  //this is technically like send(), actual call is made here all above is just declaration

        var results = [];
        return results;
    } catch(err){
        throw new Error('ERROR Connecting');
    }
};

module.exports.run = runMe;