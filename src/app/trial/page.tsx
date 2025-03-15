'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import './styles.css';

// Update TypeScript declaration for the HealcodeWidget global
declare global {
  interface Window {
    HealcodeWidget?: {
      init?: () => void;
      [key: string]: unknown;
    };
  }
}

// Trial package information
const trialPackage = {
  id: '101246',
  name: '7-Day Trial',
  price: 7.00,
  originalPrice: 14.00,
  description: 'Perfect for new members'
};

export default function TrialPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState(true); // Default to selected

  const createWidget = () => {
    if (!widgetContainerRef.current || typeof document === 'undefined') return;
    
    try {
      while (widgetContainerRef.current.firstChild) {
        widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
      }
      
      const widgetHTML = `
        <healcode-widget 
          data-version="0.2" 
          data-link-class="healcode-pricing-option-text-link" 
          data-site-id="30089" 
          data-mb-site-id="686934" 
          data-service-id="${trialPackage.id}" 
          data-bw-identity-site="false" 
          data-type="pricing-link" 
          data-inner-html="Buy Now">
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
      createWidget();
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
      // Create widget on initial load
      setTimeout(() => {
        createWidget();
        console.log('Widget created for trial package with ID:', trialPackage.id);
        
        // Verify the widget was created properly
        const widgetLink = widgetContainerRef.current?.querySelector('a');
        if (widgetLink) {
          console.log('Widget link found:', widgetLink.getAttribute('href'));
        } else {
          console.warn('Widget link not found on initial load, trying again...');
          // Try again with a longer delay
          setTimeout(() => {
            createWidget();
            const retryWidgetLink = widgetContainerRef.current?.querySelector('a');
            console.log('Retry widget link found:', retryWidgetLink ? 'yes' : 'no');
          }, 500);
        }
      }, 300); // Increased timeout for initial load
    }
  }, [scriptLoaded]);

  const savings = trialPackage.originalPrice - trialPackage.price;
  const savingsPercentage = Math.round((savings / trialPackage.originalPrice) * 100);

  return (
    <main className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center pt-12">
        <div className="w-full bg-[#1a1a1a] rounded-3xl p-2 md:p-12">
          <h2 className="text-4xl font-bold text-white mb-8">
            7 Days of Workouts for $7
          </h2>
          
          {/* Trial Option with Radio Button */}
          <div className="space-y-3">
            <div 
              onClick={() => setIsSelected(true)}
              className="relative p-4 rounded-2xl cursor-pointer transition-all duration-200 bg-white/5 border border-[#b0fb50]"
            >
              <input 
                type="radio" 
                name="trialPackage" 
                id="trial-package" 
                checked={isSelected}
                onChange={() => setIsSelected(true)}
                className="sr-only"
                aria-label="7-Day Trial"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#b0fb50] bg-[#b0fb50] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  </div>
                  <span className="text-lg font-medium text-white">{trialPackage.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trial Features */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-[#b0fb50] text-xl">✓</div>
              <p className="text-white">Access to all Studio3 classes for 7 days.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#b0fb50] text-xl">✓</div>
              <p className="text-white">Trainer-led workouts for all fitness levels.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#b0fb50] text-xl">✓</div>
              <p className="text-white">Special perks and rates for new members.</p>
            </div>
          </div>

          {/* Cart Information Section */}
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Selected Plan</span>
                <span className="text-white font-medium">{trialPackage.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Duration</span>
                <span className="text-white font-medium">7 Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Original Price</span>
                <span className="text-white/60 line-through">${trialPackage.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Your Price</span>
                <span className="text-[#b0fb50] font-bold">${trialPackage.price}</span>
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
              Buy Now
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

      {/* Mindbody Script */}
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    </main>
  );
} 