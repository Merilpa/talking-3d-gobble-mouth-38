
import { useState, useEffect } from 'react';
import RobotScene from './RobotScene';
import SpeechController from './SpeechController';

const TalkingRobot = () => {
  const [text, setText] = useState<string>('Ciao, sono un robot parlante!');
  const [language, setLanguage] = useState<string>('it-IT');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [jawOpenAmount, setJawOpenAmount] = useState<number>(0);
  
  // For handling POST requests
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      // Check if the event data is a valid message
      if (event.data && typeof event.data === 'object') {
        if (event.data.text && typeof event.data.text === 'string') {
          setText(event.data.text);
          
          if (event.data.language && typeof event.data.language === 'string') {
            setLanguage(event.data.language);
          }
          
          // Automatically speak the text if specified
          if (event.data.speak === true) {
            // We need to wait a bit for the state to update
            setTimeout(() => {
              const speakButton = document.querySelector('.speak-button') as HTMLButtonElement | null;
              if (speakButton) speakButton.click();
            }, 100);
          }
        }
      }
    };
    
    // Listen for messages from parent window
    window.addEventListener('message', handlePostMessage);
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);
  
  return (
    <div className="app-layout robot-theme">
      <div className="relative flex-grow">
        <RobotScene isSpeaking={isSpeaking} jawOpenAmount={jawOpenAmount} />
        
        {/* Controls overlay */}
        <div className="robot-controls">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Inserisci il testo che il robot deve pronunciare..."
                  className="w-full h-24 p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-white"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-white"
                >
                  <option value="it-IT">Italiano</option>
                  <option value="fr-FR">Francese</option>
                  <option value="de-DE">Tedesco</option>
                  <option value="es-ES">Spagnolo</option>
                </select>
                
                <SpeechController
                  text={text}
                  language={language}
                  onSpeakingStateChange={setIsSpeaking}
                  onJawMovement={setJawOpenAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkingRobot;
