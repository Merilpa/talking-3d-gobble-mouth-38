
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TalkingRobot from './TalkingRobot';
import '../types/robot'; // Import the type definitions

// This component helps create a standalone version that can be used without React
const StandaloneExport = () => {
  useEffect(() => {
    // Create a global initialization function that websites can call
    window.InitTalkingRobot = (containerId: string) => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return null;
      }
      
      // Create a React root and render the TalkingRobot component
      try {
        const root = createRoot(container);
        root.render(<TalkingRobot />);
        console.log(`Robot successfully initialized in container: ${containerId}`);
        
        // Return an API object for controlling the robot
        return {
          speak: (text: string, language?: string) => {
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
    
    // Signal that the robot is ready
    window.dispatchEvent(new CustomEvent('robot-ready'));
    
    return () => {
      // Clean up global function on unmount
      delete window.InitTalkingRobot;
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default StandaloneExport;
