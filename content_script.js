if (
  window.location.href.indexOf(
    "https://www.linkedin.com/search/results/people"
  ) === -1
) {
  // If the user is not on the search results page, log an error message
  console.error("This script only works on LinkedIn search results pages");
} else {
  // Listen for messages from the popup window
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message === "start") {
      // Find all connect buttons on the page
      const connectButtons = document.getElementsByClassName(
        "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"
      );
      // Convert the HTMLCollection to an array and slice it to get the desired elements
      const selectedElements = Array.prototype.slice.call(
        connectButtons,
        2,
        12
      );
      console.log(selectedElements.length);
      const delay = Math.floor(Math.random() * 6000) + 1000; // random delay between 5-10 seconds
      let count = 0;
      //  Clicks the connect button, waits for 3 seconds, clicks the send now button, sends a
      //  message to the background script, increments the count, and calls the function again
      const clickButton = function (index) {
        selectedElements[index].click();
        setTimeout(() => {
          // Find and click the send now button
          const sendButton = document.querySelector(
            'button[aria-label="Send now"]'
          );
        // The above code is clicking the connect button on the linkedin profile.
          if (sendButton) {
            sendButton.click();
            console.log(index, "Connect Button Clicked 🚀");
            chrome.runtime.sendMessage({ message: "click_connect" });
            count++;
          } else {
            console.error("Send button not found");
          }
          if (index < selectedElements.length - 1) {
            setTimeout(() => clickButton(index + 1), delay);
          } else {
            console.log(count, "Connect Buttons Clicked 🚀");
          }
        }, 1000);
      };
      clickButton(0);
    }
  });
}

