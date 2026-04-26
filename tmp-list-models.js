const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const genAI = new GoogleGenerativeAI("AIzaSyAP_l72nV_WucCZNHbbE-jUWSZWq7p2ghc");
  // There is no explicit listModels in the official Node SDK.
  // We'll hit the REST API directly.
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAP_l72nV_WucCZNHbbE-jUWSZWq7p2ghc");
  const data = await response.json();
  console.log("SUPPORTED MODELS FOR GENERATE CONTENT:");
  data.models.forEach(m => {
    if (m.supportedGenerationMethods.includes("generateContent")) {
      console.log(m.name);
    }
  });
}
run();
