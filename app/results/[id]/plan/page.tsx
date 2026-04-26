import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";

export default async function PlanPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const plan = await prisma.learningPlan.findUnique({
    where: { analysisId: params.id },
  });

  if (!plan) return <div>Plan not found.</div>;

  const data = plan.planData as any;

  const periods = [
    { key: "day7", title: "Day 1-7: Immediate Focus", color: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-500" },
    { key: "day30", title: "Day 8-30: Core Fundamentals", color: "border-indigo-500", bg: "bg-indigo-500/10", text: "text-indigo-500" },
    { key: "day60", title: "Day 31-60: Advanced Concepts", color: "border-purple-500", bg: "bg-purple-500/10", text: "text-purple-500" },
    { key: "day90", title: "Day 61-90: Mastery & Projects", color: "border-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-500" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl py-12">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Your Personalized Roadmap</h1>
        <PrintButton />
      </div>
      <p className="text-muted-foreground text-lg mb-12">Step-by-step curriculum to bridge your skill gaps.</p>
      
      <div className="relative border-l-4 border-muted ml-6 space-y-12 pb-12">
        {periods.map((period) => {
          const tasks = data[period.key];
          if (!tasks || tasks.length === 0) return null;
          
          return (
            <div key={period.key} className="relative pl-10 md:pl-16">
              <div className={`absolute -left-[26px] top-4 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-background shadow-sm ${period.color}`}>
                <Clock className={`w-5 h-5 ${period.text}`} />
              </div>
              <Card className={`border-2 hover:border-primary/50 transition-colors shadow-md`}>
                <CardHeader className={`${period.bg} rounded-t-lg border-b`}>
                  <CardTitle className={`text-xl ${period.text}`}>{period.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {tasks.map((task: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" /> 
                          {task.task}
                        </h3>
                        <div className="ml-8 mt-3 flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-semibold bg-background">{task.hours} hours</Badge>
                          <span className="text-muted-foreground text-sm">Resource:</span>
                          <a href={task.resource.startsWith('http') ? task.resource : `https://google.com/search?q=${encodeURIComponent(task.resource)}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline font-medium">
                            {task.resource}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
