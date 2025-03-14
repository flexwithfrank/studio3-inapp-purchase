'use client';

import { useEffect, useState, useRef } from 'react';
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

// Define the credit packages
const creditPackages = [
  { id: '149', credits: 5, price: 49.00, originalPrice: 98.00 },
  { id: '146', credits: 10, price: 62.00, originalPrice: 124.00 },
  { id: '145', credits: 15, price: 75.00, originalPrice: 150.00 },
  { id: '148', credits: 20, price: 87.00, originalPrice: 174.00 },
  { id: '147', credits: 30, price: 99.00, originalPrice: 198.00 },
];

export default function CreditsPage() {
  // Find the 5 credit package (ID 149) and set it as default
  const defaultPackage = creditPackages.find(pkg => pkg.id === '149') || creditPackages[0];
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Handle package selection
  const handlePackageSelect = (pkg: typeof creditPackages[0]) => {
    setSelectedPackage(pkg);
    
    // If script is loaded, recreate the widget with the new package
    if (scriptLoaded) {
      createWidget(pkg);
    }
  };

  // Function to create the widget
  const createWidget = (pkg: typeof creditPackages[0]) => {
    if (!widgetContainerRef.current || typeof document === 'undefined') return;
    
    try {
      // Clear the container first
      while (widgetContainerRef.current.firstChild) {
        widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
      }
      
      // Add the actual healcode widget HTML directly
      const widgetHTML = `
        <healcode-widget 
          data-version="0.2" 
          data-link-class="healcode-contract-text-link" 
          data-site-id="30089" 
          data-mb-site-id="686934" 
          data-service-id="${pkg.id}" 
          data-bw-identity-site="false" 
          data-type="contract-link" 
          data-inner-html="Buy ${pkg.credits} Credits for $${pkg.price}">
        </healcode-widget>
      `;
      
      // Insert the widget HTML
      widgetContainerRef.current.innerHTML = widgetHTML;
      
      // Add event listener to prevent default behavior on any links
      setTimeout(() => {
        const links = widgetContainerRef.current?.querySelectorAll('a');
        if (links) {
          links.forEach(link => {
            // Store the original href
            const originalHref = link.getAttribute('href');
            
            // Remove the href attribute to prevent default navigation
            link.removeAttribute('href');
            
            // Add a data attribute to store the original URL
            if (originalHref) {
              link.setAttribute('data-href', originalHref);
            }
            
            // Add click event listener to handle the click manually
            link.addEventListener('click', (e) => {
              e.preventDefault();
              
              // Get the stored URL
              const url = link.getAttribute('data-href');
              if (url) {
                // Open in a new window/tab
                window.open(url, '_blank');
              }
              
              return false;
            });
          });
        }
      }, 500); // Give time for the widget to render
      
      // Initialize the widget if possible
      if (window.HealcodeWidget && typeof window.HealcodeWidget.init === 'function') {
        window.HealcodeWidget.init();
      }
      
    } catch (error) {
      console.error('Error creating widget:', error);
      
      // Fallback to a simple button if widget creation fails
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = `
          <a 
             class="trial-button" 
             onclick="window.open('https://clients.mindbodyonline.com/classic/ws?studioid=30089&stype=41&prodid=${pkg.id}', '_blank'); return false;"
          >
            Buy ${pkg.credits} Credits for $${pkg.price}
          </a>
        `;
      }
    }
  };

  // Initialize the widget when the script loads
  useEffect(() => {
    if (scriptLoaded && typeof document !== 'undefined') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        createWidget(selectedPackage);
      }, 100);
    }
  }, [scriptLoaded, selectedPackage]);

  return (
    <main className="trial-container flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Main Content */}
        <div className="trial-card w-full">
          <h2 className="trial-header text-left text-4xl mb-8">
            Workout Credits (50% off)
          </h2>
          
          <div className="credit-packages-grid">
            {creditPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`credit-package-tile ${selectedPackage.id === pkg.id ? 'selected' : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <input 
                  type="radio" 
                  name="creditPackage" 
                  id={`package-${pkg.id}`} 
                  checked={selectedPackage.id === pkg.id}
                  onChange={() => handlePackageSelect(pkg)}
                  className="hidden-radio"
                  aria-label={`${pkg.credits} Workout Credits for $${pkg.price}`}
                />
                <div className="package-content">
                  <div className="package-credits">{pkg.credits}</div>
                  <div className="package-label">Workout Credits</div>
                  <div className="package-price">
                    <span className="current-price">${pkg.price}</span>
                    <span className="original-price">${pkg.originalPrice}</span>
                  </div>
                  <div className="package-discount">50% off</div>
                  {selectedPackage.id === pkg.id && (
                    <div className="package-selected-indicator">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mindbody Widget Container */}
          <div className="w-full mt-8">
            <div 
              ref={widgetContainerRef}
              id="healcode-widget-container"
              className="w-full"
            >
              {/* Widget will be inserted here by script */}
              {!scriptLoaded && (
                <button 
                  className="trial-button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://clients.mindbodyonline.com/classic/ws?studioid=30089&stype=41&prodid=${selectedPackage.id}`, '_blank');
                  }}
                >
                  Buy {selectedPackage.credits} Credits for ${selectedPackage.price}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="trial-footer">
          <p>© {new Date().getFullYear()} Studio3. All rights reserved.</p>
        </div>
      </div>

      {/* Mindbody Script */}
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
        }}
      />
    </main>
  );
} 