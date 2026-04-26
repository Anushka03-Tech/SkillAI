import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Clock, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 mt-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here is your learning progress.</p>
        </div>
        <Link href="/analyze" className={buttonVariants({ className: "gap-2" })}>
          <Plus className="w-4 h-4" /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Match</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Mastering</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In active learning plan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Analyses</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-blue-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Frontend Developer</CardTitle>
            <CardDescription>TechCorp Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Match Score</span>
              <span className="text-sm font-bold text-emerald-500">78%</span>
            </div>
            <Progress value={78} className="h-2 mb-4" />
            <Link href="/results/mock-id" className={buttonVariants({ variant: "outline", className: "w-full" })}>
              View Roadmap
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border-dashed flex items-center justify-center min-h-[200px] bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer group">
          <Link href="/analyze" className="w-full h-full flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors p-6">
            <Plus className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <p className="font-medium">Analyze New JD</p>
          </Link>
        </Card>
      </div>
    </div>
  );
}
