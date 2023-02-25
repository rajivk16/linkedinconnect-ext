document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "start" });
    });
    console.log("Start button clicked 👍");
  });
});


{/* <button aria-label="Invite Vijay Langdapure to connect" id="ember115" class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"><!---->
<span class="artdeco-button__text">
    Connect
</span></button> */}