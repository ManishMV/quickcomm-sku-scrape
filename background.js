
// Background script for QuickComm Brand SKU Scraper

chrome.runtime.onInstalled.addListener(() => {
    console.log('QuickComm Brand SKU Scraper installed');
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'submitFormData') {
        // Handle form submission
        handleFormSubmission(request.data);
        sendResponse({ success: true });
    }
});

async function handleFormSubmission(formData) {
    try {
        // Store submission data
        await chrome.storage.local.set({
            lastSubmission: {
                ...formData,
                timestamp: new Date().toISOString()
            }
        });

        // Here you would typically send the data to your API
        console.log('Form data submitted:', formData);
        
        // You can add API integration here
        // const response = await fetch('https://your-api-endpoint.com/submit', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
        
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
}
