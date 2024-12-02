document.addEventListener('DOMContentLoaded', function() {
    const mainPage = document.getElementById('main-page');
    const secondPage = document.getElementById('second-page');
    const actionButton = document.getElementById('actionButton');
    const statusDiv = document.getElementById('status');
    const goToSecondPageButton = document.getElementById('goToSecondPage');
    const backToMainButton = document.getElementById('backToMain');
  
    // Navigation
    goToSecondPageButton.addEventListener('click', function() {
      mainPage.style.display = 'none';
      secondPage.style.display = 'block';
    });
  
    backToMainButton.addEventListener('click', function() {
      secondPage.style.display = 'none';
      mainPage.style.display = 'block';
    });
  
    // Action button functionality
    actionButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: function() {
            document.body.style.backgroundColor = '#f0f0f0';
            return 'Background color changed!';
          }
        }, function(results) {
          statusDiv.textContent = results[0].result;
        });
      });
    });
  });
  
  