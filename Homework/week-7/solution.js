var inquirer = require('inquirer');
var chalk = require('chalk');
const util = require('util');

var locationType = "none";
var questions = [
  {
    type: 'list',
    name: 'locationType',
    message: chalk.green('Would you like to search with RegionId Or City?'),
    choices: [
      "RegionId",
      "City"
    ]
  },
  {
    type: 'input',
    name: 'location',
    message: chalk.green('Enter your location'),
    when: function(answers){
      locationType = answers.locationType;
      return true;
    },
    validate: function(answer){
      if(locationType === "RegionId" && !checkNumber(answer)){
        console.log(chalk.red("\nInvalid RegionId, please enter a numeric value."));
        return false;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'checkInDate',
    message: chalk.green('Enter check-in date'),
    filter: function(answer){
      return new Date(answer).toISOString().replace(/T[^$]*$/, '');
    }
  },
  {
    type: 'input',
    name: 'checkOutDate',
    message: chalk.green('Enter check-out date'),
    filter: function(answer){
      return new Date(answer).toISOString().replace(/T[^$]*$/, '');
    }
  }
];

inquirer.prompt(questions).then(function(answers){
      var queryParams;
      if (answers.locationType === "RegionId"){
        queryParams = {
          regionId: answers.location,
          checkInDate: answers.checkInDate,
          checkOutDate: answers.checkOutDate,
          room: '1'
        };    
      } else {
        queryParams = {
          city: answers.location,
          checkInDate: answers.checkInDate,
          checkOutDate: answers.checkOutDate,
          room: '1'
        };
      }
      console.log(chalk.bold.blue(util.inspect(queryParams)));
});

function checkNumber(input){
  var newInt = parseInt(input);
    if(isNaN(newInt)){
      return false;
    }
    return true;
};