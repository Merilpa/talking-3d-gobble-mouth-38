
import { useState, useEffect } from 'react';

// This component doesn't render anything visible
// It just sets up event listeners for external API integration
const RobotAPI = ({ 
  onTextReceived,
  onLanguageReceived
}: {
  onTextReceived: (text: string) => void;
  onLanguageReceived: (lang: string) => void;
}) => {
  
  // Listen for messages via window.postMessage API
  useEffect(() => {
    const handleApiRequest = (event: MessageEvent) => {
      // Validate and process the message
      if (event.data && typeof event.data === 'object') {
        // For text content
        if (event.data.text && typeof event.data.text === 'string') {
          onTextReceived(event.data.text);
        }
        
        // For language selection
        if (event.data.language && typeof event.data.language === 'string') {
          const lang = event.data.language.toLowerCase();
          
          // Map to our supported language codes
          if (lang.includes('ita')) onLanguageReceived('it-IT');
          else if (lang.includes('fra')) onLanguageReceived('fr-FR');
          else if (lang.includes('deu') || lang.includes('ger')) onLanguageReceived('de-DE');
          else if (lang.includes('esp') || lang.includes('spa')) onLanguageReceived('es-ES');
        }
        
        // Auto-speak if specified
        if (event.data.speak === true) {
          // Signal to speak (implemented by parent component)
          window.dispatchEvent(new CustomEvent('robot-speak'));
        }
      }
    };
    
    // Listen for messages from parent window
    window.addEventListener('message', handleApiRequest);
    
    // Expose API methods globally for non-iframe integration
    window.robotAPI = {
      speak: (text: string, language?: string) => {
        // Notify the parent component
        if (text) onTextReceived(text);
        if (language) onLanguageReceived(language);
        
        // Trigger speech after a brief delay to allow state updates
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('robot-speak'));
        }, 100);
      }
    };
    
    return () => {
      window.removeEventListener('message', handleApiRequest);
      // @ts-ignore - Clean up global API
      delete window.robotAPI;
    };
  }, [onTextReceived, onLanguageReceived]);
  
  // This component doesn't render anything
  return null;
};

// Add type definition for the global window object
declare global {
  interface Window {
    robotAPI?: {
      speak: (text: string, language?: string) => void;
    };
  }
}

export default RobotAPI;
