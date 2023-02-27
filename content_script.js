const scrollIntoView = (element) => {
  const rect = element.getBoundingClientRect();
  const top = rect.top + window.pageYOffset;
  const middle = top - window.innerHeight / 2 + rect.height / 2;
  window.scrollTo(0, middle);
};

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
        const buttonText = selectedElements[index].innerText.trim();

        if (buttonText === "Follow" || buttonText === "Connect") {
          if (buttonText === "Connect") {
            selectedElements[index].click();
            setTimeout(() => {
              // Find and click the send now button
              const sendButton = document.querySelector(
                'button[aria-label="Send now"]'
              );

              if (sendButton) {
                sendButton.click();
                console.log(index, "Connect Button Clicked 🚀");
                chrome.runtime.sendMessage({ message: "click_connect" });
                count++;
              } else {
                console.error("Send button not found");
              }
            }, 1000);
          } else {
            // buttonText === "Follow"
            console.log(index, "Follow Button Clicked 🚀");
            selectedElements[index].click();
            count++;
          }
        } else {
          console.log(index, "Button Skipped ❌");
        }

        if (index < selectedElements.length - 1) {
          setTimeout(() => clickButton(index + 1), delay);
        } else {
          console.log(count, "Buttons Clicked 🚀");
        }
      };

      clickButton(0);
    }
  });
}
