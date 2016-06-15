var hotelObjects = require('./week4-hotel.js');

module.exports.run = function(jsonString){
    try{
        var searchResponseJson = JSON.parse(jsonString);        
        var hotelList = searchResponseJson.hotelList;        
        if(!hotelList){
            return [];
        }        
        // hotelList.forEach(initializeHotel);       
        
        hotelList.map(initializeHotel)
        
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
    return hotel;    
}

// function initializeHotel(hotel) {
//     return{
//         id : hotel.hotelId,
//         starRating : hotel.hotelStarRating,
//         guestRating : hotel.hotelGuestRating,
//         description : hotel.shortDescription,    
//         hotelAddress : new hotelObjects.HotelAddress(hotel.countryCode, hotel.postalCode, hotel.address, hotel.city, hotel.stateProvinceCode)    
//     }        
// }