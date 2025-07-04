
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, CheckCircle, Loader2, X, Calendar } from 'lucide-react';

interface ProductUrl {
  id: string;
  url: string;
}

interface ChromeExtensionPopupProps {
  onClose: () => void;
}

const ChromeExtensionPopup = ({ onClose }: ChromeExtensionPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    platform: '',
    city: '',
    calendlyBooked: false
  });
  const [productUrls, setProductUrls] = useState<ProductUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateWorkEmail = (email: string) => {
    const workEmailPattern = /^[^\s@]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)[^\s@]+\.[^\s@]+$/i;
    return workEmailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    if (email && !validateWorkEmail(email)) {
      setEmailError('Please use your company email address');
    } else {
      setEmailError('');
    }
  };

  const addCurrentPageUrl = () => {
    if (productUrls.length >= 5) return;
    
    // Simulate current page URL (in real extension, this would be from chrome.tabs API)
    const currentUrl = window.location.href;
    const newProduct: ProductUrl = {
      id: Date.now().toString(),
      url: currentUrl
    };
    
    setProductUrls([...productUrls, newProduct]);
  };

  const removeProductUrl = (id: string) => {
    setProductUrls(productUrls.filter(product => product.id !== id));
  };

  const handleCalendlyClick = () => {
    // Open calendly link in new tab
    window.open('https://calendly.com/dummy-link', '_blank');
    setFormData({ ...formData, calendlyBooked: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.linkedin || !formData.platform || !formData.city || !formData.calendlyBooked || productUrls.length === 0) return;
    if (emailError) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const isFormValid = formData.name && formData.email && formData.linkedin && formData.platform && formData.city && formData.calendlyBooked && productUrls.length > 0 && !emailError;

  if (isSubmitted) {
    return (
      <div className="h-full bg-white p-6 font-sans relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Request Received!</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            ✅ Your SKU-level availability report will be sent to <strong>{formData.email}</strong> within 30 minutes.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', linkedin: '', platform: '', city: '', calendlyBooked: false });
              setProductUrls([]);
            }}
            variant="outline"
            className="mt-4"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col font-sans relative">
      {/* Close Button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 z-10"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">Q</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold leading-tight">QuickComm Brand SKU Scraper</h1>
          <p className="text-xs opacity-90">by RevQ India</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs font-medium text-gray-700">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="h-9 text-sm"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-medium text-gray-700">Your email (company email) *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="you@company.com"
              className={`h-9 text-sm ${emailError ? 'border-red-500' : ''}`}
              required
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
          </div>

          {/* LinkedIn Field */}
          <div className="space-y-1">
            <Label htmlFor="linkedin" className="text-xs font-medium text-gray-700">Your LinkedIn profile link *</Label>
            <Input
              id="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile"
              className="h-9 text-sm"
              required
            />
          </div>

          {/* Platform Field */}
          <div className="space-y-1">
            <Label htmlFor="platform" className="text-xs font-medium text-gray-700">Platform *</Label>
            <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zepto">Zepto</SelectItem>
                <SelectItem value="blinkit">BlinkIt</SelectItem>
                <SelectItem value="swiggy-instamart">Swiggy Instamart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Product Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-gray-700">Products ({productUrls.length}/5) *</Label>
              <Button
                type="button"
                onClick={addCurrentPageUrl}
                disabled={productUrls.length >= 5}
                size="sm"
                className="h-7 px-2 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Product
              </Button>
            </div>
            
            {productUrls.length === 0 && (
              <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Go to product page on selected platform and Click "Add Product" to capture the current page URL (required)
              </p>
            )}

            {/* Product URLs List */}
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {productUrls.map((product) => (
                <div key={product.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded text-xs">
                  <span className="flex-1 truncate text-gray-700">{product.url}</span>
                  <button
                    type="button"
                    onClick={() => removeProductUrl(product.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* City Field */}
          <div className="space-y-1">
            <Label htmlFor="city" className="text-xs font-medium text-gray-700">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Mumbai"
              className="h-9 text-sm"
              required
            />
          </div>

          {/* Book Results Call Field */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-700">Book your results call *</Label>
            <div className="bg-gray-50 p-3 rounded border">
              <p className="text-xs text-gray-600 mb-2">
                Schedule a call to discuss your results and next steps
              </p>
              <Button
                type="button"
                onClick={handleCalendlyClick}
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs"
                disabled={formData.calendlyBooked}
              >
                <Calendar className="w-3 h-3 mr-1" />
                {formData.calendlyBooked ? 'Call Booked ✓' : 'Book Call'}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Scrape Request'
            )}
          </Button>
        </form>
      </div>

      {/* Footer CTA */}
      <div className="border-t bg-gray-50 p-4 text-center">
        <p className="text-xs text-gray-500 mb-2">Need more?</p>
        <p className="text-xs text-gray-700 leading-relaxed">
          Want daily tracking, Share of Voice, or competitor insights?{' '}
          <a href="https://www.revq.in/contact-us" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
            Talk to the RevQ India team
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChromeExtensionPopup;
