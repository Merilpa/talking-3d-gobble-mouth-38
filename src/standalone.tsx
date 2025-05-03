
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

// Export the initialization function and components
export { TalkingRobot, StandaloneExport };
