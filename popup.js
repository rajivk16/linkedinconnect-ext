// Listen for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the start button
  const startButton = document.getElementById("startButton");

  // Add a click event listener to the start button
  startButton.addEventListener("click", function () {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];

      // Send a message to the content script to start the process
      chrome.tabs.sendMessage(
        tab.id,
        { message: "start" },
        function (response) {
          // Check for errors
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }

          // Log success message
          console.log("Start button clicked 👍");
        }
      );
    });
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Handle messages
  switch (request.message) {
    case "click_connect":
      // Perform necessary actions here, such as logging or updating the UI
      console.log("Connect button clicked from content script");
      break;
    default:
      console.warn("Unknown message received:", request);
      break;
  }

  // Send response
  sendResponse({ success: true });
});

// Handle errors
chrome.runtime.lastError && console.error(chrome.runtime.lastError.message);

{
  /* <button aria-label="Invite Vijay Langdapure to connect" id="ember115" class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"><!---->
<span class="artdeco-button__text">
    Connect
</span></button> */
}
