'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import './styles.css';

// Add TypeScript declaration for the HealcodeWidget global
declare global {
  interface Window {
    HealcodeWidget?: {
      init: () => void;
    };
  }
}

export default function TrialPage() {
  // This useEffect ensures the Healcode widget is properly initialized
  // after the script has loaded
  useEffect(() => {
    // Check if the healcode script has already been loaded
    if (window.HealcodeWidget) {
      window.HealcodeWidget.init();
    }
  }, []);

  return (
    <main className="trial-container flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo or Header */}
        <div className="mb-6">
          <h1 className="trial-logo">Studio3</h1>
        </div>

        {/* Main Content */}
        <div className="trial-card w-full">
          <h2 className="trial-header text-center">
            Get 7 days of workouts for $7
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="trial-feature">
              <div className="trial-feature-icon">✓</div>
              <p>Access to all Studio3 classes for 7 days.</p>
            </div>
            <div className="trial-feature">
              <div className="trial-feature-icon">✓</div>
              <p>Trainer-led workouts for all fitness levels.</p>
            </div>
            <div className="trial-feature">
              <div className="trial-feature-icon">✓</div>
              <p>Special perks and rates for new members.</p>
            </div>
          </div>

          {/* Mindbody Widget Container */}
          <div className="w-full">
            <div 
              id="healcode-widget-container"
              className="w-full"
            >
              {/* The widget will be rendered here */}
              <div className="healcode-pricing-option-text-link-container">
                <button 
                  className="trial-button"
                  id="mindbody-widget-button"
                >
                  Buy Now
                </button>
              </div>
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
          // Create the healcode widget element
          const healcodeWidget = document.createElement('healcode-widget');
          healcodeWidget.setAttribute('data-version', '0.2');
          healcodeWidget.setAttribute('data-link-class', 'healcode-pricing-option-text-link');
          healcodeWidget.setAttribute('data-site-id', '30089');
          healcodeWidget.setAttribute('data-mb-site-id', '686934');
          healcodeWidget.setAttribute('data-service-id', '101246');
          healcodeWidget.setAttribute('data-bw-identity-site', 'false');
          healcodeWidget.setAttribute('data-type', 'pricing-link');
          healcodeWidget.setAttribute('data-inner-html', 'Buy Now');
          
          // Replace the button with the actual widget
          const container = document.getElementById('mindbody-widget-button');
          if (container && container.parentNode) {
            container.parentNode.replaceChild(healcodeWidget, container);
          }
          
          // Initialize the widget
          if (window.HealcodeWidget) {
            window.HealcodeWidget.init();
          }
        }}
      />
    </main>
  );
} 