"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { extractTextFromUrl } from "@/lib/parser";
import { generateAnalysisAndPlan } from "@/lib/ai";

export async function analyzeAction(resumeUrl: string, jobDescription: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // 1. Ensure user exists
    let user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: { clerkId: userId, email: `${userId}@placeholder.com` },
      });
    }

    // 2. Extract Text from Resume
    const resumeText = await extractTextFromUrl(resumeUrl);

    // 3. AI Analysis
    const aiResult = await generateAnalysisAndPlan(resumeText, jobDescription);

    // 4. Save to DB
    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        resumeText,
        jobDescription,
        matchScore: aiResult.matchScore,
        matchDetails: aiResult.matchDetails,
      }
    });

    await prisma.learningPlan.create({
      data: {
        analysisId: analysis.id,
        planData: aiResult.learningPlan,
      }
    });

    return { success: true, analysisId: analysis.id };
  } catch (error: any) {
    console.error("ANALYSIS ERROR:", error);
    return { success: false, error: error.message || "Failed to analyze" };
  }
}
