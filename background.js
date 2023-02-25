chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to popup window");

  // Send a message to the popup window when the connection is established
  port.postMessage({ connected: true });

  // Listen for messages from the popup window
  port.onMessage.addListener(function (request) {
    if (request.message === "start") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "start" });
      });
    }
  });
});