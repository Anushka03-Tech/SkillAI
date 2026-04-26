import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const analysis = await prisma.analysis.findUnique({
    where: { id: params.id, userId: user.id },
  });

  if (!analysis) return <div>Analysis not found.</div>;

  const details = analysis.matchDetails as any;
  const score = analysis.matchScore;
  const circumference = 2 * Math.PI * 80;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div className="container mx-auto p-6 max-w-5xl py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Gap Analysis Result</h1>
          <p className="text-muted-foreground text-lg">Compare your skills against the target role.</p>
        </div>
        <div className="flex gap-4 items-center">
          <PrintButton />
          <Link href={`/results/${analysis.id}/plan`} className={buttonVariants({ size: "lg", className: "rounded-full shadow-lg h-14 px-8 text-lg print:hidden" })}>
            View Learning Roadmap <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="col-span-1 border-2 border-primary/20 bg-primary/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">Overall Match</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="relative flex items-center justify-center w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90 absolute inset-0">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/30" />
                <circle 
                  cx="96" cy="96" r="80" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent" 
                  className="text-primary transition-all duration-1000 ease-out" 
                  strokeDasharray={strokeDasharray} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black">{score}%</span>
              </div>
            </div>
            <p className="mt-6 text-center text-muted-foreground font-medium text-sm">
              Score based on required skills and keyword overlap.
            </p>
          </CardContent>
        </Card>

        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <Card className="border-emerald-500/20 bg-emerald-500/5 h-full">
            <CardHeader>
              <CardTitle className="text-emerald-600 dark:text-emerald-400">Matched Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {details.matchingSkills?.length > 0 ? details.matchingSkills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30 px-3 py-1 text-sm">
                  {skill}
                </Badge>
              )) : <p className="text-muted-foreground">No matching skills found.</p>}
            </CardContent>
          </Card>

          <Card className="border-rose-500/20 bg-rose-500/5 h-full">
            <CardHeader>
              <CardTitle className="text-rose-600 dark:text-rose-400">Missing Skills (Gaps)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {details.missingSkills?.length > 0 ? details.missingSkills.map((skill: string) => (
                <Badge key={skill} variant="destructive" className="bg-rose-500/20 text-rose-700 dark:text-rose-300 hover:bg-rose-500/30 border-0 px-3 py-1 text-sm">
                  {skill}
                </Badge>
              )) : <p className="text-muted-foreground">Amazing! No missing skills found.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
