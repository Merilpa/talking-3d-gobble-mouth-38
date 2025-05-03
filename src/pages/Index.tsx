
import { useState, useRef, useEffect } from 'react';
import TalkingRobot from '../components/TalkingRobot';
import RobotAPI from '../components/RobotAPI';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ExportButton from '@/components/ExportButton';

const Index = () => {
  const [text, setText] = useState('Ciao, sono un robot parlante!');
  const [language, setLanguage] = useState('it-IT');
  const speakButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  // Handle speak requests from the API
  useEffect(() => {
    const handleSpeakRequest = () => {
      if (speakButtonRef.current) {
        speakButtonRef.current.click();
      }
    };
    
    window.addEventListener('robot-speak', handleSpeakRequest);
    return () => {
      window.removeEventListener('robot-speak', handleSpeakRequest);
    };
  }, []);
  
  // Show the integration instructions modal
  const showIntegrationHelp = () => {
    toast({
      title: "Integrazione nel tuo sito",
      description: "Puoi integrare questo robot nel tuo sito con un iframe o con JavaScript.",
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/70">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Robot Parlante 3D</h1>
          <p className="text-muted-foreground">
            Un robot 3D che parla il testo che gli fornisci
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button 
              onClick={showIntegrationHelp}
              variant="outline"
              size="sm"
            >
              Come integrare?
            </Button>
            
            <Link to="/integration">
              <Button variant="outline" size="sm">
                Guida dettagliata
              </Button>
            </Link>
            
            <ExportButton />
          </div>
        </header>
        
        <main className="mb-8">
          <div className="bg-card rounded-xl shadow-xl overflow-hidden h-[600px]">
            <TalkingRobot />
          </div>
        </main>
        
        <footer className="text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} - Robot Parlante 3D</p>
        </footer>
      </div>
      
      {/* API Integration */}
      <RobotAPI 
        onTextReceived={setText}
        onLanguageReceived={setLanguage}
      />
    </div>
  );
};

export default Index;
