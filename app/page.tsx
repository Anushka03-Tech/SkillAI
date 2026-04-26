"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Target, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex-col flex items-center justify-center min-h-[80vh] px-4 text-center mt-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="mb-6 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm max-w-fit text-blue-600 dark:text-blue-400 font-medium border border-blue-500/20">
            ✨ AI-Powered Career Coach
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Level up your career with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              SkillAI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
            Upload your resume, paste a job description, and let our AI engine generate a personalized, day-by-day learning roadmap to bridge your skill gaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/analyze" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-14 px-8 text-lg rounded-full" })}>
              Analyze Your Resume <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/dashboard" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-14 px-8 text-lg rounded-full" })}>
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-muted/50 py-24 px-4 flex justify-center">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="h-full border-2 hover:border-blue-500/50 transition-colors bg-background/50 backdrop-blur-sm">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-500/10 rounded-full mb-6 text-blue-500">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Upload Resume</h3>
                  <p className="text-muted-foreground">We instantly extract your skills, experience, and projects using advanced parsing.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="h-full border-2 hover:border-indigo-500/50 transition-colors bg-background/50 backdrop-blur-sm">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-indigo-500/10 rounded-full mb-6 text-indigo-500">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. Paste JD</h3>
                  <p className="text-muted-foreground">Input the job description for your dream role. We analyze the required and preferred skills.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="h-full border-2 hover:border-purple-500/50 transition-colors bg-background/50 backdrop-blur-sm">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-purple-500/10 rounded-full mb-6 text-purple-500">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Get Roadmap</h3>
                  <p className="text-muted-foreground">AI calculates your match score and generates a personalized 7/30/60/90 day curriculum.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t flex items-center justify-center text-sm text-muted-foreground">
        <p>© 2026 SkillAI. All rights reserved. Hackathon Project.</p>
      </footer>
    </div>
  );
}
