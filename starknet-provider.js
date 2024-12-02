// This file acts as a bridge between the extension and Starknet wallets
(() => {
    // Check for existing Starknet provider
    const checkForStarknet = () => {
        return window.starknet_argentX || window.starknet_braavos;
    };

    // Inject provider information into the page
    const injectStarknetInfo = () => {
        window.postMessage({
            type: 'STARKNET_INFO',
            hasStarknet: !!checkForStarknet(),
            provider: window.starknet_argentX ? 'argentX' : (window.starknet_braavos ? 'braavos' : null)
        }, '*');
    };

    // Listen for wallet changes
    const setupWalletListeners = () => {
        if (window.starknet_argentX) {
            window.starknet_argentX.on('accountsChanged', () => {
                injectStarknetInfo();
            });
        }
        if (window.starknet_braavos) {
            window.starknet_braavos.on('accountsChanged', () => {
                injectStarknetInfo();
            });
        }
    };

    // Initialize
    const init = () => {
        injectStarknetInfo();
        setupWalletListeners();
    };

    // Check periodically for wallet installation
    const checkInterval = setInterval(() => {
        if (checkForStarknet()) {
            clearInterval(checkInterval);
            init();
        }
    }, 1000);

    // Initial check
    if (checkForStarknet()) {
        init();
    }
})();
