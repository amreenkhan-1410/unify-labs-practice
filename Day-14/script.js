// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;
const maxAttempts = 5;

function checkGuess() {
  const userGuess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const attemptsText = document.getElementById("attempts");

  attempts++;

  if (userGuess === randomNumber) {
    message.textContent = "🎉 Correct! You guessed the number!";
    message.style.color = "green";
    attemptsText.textContent = `Attempts used: ${attempts}`;
  } 
  else if (attempts >= maxAttempts) {
    message.textContent = `❌ Game Over! The number was ${randomNumber}`;
    message.style.color = "red";
    attemptsText.textContent = `Attempts used: ${attempts}`;
  } 
  else if (userGuess > randomNumber) {
    message.textContent = "📉 Too High! Try again.";
    message.style.color = "orange";
    attemptsText.textContent = `Attempts left: ${maxAttempts - attempts}`;
  } 
  else {
    message.textContent = "📈 Too Low! Try again.";
    message.style.color = "orange";
    attemptsText.textContent = `Attempts left: ${maxAttempts - attempts}`;
  }
}

