let starknet;
let wallet;
let account;

async function connectWallet(provider) {
    try {
        // Check if wallet is installed
        if (provider === 'argentX') {
            if (!window.starknet_argentX) {
                window.open('https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb', '_blank');
                return;
            }
            starknet = window.starknet_argentX;
        } else if (provider === 'braavos') {
            if (!window.starknet_braavos) {
                window.open('https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma', '_blank');
                return;
            }
            starknet = window.starknet_braavos;
        }

        // Request wallet connection
        const walletResponse = await starknet.enable();
        
        if (walletResponse) {
            account = walletResponse[0]; // Get the first account
            updateConnectionStatus(true);
            await updateWalletInfo();
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        updateConnectionStatus(false, error.message);
    }
}

async function updateWalletInfo() {
    if (!account) return;

    const walletInfo = document.getElementById('wallet-info');
    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');

    // Show wallet info section
    walletInfo.style.display = 'block';

    // Update address (truncate for display)
    const truncatedAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
    addressElement.textContent = truncatedAddress;
    addressElement.title = account; // Full address on hover

    try {
        // Get balance (example, adjust based on your needs)
        const balance = await starknet.provider.getBalance({
            contractAddress: account,
            blockIdentifier: 'latest'
        });
        
        // Convert balance to ETH (assuming 18 decimals)
        const ethBalance = balance.toString() / (10 ** 18);
        balanceElement.textContent = `${ethBalance.toFixed(4)} ETH`;
    } catch (error) {
        console.error('Error getting balance:', error);
        balanceElement.textContent = 'Error loading balance';
    }
}

function updateConnectionStatus(connected, errorMessage = '') {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');

    if (connected) {
        statusDot.classList.add('connected');
        statusText.textContent = 'Connected';
    } else {
        statusDot.classList.remove('connected');
        statusText.textContent = errorMessage || 'Not Connected';
    }
}

// Event Listeners
document.getElementById('connect-argent').addEventListener('click', () => connectWallet('argentX'));
document.getElementById('connect-braavos').addEventListener('click', () => connectWallet('braavos'));

// Check initial connection status
document.addEventListener('DOMContentLoaded', async () => {
    // Try to reconnect if previously connected
    if (window.starknet_argentX?.isConnected || window.starknet_braavos?.isConnected) {
        const provider = window.starknet_argentX?.isConnected ? 'argentX' : 'braavos';
        await connectWallet(provider);
    }
});
