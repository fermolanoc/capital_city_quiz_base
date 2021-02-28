let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let numberOfQuestionsElement = document.querySelector("#number-questions");
let pointsElement = document.querySelector("#points");
let playButton = document.querySelector("#play-again");

// console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 


let randomCountry;
let countryCode;
let randomCountryName;

// generate a random number between 0 and the length of the countriesAndCodes array.
// This number will be used as an index when getting random countries
function generateRandomCountry() {
    let randomNumber = Math.floor(Math.random() * countriesAndCodes.length);
    randomCountry = countriesAndCodes[randomNumber]; // get a random country from array
    randomCountryName = randomCountry.name
    countryCode = randomCountry["alpha-2"];
    // console.log(randomCountryName);
    // console.log(countryCode);
    return randomCountryName;
}

// print the random country name on the webpage
function getCountryName() {
    randomCountryElement.innerHTML = generateRandomCountry(); // show the random country on webpage
}


// when the page loads, select an element at random from the countriesAndCodes array
window.addEventListener("load", () => {
    getCountryName(); // call function to print random country's name on webpage

})



// count the number of questions and points collected by user
let numberOfQuestions = 0;
let correctAnswers = 0;
let points = 0;

// Click event handler for 'Check Answer' button
submitButton.addEventListener("click", () => {
    let userAnswer = userAnswerElement.value; // save user answer into variable


    // generate random API based on the country generated passing the countryCode
    let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;

    // fetch json data from API url generated for the chosen country
    fetch(url)
        .then(res => {
            return res.json(); // generate data in json format
        })
        .then(data => { // assign json results to 'data' variable
            let countryCapital = data[1][0].capitalCity; // get capital value of the random country

            numberOfQuestions++; // increase number of questions on 1
            userAnswerElement.setAttribute("disabled", true); // disable input element so user cannot modify answer


            // convert both user answer and capital city of the random country to lowercase to compare them
            // show message indicating wether answer is correct or wrong
            if (userAnswer.toLowerCase() === countryCapital.toLowerCase()) {
                points++; // if answer was correct, increase points on 1
                correctAnswers++; // increase correctAnswers on 1

                // print message on webpage
                resultTextElement.innerHTML = `Correct! The capital of ${randomCountryName} is ${countryCapital}`;
                numberOfQuestionsElement.innerHTML = `Questions: ${numberOfQuestions}<br/>Correct: ${correctAnswers}`;
                pointsElement.innerHTML = `Points: ${points}`;
            } else {
                points-- // if answer was wrong, decrease points on 1

                // print message on webpage
                resultTextElement.innerHTML = `Wrong! The capital of ${randomCountryName} is not ${userAnswer}; It is ${countryCapital}`;
                numberOfQuestionsElement.innerHTML = `Questions: ${numberOfQuestions}<br/>Correct: ${correctAnswers}`;
                pointsElement.innerHTML = `Points: ${points}`;
            }

            // style points message
            if (points < 0) {
                pointsElement.style.color = "tomato"
            } else if (points == 0) {
                pointsElement.style.color = "black"
            } else {
                pointsElement.style.color = "blueviolet"
            }
        })
        .catch(err => {
            alert("An error occurred getting the country's info", err);
            console.log(err);
        })
})


// Click event handler for play-again button
playButton.addEventListener("click", () => {
    // generate a new random country
    generateRandomCountry();

    // show it in the webpage
    getCountryName();

    // enable user to type an answer again
    userAnswerElement.removeAttribute("disabled");

    // clear user's answer and the result message
    userAnswerElement.value = "";
    resultTextElement.innerHTML = "";
})
