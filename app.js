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
    title: "Grün",
    cssClass: "is-green",
    color: "#2f9e44",
  },
};

const controlPanel = document.querySelector("#controlPanel");
const displayPanel = document.querySelector("#displayPanel");
const signalButtons = document.querySelectorAll("[data-signal]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const rootElement = document.documentElement;

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
  rootElement.classList.remove("signal-red", "signal-yellow", "signal-green");
  document.body.classList.remove("signal-red", "signal-yellow", "signal-green");
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
  rootElement.classList.remove("signal-red", "signal-yellow", "signal-green");
  document.body.classList.remove("signal-red", "signal-yellow", "signal-green");
  rootElement.classList.add(`signal-${signalName}`);
  document.body.classList.add(`signal-${signalName}`);
  setThemeColor(signal.color);
}

function handleOverlayInteraction(event) {
  event.preventDefault();
  showSelection();
}

signalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSignal(button.dataset.signal);
  });
});

displayPanel.addEventListener("click", handleOverlayInteraction);
displayPanel.addEventListener("pointerup", handleOverlayInteraction);
displayPanel.addEventListener("touchend", handleOverlayInteraction, { passive: false });

displayPanel.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showSelection();
  }
});

showSelection();
