
import { useEffect } from 'react';
import TalkingRobot from './TalkingRobot';

// This component helps create a standalone version that can be used without React
const StandaloneExport = () => {
  useEffect(() => {
    // Create a global initialization function that websites can call
    window.InitTalkingRobot = (containerId: string) => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
      }
      
      // Mount the robot to the specified container
      // This would need React to be available in the global scope
      // In a real implementation, you'd bundle React with the exported file
      
      console.log(`Robot initialized in container: ${containerId}`);
    };
    
    return () => {
      // Clean up global function on unmount
      delete window.InitTalkingRobot;
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

declare global {
  interface Window {
    InitTalkingRobot?: (containerId: string) => void;
  }
}

export default StandaloneExport;
