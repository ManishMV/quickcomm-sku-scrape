
class SkuScraperPopup {
    constructor() {
        this.formData = {
            name: '',
            email: '',
            linkedin: '',
            platform: '',
            city: '',
            calendlyBooked: false
        };
        this.productUrls = [];
        this.isLoading = false;
        this.isSubmitted = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
    }

    bindEvents() {
        // Close button
        document.getElementById('closeBtn').addEventListener('click', () => {
            window.close();
        });

        // Form inputs
        document.getElementById('name').addEventListener('input', (e) => {
            this.formData.name = e.target.value;
            this.updateSubmitButton();
        });

        document.getElementById('email').addEventListener('input', (e) => {
            this.formData.email = e.target.value;
            this.validateEmail(e.target.value);
            this.updateSubmitButton();
        });

        document.getElementById('linkedin').addEventListener('input', (e) => {
            this.formData.linkedin = e.target.value;
            this.updateSubmitButton();
        });

        document.getElementById('platform').addEventListener('change', (e) => {
            this.formData.platform = e.target.value;
            this.updateSubmitButton();
        });

        document.getElementById('city').addEventListener('input', (e) => {
            this.formData.city = e.target.value;
            this.updateSubmitButton();
        });

        // Add product button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.addCurrentPageUrl();
        });

        // Calendly button
        document.getElementById('calendlyBtn').addEventListener('click', () => {
            this.handleCalendlyClick();
        });

        // Form submission
        document.getElementById('skuForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Submit another request
        document.getElementById('submitAnotherBtn').addEventListener('click', () => {
            this.resetForm();
        });
    }

    validateEmail(email) {
        const workEmailPattern = /^[^\s@]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)[^\s@]+\.[^\s@]+$/i;
        const emailError = document.getElementById('emailError');
        const emailInput = document.getElementById('email');
        
        if (email && !workEmailPattern.test(email)) {
            emailError.classList.remove('hidden');
            emailInput.style.borderColor = '#dc2626';
            return false;
        } else {
            emailError.classList.add('hidden');
            emailInput.style.borderColor = '#d1d5db';
            return true;
        }
    }

    async addCurrentPageUrl() {
        if (this.productUrls.length >= 5) return;

        try {
            // Get current tab URL
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const currentUrl = tab.url;
            
            // Check if URL is already added
            if (this.productUrls.some(product => product.url === currentUrl)) {
                alert('This URL is already added!');
                return;
            }

            const newProduct = {
                id: Date.now().toString(),
                url: currentUrl
            };
            
            this.productUrls.push(newProduct);
            this.updateProductsList();
            this.updateSubmitButton();
        } catch (error) {
            console.error('Error getting current tab URL:', error);
            // Fallback for development
            const newProduct = {
                id: Date.now().toString(),
                url: window.location.href
            };
            this.productUrls.push(newProduct);
            this.updateProductsList();
            this.updateSubmitButton();
        }
    }

    removeProductUrl(id) {
        this.productUrls = this.productUrls.filter(product => product.id !== id);
        this.updateProductsList();
        this.updateSubmitButton();
    }

    updateProductsList() {
        const productsList = document.getElementById('productsList');
        const productPlaceholder = document.getElementById('productPlaceholder');
        const productCount = document.getElementById('productCount');
        const addProductBtn = document.getElementById('addProductBtn');

        productCount.textContent = this.productUrls.length;
        
        if (this.productUrls.length === 0) {
            productPlaceholder.classList.remove('hidden');
            productsList.innerHTML = '';
        } else {
            productPlaceholder.classList.add('hidden');
            productsList.innerHTML = this.productUrls.map(product => `
                <div class="product-item">
                    <span class="product-url">${product.url}</span>
                    <button type="button" class="remove-product" onclick="skuScraper.removeProductUrl('${product.id}')">
                        🗑️
                    </button>
                </div>
            `).join('');
        }

        addProductBtn.disabled = this.productUrls.length >= 5;
        if (this.productUrls.length >= 5) {
            addProductBtn.style.opacity = '0.5';
            addProductBtn.style.cursor = 'not-allowed';
        } else {
            addProductBtn.style.opacity = '1';
            addProductBtn.style.cursor = 'pointer';
        }
    }

    handleCalendlyClick() {
        // Open Calendly in new tab
        window.open('https://calendly.com/dummy-link', '_blank');
        this.formData.calendlyBooked = true;
        
        // Update button
        const calendlyBtn = document.getElementById('calendlyBtn');
        const calendlyText = document.getElementById('calendlyText');
        
        calendlyText.textContent = 'Call Booked ✓';
        calendlyBtn.disabled = true;
        calendlyBtn.style.opacity = '0.7';
        
        this.updateSubmitButton();
    }

    async handleSubmit() {
        if (!this.isFormValid()) return;

        this.isLoading = true;
        this.updateSubmitButton();

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Store email for success message
            const email = this.formData.email;
            
            // Show success state
            this.showSuccessState(email);
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            this.isLoading = false;
            this.updateSubmitButton();
        }
    }

    showSuccessState(email) {
        document.getElementById('formContent').classList.add('hidden');
        document.getElementById('successState').classList.remove('hidden');
        document.getElementById('successEmail').textContent = email;
        this.isSubmitted = true;
    }

    resetForm() {
        // Reset form data
        this.formData = {
            name: '',
            email: '',
            linkedin: '',
            platform: '',
            city: '',
            calendlyBooked: false
        };
        this.productUrls = [];
        this.isSubmitted = false;
        this.isLoading = false;

        // Reset form inputs
        document.getElementById('skuForm').reset();
        
        // Reset calendly button
        const calendlyBtn = document.getElementById('calendlyBtn');
        const calendlyText = document.getElementById('calendlyText');
        calendlyText.textContent = 'Book Call';
        calendlyBtn.disabled = false;
        calendlyBtn.style.opacity = '1';

        // Update UI
        this.updateProductsList();
        this.updateSubmitButton();
        
        // Show form content
        document.getElementById('successState').classList.add('hidden');
        document.getElementById('formContent').classList.remove('hidden');
    }

    isFormValid() {
        const emailValid = this.validateEmail(this.formData.email);
        return (
            this.formData.name &&
            this.formData.email &&
            emailValid &&
            this.formData.linkedin &&
            this.formData.platform &&
            this.formData.city &&
            this.formData.calendlyBooked &&
            this.productUrls.length > 0
        );
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const loadingSpinner = document.getElementById('loadingSpinner');
        
        if (this.isLoading) {
            submitText.textContent = 'Submitting...';
            loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
        } else {
            submitText.textContent = 'Submit Request';
            loadingSpinner.classList.add('hidden');
            submitBtn.disabled = !this.isFormValid();
        }
    }

    updateUI() {
        this.updateProductsList();
        this.updateSubmitButton();
    }
}

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.skuScraper = new SkuScraperPopup();
});
