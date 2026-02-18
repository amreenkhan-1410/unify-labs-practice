const STORAGE_KEY = "userSettings";

const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");

// Load settings
function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : { theme: "light", language: "en" };
}

// Save settings
function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// Apply settings to UI
function applySettings(settings) {
  document.body.className = settings.theme;
  themeToggle.checked = settings.theme === "dark";
  languageSelect.value = settings.language;
}

let settings = loadSettings();
applySettings(settings);

// Event Listeners
themeToggle.addEventListener("change", () => {
  settings.theme = themeToggle.checked ? "dark" : "light";
  saveSettings(settings);
  applySettings(settings);
});

languageSelect.addEventListener("change", () => {
  settings.language = languageSelect.value;
  saveSettings(settings);
});
