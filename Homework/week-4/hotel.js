module.exports.HotelAddress = HotelAddress;

function HotelAddress(country, postalCode, address, city, state) {
    
    //HotelAddress Class with constructor and default assignment
    
    this.country = assignEmptyForUndefined(country);  
    this.postalCode = assignEmptyForUndefined(postalCode);
    this.address = assignEmptyForUndefined(address);
    this.city = assignEmptyForUndefined(city);
    this.state = assignEmptyForUndefined(state);
    
    function assignEmptyForUndefined(param) {
        return typeof param !== undefined ? param : ""; 
    }
}