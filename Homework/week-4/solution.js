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
    hotel.hotelAddress = new HotelAddress(hotel.countryCode, hotel.postalCode, hotel.address, hotel.city, hotel.stateProvinceCode);    
}

//Class with constructor and default assignment
function HotelAddress(country, postalCode, address, city, state) {
    this.country = assignEmptyForUndefined(country);  
    this.postalCode = assignEmptyForUndefined(postalCode);
    this.address = assignEmptyForUndefined(address);
    this.city = assignEmptyForUndefined(city);
    this.state = assignEmptyForUndefined(state);
    
    function assignEmptyForUndefined(param) {
        return typeof param !== undefined ? param : ""; 
    }
}