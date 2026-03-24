const signalConfig = {
  red: {
    title: "Rot",
    cssClass: "is-red",
    color: "#d64541",
  },
  yellow: {
    title: "Gelb",
    cssClass: "is-yellow",
    color: "#e0a800",
  },
  green: {
    title: "Gruen",
    cssClass: "is-green",
    color: "#2f9e44",
  },
};

const controlPanel = document.querySelector("#controlPanel");
const displayPanel = document.querySelector("#displayPanel");
const displaySurface = document.querySelector("#displaySurface");
const signalButtons = document.querySelectorAll("[data-signal]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function clearStateClasses() {
  displayPanel.classList.remove("is-idle", "is-red", "is-yellow", "is-green");
}

function setThemeColor(color) {
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", color);
  }
}

function showSelection() {
  clearStateClasses();
  displayPanel.classList.add("is-idle");
  controlPanel.hidden = false;
  displayPanel.hidden = true;
  document.body.style.overflow = "";
  setThemeColor("#4b5d67");
}

function showSignal(signalName) {
  const signal = signalConfig[signalName];

  if (!signal) {
    return;
  }

  clearStateClasses();
  displayPanel.classList.add(signal.cssClass);
  controlPanel.hidden = true;
  displayPanel.hidden = false;
  document.body.style.overflow = "hidden";
  setThemeColor(signal.color);
}

signalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSignal(button.dataset.signal);
  });
});

function returnToSelection() {
  showSelection();
}

displayPanel.addEventListener("click", returnToSelection);

displaySurface.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    returnToSelection();
  }
});

showSelection();
