if (
  window.location.href.indexOf("https://www.linkedin.com/search/results/PEOPLE") ===
  -1
) {
  // If the user is not on the search results page, do nothing
  console.log("This script only works on LinkedIn search results pages");
} else {
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.message === "start") {
      //   const connectButtons = document.querySelectorAll("#ember397 > span");
      const connectButtons = document.getElementsByClassName(
        "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"
      );
      const selectedElements = Array.prototype.slice.call(
        connectButtons,
        2,
        12
      );
      console.log(selectedElements.length);
      const delay = Math.floor(Math.random() * 6000) + 5000; // random delay between 5-10 seconds
      let index = 0;
      const clickButton = function () {
        if (index < selectedElements.length) {
          selectedElements[index].click();
          document.querySelector('button[aria-label="Send now"]').click();
          console.log(index, " Connect Button Clicked 🚀");
          index++;
          setTimeout(clickButton, delay);
        }
      };
      clickButton();
      console.log(index, " Connect Button Clicked 🚀");
    }
  });
}
