'use client';

import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    HealcodeWidget?: {
      init?: () => void;
      [key: string]: unknown;
    };
  }
}

const creditPackages = [
  { id: '149', name: 'Basic', credits: 5, price: 49.00, originalPrice: 98.00, description: 'Perfect for beginners' },
  { id: '146', name: 'Standard', credits: 10, price: 62.00, originalPrice: 124.00, description: 'Most popular choice' },
  { id: '145', name: 'Premium', credits: 15, price: 75.00, originalPrice: 150.00, description: 'Best value for regulars' },
  { id: '148', name: 'Pro', credits: 20, price: 87.00, originalPrice: 174.00, description: 'For dedicated members' },
  { id: '147', name: 'Elite', credits: 30, price: 99.00, originalPrice: 198.00, description: 'Maximum flexibility' },
];

export default function CreditsPage() {
  const defaultPackage = creditPackages.find(pkg => pkg.id === '149') || creditPackages[0];
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const handlePackageSelect = (pkg: typeof creditPackages[0]) => {
    setSelectedPackage(pkg);
    if (scriptLoaded) {
      createWidget(pkg);
    }
  };

  const createWidget = (pkg: typeof creditPackages[0]) => {
    if (!widgetContainerRef.current || typeof document === 'undefined') return;
    
    try {
      while (widgetContainerRef.current.firstChild) {
        widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
      }
      
      const widgetHTML = `
        <healcode-widget 
          data-version="0.2" 
          data-link-class="healcode-contract-text-link" 
          data-site-id="30089" 
          data-mb-site-id="686934" 
          data-service-id="${pkg.id}" 
          data-bw-identity-site="false" 
          data-type="contract-link" 
          data-inner-html="Get ${pkg.credits} Credits">
        </healcode-widget>
      `;
      
      widgetContainerRef.current.innerHTML = widgetHTML;
      
      if (window.HealcodeWidget && typeof window.HealcodeWidget.init === 'function') {
        window.HealcodeWidget.init();
      }
    } catch (error) {
      console.error('Error creating widget:', error);
    }
  };

  // Function to trigger the widget's purchase link
  const triggerWidgetPurchase = () => {
    const widgetLink = widgetContainerRef.current?.querySelector('a');
    if (widgetLink) {
      widgetLink.click();
    } else {
      console.log('Widget link not found, recreating widget');
      // If link not found, try recreating the widget
      createWidget(selectedPackage);
      // Give it a moment to initialize, then try clicking again
      setTimeout(() => {
        const newWidgetLink = widgetContainerRef.current?.querySelector('a');
        if (newWidgetLink) {
          newWidgetLink.click();
        } else {
          console.error('Failed to find widget link after recreation');
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (scriptLoaded && typeof document !== 'undefined') {
      // Create widget with the default package on initial load
      setTimeout(() => {
        createWidget(selectedPackage);
        console.log('Widget created for package:', selectedPackage.id);
      }, 100);
    }
  }, [scriptLoaded]);

  // Add a separate effect to handle package changes
  useEffect(() => {
    if (scriptLoaded && typeof document !== 'undefined') {
      createWidget(selectedPackage);
      console.log('Widget updated for package:', selectedPackage.id);
    }
  }, [selectedPackage, scriptLoaded]);

  const savings = selectedPackage.originalPrice - selectedPackage.price;
  const savingsPercentage = Math.round((savings / selectedPackage.originalPrice) * 100);

  return (
    <main
    className="min-h-screen flex bg-[#1a1a1a] flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center pt-12">
        <div className="w-full bg-[#1a1a1a] rounded-3xl p-2 md:p-12">
          <h2 className="text-4xl font-bold text-white mb-8">
            Select Membership Type
          </h2>
          
          <div className="space-y-3">
            {creditPackages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => handlePackageSelect(pkg)}
                className={`
                  relative p-4 rounded-2xl cursor-pointer transition-all duration-200
                  ${selectedPackage.id === pkg.id 
                    ? 'bg-white/5 border border-[#b0fb50]' 
                    : 'bg-transparent border border-white/10 hover:border-white/20'}
                `}
              >
                <input 
                  type="radio" 
                  name="creditPackage" 
                  id={`package-${pkg.id}`} 
                  checked={selectedPackage.id === pkg.id}
                  onChange={() => handlePackageSelect(pkg)}
                  className="sr-only"
                  aria-label={`${pkg.name} - ${pkg.credits} Credits`}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedPackage.id === pkg.id 
                        ? 'border-[#b0fb50] bg-[#b0fb50]' 
                        : 'border-white/30'}`}
                    >
                      {selectedPackage.id === pkg.id && (
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="text-lg font-medium text-white">{pkg.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Information Section */}
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Selected Plan</span>
                <span className="text-white font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Credits</span>
                <span className="text-white font-medium">{selectedPackage.credits} Credits</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Original Price</span>
                <span className="text-white/60 line-through">${selectedPackage.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Your Price</span>
                <span className="text-[#b0fb50] font-bold">${selectedPackage.price}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-gray-400">Total Savings</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#b0fb50] font-bold">${savings}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#b0fb50]/10 text-[#b0fb50]">
                    {savingsPercentage}% OFF
                  </span>
                </div>
              </div>
            </div>

            {/* Hidden container for the Healcode widget */}
            <div 
              ref={widgetContainerRef}
              id="healcode-widget-container"
              className="hidden"
            />
            
            {/* Custom styled button that triggers the widget */}
            <button
              onClick={triggerWidgetPurchase}
              className="w-full mt-8 bg-[#b0fb50] hover:bg-[#9fdc4f] text-black font-semibold rounded-full py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Pay Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Studio3. All rights reserved.</p>
        </div>
      </div>

      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    </main>
  );
}