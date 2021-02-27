let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

// generate a random number between 0 and the length of the countriesAndCodes array.
// This number will be used as an index when getting random countries
let randomNumber = Math.floor(Math.random() * countriesAndCodes.length);


// when the page loads, select an element at random from the countriesAndCodes array
window.addEventListener("load", () => {
    let randomCountry = countriesAndCodes[randomNumber].name; // get a random country from array
    randomCountryElement.innerHTML = randomCountry; // show the random country on webpage
})


// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

// Click event handler for 'Check Answer' button
submitButton.addEventListener("click", () => {
    let userAnswer = userAnswerElement.value; // save user answer into variable

    // get official code for country randomly shown
    let countryCode = countriesAndCodes[randomNumber]["alpha-2"];
    console.log(countryCode);

    // generate random API based on the country generated passing the countryCode
    let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    // fetch json data from API url generated for the chosen country
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
})

// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
