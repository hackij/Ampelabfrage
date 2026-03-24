const signalConfig = {
  red: {
    title: "Rot",
    description: "Ich brauche Hilfe.",
    cssClass: "is-red",
    color: "#d64541",
  },
  yellow: {
    title: "Gelb",
    description: "Ich bin unsicher.",
    cssClass: "is-yellow",
    color: "#e0a800",
  },
  green: {
    title: "Gruen",
    description: "Ich komme gut mit.",
    cssClass: "is-green",
    color: "#2f9e44",
  },
};

const storageKey = "ampelabfrage-selection";
const displayPanel = document.querySelector("#displayPanel");
const displaySignal = document.querySelector("#displaySignal");
const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDescription");
const timestamp = document.querySelector("#timestamp");
const fullscreenButton = document.querySelector("#fullscreenButton");
const resetButton = document.querySelector("#resetButton");
const signalButtons = document.querySelectorAll("[data-signal]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function clearStateClasses() {
  displayPanel.classList.remove("is-idle", "is-red", "is-yellow", "is-green");
}

function setThemeColor(color) {
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", color);
  }
}

function setSignal(signalName) {
  const signal = signalConfig[signalName];

  if (!signal) {
    return;
  }

  clearStateClasses();
  displayPanel.classList.add(signal.cssClass);
  displaySignal.style.background = signal.color;
  displayTitle.textContent = signal.title;
  displayDescription.textContent = signal.description;
  timestamp.textContent = `Gewahlt um ${formatTimestamp(new Date())} Uhr`;
  setThemeColor(signal.color);
  localStorage.setItem(storageKey, signalName);
}

function resetSignal() {
  clearStateClasses();
  displayPanel.classList.add("is-idle");
  displaySignal.style.background = "rgba(255, 255, 255, 0.28)";
  displayTitle.textContent = "Noch keine Farbe gewahlt";
  displayDescription.textContent =
    "Tippe auf eine Ampelfarbe. Danach kann das Handy hochgehalten werden.";
  timestamp.textContent = "Bereit";
  setThemeColor("#4b5d67");
  localStorage.removeItem(storageKey);
}

async function enableFullscreen() {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
  }
}

signalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSignal(button.dataset.signal);
  });
});

resetButton.addEventListener("click", resetSignal);

fullscreenButton.addEventListener("click", () => {
  enableFullscreen().catch(() => {
    timestamp.textContent = "Vollbild wird auf diesem Gerat nicht unterstutzt.";
  });
});

const savedSignal = localStorage.getItem(storageKey);

if (savedSignal && signalConfig[savedSignal]) {
  setSignal(savedSignal);
} else {
  resetSignal();
}
