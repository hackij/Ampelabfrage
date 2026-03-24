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

const appShell = document.querySelector(".app-shell");
const controlPanel = document.querySelector("#controlPanel");
const displayPanel = document.querySelector("#displayPanel");
const displayTitle = document.querySelector("#displayTitle");
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

async function enableFullscreen() {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
  }
}

function showSelection() {
  clearStateClasses();
  displayPanel.classList.add("is-idle");
  controlPanel.hidden = false;
  displayPanel.hidden = true;
  appShell.classList.remove("display-mode");
  setThemeColor("#4b5d67");
}

async function showSignal(signalName) {
  const signal = signalConfig[signalName];

  if (!signal) {
    return;
  }

  clearStateClasses();
  displayPanel.classList.add(signal.cssClass);
  displayTitle.textContent = signal.title;
  controlPanel.hidden = true;
  displayPanel.hidden = false;
  appShell.classList.add("display-mode");
  setThemeColor(signal.color);
  try {
    await enableFullscreen();
  } catch {
    // Fullscreen is optional; the color view still works without it.
  }
}

signalButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    await showSignal(button.dataset.signal);
  });
});

displaySurface.addEventListener("click", async () => {
  if (document.fullscreenElement && document.exitFullscreen) {
    try {
      await document.exitFullscreen();
    } catch {
      // Ignore fullscreen exit failures and still return to the selection view.
    }
  }
  showSelection();
});

showSelection();
