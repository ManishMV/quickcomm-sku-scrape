
# QuickComm Brand SKU Scraper - Chrome Extension

A Chrome extension for extracting SKU-level availability data from e-commerce platforms like Zepto, BlinkIt, and Swiggy Instamart.

## Installation Instructions

### Method 1: Install from Chrome Web Store (Recommended)
1. Visit the Chrome Web Store
2. Search for "QuickComm Brand SKU Scraper"
3. Click "Add to Chrome"
4. Click "Add extension" to confirm

### Method 2: Install from Source (Developer Mode)
1. Download and extract the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the extension folder containing the manifest.json file
6. The extension will be installed and ready to use

## Usage Instructions

### Getting Started
1. Click the extension icon in your Chrome toolbar
2. The popup window will open (380x600px)
3. Fill out the required form fields

### Form Fields
- **Your Name**: Enter your full name
- **Your email (company email)**: Use your work email (personal emails like Gmail are not accepted)
- **Your LinkedIn profile link**: Provide your LinkedIn profile URL
- **Platform**: Select from Zepto, BlinkIt, or Swiggy Instamart
- **Products**: Navigate to product pages and click "Add Product" to capture URLs (up to 5 products)
- **City**: Enter your city
- **Book your results call**: Click to open Calendly and book a results call (required)

### Adding Products
1. Navigate to a product page on your selected platform
2. Click the "Add Product" button in the extension popup
3. The current page URL will be captured automatically
4. Repeat for up to 5 products
5. Remove products by clicking the trash icon

### Submitting Your Request
1. Ensure all required fields are completed
2. The submit button will be enabled when all requirements are met
3. Click "Submit Request"
4. You'll receive a confirmation message
5. Your SKU-level availability report will be sent to your email within 30 minutes

## Technical Features

### File Structure
```
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css            # Styling (380x600px optimized)
├── popup.js             # Form handling and validation
├── content.js           # Web page interaction
├── background.js        # Background processes
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

### Key Features
- **Responsive Design**: Optimized for 380x600px popup window
- **Form Validation**: Real-time validation with email format checking
- **URL Capture**: Automatic current page URL extraction
- **Product Management**: Add/remove up to 5 product URLs
- **Calendly Integration**: Direct booking link integration
- **Success Feedback**: Clear confirmation messages
- **Storage**: Local storage for form data persistence

### Permissions Required
- `activeTab`: Access current tab URL for product capture
- `storage`: Store form data and user preferences

### Supported Platforms
- Zepto
- BlinkIt (formerly Grofers)
- Swiggy Instamart

## Development

### Building from Source
1. Clone the repository
2. Make your changes to the source files
3. Test in developer mode
4. Package for distribution

### Customization
- **Styling**: Modify `popup.css` for visual changes
- **Functionality**: Update `popup.js` for form behavior
- **Platform Support**: Extend `content.js` for additional platforms
- **API Integration**: Modify `background.js` for backend connectivity

### Testing
1. Load extension in developer mode
2. Navigate to supported platform product pages
3. Test form validation and submission
4. Verify URL capture functionality
5. Test success/error states

## Support

For support or feature requests:
- Visit: https://www.revq.in/contact-us
- Contact: RevQ India team

## Version History

### v1.0.0
- Initial release
- Basic form functionality
- URL capture capability
- Platform selection
- Calendly integration
- Email validation

## License

© 2024 RevQ India. All rights reserved.
