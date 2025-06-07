// Array to hold all card names
const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// Mapping for days of the week with corresponding colors
const dayMapping = ["R", "O", "Y", "G", "B", "V", "I"];
const dayColors = [
  "day-r",
  "day-o",
  "day-y",
  "day-g",
  "day-b",
  "day-v",
  "day-i",
];

// Function to create and display the card for the current date
function displayCard(selectedDate) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear previous card

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // Months are 0-indexed
  const day = selectedDate.getDate();

  // Check if it's February 29th and a leap year
  if (isLeapYear(year) && month === 2 && day === 29) {
    displayJoker("red");
    return;
  }

  // Check if it's December 31st
  if (month === 12 && day === 31) {
    displayJoker("black");
    return;
  }

  // Calculate day of the year, adjusting for leap year if month exceeds February
  const startOfYear = new Date(year, 0, 0);
  let diff = selectedDate - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;

  // Adjust for leap year if month exceeds February
  if (isLeapYear(year) && month > 2) {
    diff -= oneDay;
  }

  const dayOfYear = Math.floor(diff / oneDay);
  const weekNumber = Math.ceil(dayOfYear / 7);

  // Calculate the day of the week (1-7 where 1 is Monday and 7 is Sunday)
  const dayOfWeek = ((selectedDate.getDay() + 6) % 7) + 1; // Adjusting getDay() to start with Monday

  displayRegularCard(weekNumber, dayOfWeek);
}

// Function to display a regular card based on the week number and day of the week
function displayRegularCard(weekNumber, dayOfWeek) {
  const cardContainer = document.getElementById("cardContainer");

  // Calculate card number based on the week of the year
  const cardNumber = weekNumber - 1; // Adjust for zero-based index

  const suitIndex = Math.floor(cardNumber / ranks.length);
  const rankIndex = cardNumber % ranks.length;

  const suit = suits[suitIndex];
  const rank = ranks[rankIndex];

  // Create a new card element
  const card = document.createElement("div");
  card.className = `card ${suit}`;

  // Create elements for rank and suit
  const rankElement = document.createElement("div");
  rankElement.className = "rank";
  rankElement.textContent = rank;

  const suitElement = document.createElement("div");
  suitElement.className = "suit";
  suitElement.innerHTML = getSymbol(suit);

  // Append rank and suit elements to card
  card.appendChild(rankElement);
  card.appendChild(suitElement);

  // Append the card to the card container
  cardContainer.appendChild(card);

  // Update week result display with color
  const weekResult = document.getElementById("weekResult");
  weekResult.textContent = `Week ${weekNumber}, Day ${
    dayMapping[dayOfWeek - 1]
  }`;
  weekResult.className = dayColors[dayOfWeek - 1]; // Apply color class based on day
}

// Function to display a joker card with specified color
function displayJoker(color) {
  const cardContainer = document.getElementById("cardContainer");

  // Create a joker card element
  const joker = document.createElement("div");
  joker.className = `card joker`;
  joker.innerHTML = `<span class="${color}">Joker</span>`;

  // Append the joker card to the card container
  cardContainer.appendChild(joker);

  // Update week result display
  const weekResult = document.getElementById("weekResult");
  weekResult.textContent = `${
    color.charAt(0).toUpperCase() + color.slice(1)
  } Joker Day`;
  weekResult.className = ""; // Remove any previous color class
}

// Helper function to get the symbol for each suit
function getSymbol(suit) {
  switch (suit) {
    case "hearts":
      return "&hearts;";
    case "diamonds":
      return "&diams;";
    case "clubs":
      return "&clubs;";
    case "spades":
      return "&spades;";
    default:
      return "";
  }
}

// Modify the displayZodiacSign function to show the element, symbol, ruling planet, details, and characteristics of the zodiac sign when the "More" button is clicked
function displayZodiacSign(date) {
  const zodiacContainer = document.getElementById("zodiacContainer");
  zodiacContainer.innerHTML = ""; // Clear previous zodiac sign

  const zodiac = getZodiacSign(date);
  if (zodiac) {
    const zodiacDetails = `
       <div class="zodiac-sign-top">
       <p>Zodiac Sign: ${zodiac.name} ${zodiac.symbol}</p>
       <button id="zodiacDetailsBtn" data-details='{"element":"${zodiac.element}", "rulingPlanet":"${zodiac.rulingPlanet}", "details":"${zodiac.details}", "characteristics":"${zodiac.characteristics}"}'>More</button>
       </div>
       <div id="zodiacDetails" class="zodiac-sign-bottom" style="display:none;">
         <p>Element: ${zodiac.element}</p>
         <p>Ruling Planet: ${zodiac.rulingPlanet}</p>
         <p>Details: ${zodiac.details}</p>
         <p>Characteristics: ${zodiac.characteristics}</p>
       </div>
     `;
    zodiacContainer.innerHTML = zodiacDetails;

    const zodiacDetailsBtn = document.getElementById("zodiacDetailsBtn");
    zodiacDetailsBtn.addEventListener("click", showZodiacDetails);
  } else {
    zodiacContainer.textContent = "No zodiac sign found for this date.";
  }
}

// Function to show zodiac details
function showZodiacDetails() {
  const zodiacDetails = document.getElementById("zodiacDetails");
  if (zodiacDetails.style.display === "none") {
    zodiacDetails.style.display = "block";
  } else {
    zodiacDetails.style.display = "none";
  }
}

// Function to get zodiac sign based on date
function getZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  for (const sign of zodiacSigns) {
    if (
      (dateString >= sign.start && dateString <= sign.end) ||
      (sign.start > sign.end &&
        (dateString >= sign.start || dateString <= sign.end))
    ) {
      return sign;
    }
  }
  return null;
}

// Modify the calculateCard function to include displaying the zodiac sign
function calculateCard() {
  const dateInput = document.getElementById("dateInput").value;
  const selectedDate = new Date(dateInput);

  if (!isNaN(selectedDate.getTime())) {
    // Check if date is valid
    displayCard(selectedDate);
    displayZodiacSign(selectedDate); // Display the zodiac sign
  } else {
    alert("Please enter a valid date.");
  }
}

// Add event listener to handle Enter key
document
  .getElementById("dateInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter key action (like form submission)
      calculateCard(); // Call the function to calculate and display the card and zodiac sign
    }
  });

let zodiacSigns = {};

fetch("data/zodiac.json")
  .then((response) => response.json())
  .then((data) => {
    zodiacSigns = data;
    const today = new Date();
    displayCard(today);
    displayZodiacSign(today);
  })
  .catch((error) => {
    console.error("Error loading zodiac symbols:", error);
  });
