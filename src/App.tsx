import React from "react";
import { Toaster } from "sonner";
import VoiceMic from "./components/voicechat/MicInput";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <MicInput />
    </>
  );
}

export default App;
