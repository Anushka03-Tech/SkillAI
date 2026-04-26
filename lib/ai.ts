import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAnalysisAndPlan(resumeText: string, jobDescription: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", 
    systemInstruction: "You are an expert technical recruiter and career coach. You output valid JSON according to the prompt.",
  });

  const prompt = `
Given a candidate's resume and a target job description, perform a detailed analysis and create a structured learning plan.

Resume:
${resumeText.substring(0, 10000)}

Job Description:
${jobDescription.substring(0, 5000)}

Perform the following:
1. Extract required and preferred skills from the JD.
2. Extract the candidate's skills from the Resume.
3. Calculate an overall match percentage (0-100).
4. Identify matching skills and missing skills.
5. Create a personalized learning plan (7-day, 30-day, 60-day, 90-day intervals) to bridge the missing skills.

Respond ONLY with a raw JSON object string of this exact structure (do not use markdown formatting like \`\`\`json):
{
  "matchScore": number,
  "matchDetails": {
    "jdSkills": ["React", "Typescript", "Next.js"],
    "resumeSkills": ["Javascript", "HTML"],
    "matchingSkills": ["Javascript"],
    "missingSkills": ["React", "Typescript", "Next.js"]
  },
  "learningPlan": {
    "day7": [{ "task": "string", "hours": number, "resource": "string" }],
    "day30": [{ "task": "string", "hours": number, "resource": "string" }],
    "day60": [{ "task": "string", "hours": number, "resource": "string" }],
    "day90": [{ "task": "string", "hours": number, "resource": "string" }]
  }
}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  if (!text) throw new Error("Empty response from AI");
  
  return JSON.parse(text);
}
