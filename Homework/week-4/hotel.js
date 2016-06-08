//HotelAddress Class with constructor and default assignment
function HotelAddress(country, postalCode, address, city, state) {
       
    this.country = assignEmptyForUndefined(country);  
    this.postalCode = assignEmptyForUndefined(postalCode);
    this.address = assignEmptyForUndefined(address);
    this.city = assignEmptyForUndefined(city);
    this.state = assignEmptyForUndefined(state);
}

function assignEmptyForUndefined(param) {
    return typeof param !== undefined ? param : ""; 
}

module.exports.HotelAddress = HotelAddress;