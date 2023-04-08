const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile (optional)
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", (event) => {
  if (window.deferredPrompt) {
    // Show the prompt
    window.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      window.deferredPrompt = null;
    });
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Log the installation to analytics
  console.log("INSTALL: Success");
});
