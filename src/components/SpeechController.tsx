
import { useState, useEffect, useCallback } from 'react';

interface SpeechControllerProps {
  text: string;
  language: string;
  onSpeakingStateChange: (isSpeaking: boolean) => void;
  onJawMovement: (openAmount: number) => void;
}

const SpeechController = ({ 
  text, 
  language,
  onSpeakingStateChange,
  onJawMovement
}: SpeechControllerProps) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  
  // Handle speech synthesis
  const speakText = useCallback(() => {
    if (!text.trim()) return;
    
    // Clear any previous utterances
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const newUtterance = new SpeechSynthesisUtterance(text);
    
    // Set the language based on selection
    switch(language) {
      case 'it-IT':
        newUtterance.lang = 'it-IT'; // Italian
        break;
      case 'fr-FR':
        newUtterance.lang = 'fr-FR'; // French
        break;
      case 'de-DE':
        newUtterance.lang = 'de-DE'; // German
        break;
      case 'es-ES':
        newUtterance.lang = 'es-ES'; // Spanish
        break;
      default:
        newUtterance.lang = 'it-IT'; // Default to Italian
    }
    
    // Set up events for animation
    newUtterance.onstart = () => {
      onSpeakingStateChange(true);
    };
    
    newUtterance.onend = () => {
      onSpeakingStateChange(false);
      onJawMovement(0); // Reset jaw position
    };
    
    // For mouth animation
    newUtterance.onboundary = (e) => {
      // On word boundary, open mouth a bit more
      if (e.name === 'word') {
        onJawMovement(0.8);
        
        // Then partially close it after a short time
        setTimeout(() => {
          onJawMovement(0.3);
        }, 100);
      }
    };
    
    // Random jaw movement during speaking
    const jawInterval = setInterval(() => {
      const randomOpen = 0.3 + Math.random() * 0.5;
      onJawMovement(randomOpen);
    }, 150);
    
    newUtterance.onend = () => {
      clearInterval(jawInterval);
      onSpeakingStateChange(false);
      onJawMovement(0);
    };
    
    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    
  }, [text, language, onSpeakingStateChange, onJawMovement]);
  
  useEffect(() => {
    return () => {
      // Clean up speech synthesis when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);
  
  return (
    <button 
      onClick={speakText}
      disabled={!text.trim()}
      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
    >
      Fai parlare il robot
    </button>
  );
};

export default SpeechController;
