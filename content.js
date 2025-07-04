
// Content script for QuickComm Brand SKU Scraper
// This script runs on web pages to extract product information

class SkuScraperContent {
    constructor() {
        this.init();
    }

    init() {
        // Listen for messages from popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getCurrentUrl') {
                sendResponse({ url: window.location.href });
            } else if (request.action === 'extractProductData') {
                const productData = this.extractProductData();
                sendResponse(productData);
            }
        });
    }

    extractProductData() {
        // Extract product information from the current page
        // This can be customized based on the platform
        
        const productData = {
            url: window.location.href,
            title: document.title,
            platform: this.detectPlatform(),
            timestamp: new Date().toISOString()
        };

        // Try to extract product-specific information
        try {
            // Common selectors for product pages
            const selectors = {
                title: ['h1', '.product-title', '[data-testid="product-title"]'],
                price: ['.price', '.product-price', '[data-testid="price"]'],
                availability: ['.availability', '.stock-status', '[data-testid="availability"]']
            };

            for (const [key, selectorList] of Object.entries(selectors)) {
                for (const selector of selectorList) {
                    const element = document.querySelector(selector);
                    if (element) {
                        productData[key] = element.textContent.trim();
                        break;
                    }
                }
            }
        } catch (error) {
            console.error('Error extracting product data:', error);
        }

        return productData;
    }

    detectPlatform() {
        const hostname = window.location.hostname.toLowerCase();
        
        if (hostname.includes('zepto')) return 'zepto';
        if (hostname.includes('blinkit') || hostname.includes('grofers')) return 'blinkit';
        if (hostname.includes('swiggy')) return 'swiggy-instamart';
        
        return 'unknown';
    }
}

// Initialize content script
new SkuScraperContent();
