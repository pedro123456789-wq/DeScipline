document.addEventListener('DOMContentLoaded', function() {
    const mainPage = document.getElementById('main-page');
    const secondPage = document.getElementById('second-page');
    const actionButton = document.getElementById('actionButton');
    const statusDiv = document.getElementById('status');
    const goToSecondPageButton = document.getElementById('goToSecondPage');
    const backToMainButton = document.getElementById('backToMain');
    const optionsButton = document.getElementById('optionsButton');
    const aboutButton = document.getElementById('aboutButton');
  
    // Navigation
    goToSecondPageButton.addEventListener('click', function() {
      mainPage.style.display = 'none';
      secondPage.style.display = 'flex';
    });
  
    backToMainButton.addEventListener('click', function() {
      secondPage.style.display = 'none';
      mainPage.style.display = 'flex';
    });
  
    // Action button functionality
    actionButton.addEventListener('click', function() {
      statusDiv.textContent = 'Processing...';
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (chrome.runtime.lastError) {
          console.error('Error querying tabs:', chrome.runtime.lastError);
          statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
          return;
        }
  
        if (!tabs || tabs.length === 0) {
          console.error('No tabs found');
          statusDiv.textContent = 'Error: No active tab found';
          return;
        }
  
        const currentTab = tabs[0];
        if (currentTab.url.startsWith('chrome://') || currentTab.url.startsWith('chrome-extension://')) {
          console.error('Cannot access chrome:// or chrome-extension:// URLs');
          statusDiv.textContent = 'Error: Cannot modify this page';
          return;
        }
  
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: function() {
            document.body.style.backgroundColor = '#f0f0f0';
            return 'Background color changed!';
          }
        }, function(results) {
          if (chrome.runtime.lastError) {
            console.error('Error executing script:', chrome.runtime.lastError);
            statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
          } else if (results && results[0]) {
            statusDiv.textContent = results[0].result;
          } else {
            statusDiv.textContent = 'Unknown error occurred';
          }
        });
      });
    });
  
    // Options and About buttons
    optionsButton.addEventListener('click', function() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    });
  
    aboutButton.addEventListener('click', function() {
      chrome.tabs.create({url: chrome.runtime.getURL('about/about.html')});
    });
  });
  
  