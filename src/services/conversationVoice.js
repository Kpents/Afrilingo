export const conversationVoice = {
  getCapabilities(languageData) {
    return {
      recognition: languageData?.capabilities?.voiceRecognition === "ready",
      spokenResponse: languageData?.capabilities?.nativeAudio === "ready",
      generatedFeedback: languageData?.capabilities?.generatedFeedback === "ready"
    };
  },
  async transcribe() {
    throw new Error("No verified isiZulu speech-recognition adapter is configured.");
  },
  async evaluate() {
    throw new Error("No pronunciation-feedback adapter is configured.");
  }
};
