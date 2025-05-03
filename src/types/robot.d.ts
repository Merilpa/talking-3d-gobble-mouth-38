
export interface InitTalkingRobot {
  (containerId: string): {
    speak: (text: string, language?: string) => void;
  } | null;
}

export interface RobotAPI {
  speak: (text: string, language?: string) => void;
}

declare global {
  interface Window {
    InitTalkingRobot: InitTalkingRobot;
    robotAPI?: RobotAPI;
  }
}
