// Listen for connections from the popup window
chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to popup window");

  // Send a message to the popup window when the connection is established
  port.postMessage({ connected: true });

  // Listen for messages from the popup window
  port.onMessage.addListener(function (request) {
    if (request.message === "start") {
      // Send a message to the content script to start the process
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Check if there is an active tab
        if (!tabs || tabs.length === 0) {
          console.error("No active tab found.");
          return;
        }

        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: "start" },
          function (response) {
            // Check for errors in response
            if (chrome.runtime.lastError) {
              console.error(
                "Error sending message to content script:",
                chrome.runtime.lastError.message
              );
              return;
            }

            // Check for errors in response from content script
            if (response && response.error) {
              console.error("Error from content script:", response.error);
              return;
            }
          }
        );
      });
    }
  });
});

// Listen for messages from the content_script.js file
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.message === "click_connect") {
    // Perform necessary actions here, such as logging or updating the UI
    console.log("Connect button clicked from content script");
  }
});
// chrome.runtime.onConnect.addListener((port) => {
//   console.log("Connected to popup window");

//   // Send a message to the popup window when the connection is established
//   port.postMessage({ connected: true });

//   // Listen for messages from the popup window
//   port.onMessage.addListener(function (request) {
//     if (request.message === "start") {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { message: "start" });
//       });
//     }
//   });
// });
