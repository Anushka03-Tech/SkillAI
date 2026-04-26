const fs = require('fs');
async function run() {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAP_l72nV_WucCZNHbbE-jUWSZWq7p2ghc");
  const data = await response.json();
  let out = "SUPPORTED MODELS FOR GENERATE CONTENT:\n";
  data.models.forEach(m => {
    if (m.supportedGenerationMethods.includes("generateContent")) {
      out += m.name + "\n";
    }
  });
  fs.writeFileSync("d:/AI project/models-out2.txt", out, "utf-8");
}
run();
