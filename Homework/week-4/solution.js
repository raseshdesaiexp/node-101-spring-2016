var hotelObjects = require('./hotel.js');

module.exports.run = function(jsonString){
    try{
        var searchResponseJson = JSON.parse(jsonString);        
        var hotelList = searchResponseJson.hotelList;        
        if(!hotelList){
            return [];
        }        
        hotelList.forEach(initializeHotel);       
        return hotelList;        
    } catch(err){
        throw new Error("BAD JSON");
    }
}

function initializeHotel(hotel) {
    hotel.id = hotel.hotelId;
    hotel.starRating = hotel.hotelStarRating;
    hotel.guestRating = hotel.hotelGuestRating;
    hotel.description = hotel.shortDescription;    
    hotel.hotelAddress = new hotelObjects.HotelAddress(hotel.countryCode, hotel.postalCode, hotel.address, hotel.city, hotel.stateProvinceCode);    
}