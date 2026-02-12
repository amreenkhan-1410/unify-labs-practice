console.log("Lab Session 16 Started");

const display = document.getElementById("display");


// 1️⃣ Title Case Function
function toTitleCase(str) {
    return str
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}


// 2️⃣ Count Vowels Function
function countVowels(str) {
    const vowels = "aeiou";
    let count = 0;

    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}


// 3️⃣ Secret Message Generator
function secretMessage(str) {
    const bannedWords = ["secret", "money", "password"];

    return str
        .split(" ")
        .map(word =>
            bannedWords.includes(word.toLowerCase())
                ? "***"
                : word
        )
        .join(" ");
}


// Example Input
const inputText = "   this is my secret password and money plan   ";

const titleResult = toTitleCase(inputText);
const vowelResult = countVowels(inputText);
const secretResult = secretMessage(inputText);


// Display Output
display.innerText =
`Title Case: ${titleResult}

Vowel Count: ${vowelResult}

Secret Message: ${secretResult}`;