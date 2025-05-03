
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TalkingRobot from './components/TalkingRobot';
import StandaloneExport from './components/StandaloneExport';

// Standalone entry point that bundles the robot and its dependencies
function StandaloneApp() {
  return (
    <>
      <StandaloneExport />
      <div className="h-screen w-full">
        <TalkingRobot />
      </div>
    </>
  );
}

// Create a root element if this is loaded directly
if (document.getElementById('talking-robot-root')) {
  createRoot(document.getElementById('talking-robot-root')!).render(
    <React.StrictMode>
      <StandaloneApp />
    </React.StrictMode>
  );
}

// Initialize function for websites
window.InitTalkingRobot = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return null;
  }
  
  try {
    const root = createRoot(container);
    root.render(<TalkingRobot />);
    console.log(`Robot successfully initialized in container: ${containerId}`);
    
    // Return an API object for controlling the robot
    return {
      speak: (text, language) => {
        if (window.robotAPI) {
          window.robotAPI.speak(text, language);
        }
      }
    };
  } catch (error) {
    console.error('Failed to initialize robot:', error);
    return null;
  }
};

// Export for module usage
export { TalkingRobot };
export type { InitTalkingRobot };

// Type definition
interface InitTalkingRobot {
  (containerId: string): {
    speak: (text: string, language?: string) => void;
  } | null;
}

// Add to global window object
declare global {
  interface Window {
    InitTalkingRobot: InitTalkingRobot;
    robotAPI?: {
      speak: (text: string, language?: string) => void;
    };
  }
}
