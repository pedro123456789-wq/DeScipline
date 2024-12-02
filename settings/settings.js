document.addEventListener('DOMContentLoaded', function() {
    var enableFeatureCheckbox = document.getElementById('enableFeature');
    
    // Load saved setting
    chrome.storage.sync.get(['enableFeature'], function(result) {
      enableFeatureCheckbox.checked = result.enableFeature || false;
    });
  
    // Save setting when changed
    enableFeatureCheckbox.addEventListener('change', function() {
      chrome.storage.sync.set({enableFeature: this.checked}, function() {
        console.log('Setting saved');
      });
    });
  });
  
  