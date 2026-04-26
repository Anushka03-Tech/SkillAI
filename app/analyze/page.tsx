"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { analyzeAction } from "@/actions/analyze";

export default function AnalyzePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [resumeUrl, setResumeUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async () => {
    if (!jobDescription || !resumeUrl) return;
    setIsProcessing(true);
    setErrorMsg("");
    try {
      const result = await analyzeAction(resumeUrl, jobDescription);
      if (result.success && result.analysisId) {
        router.push(`/results/${result.analysisId}`);
      } else {
        setErrorMsg(result.error || "Analysis failed.");
        setStep(2);
        setIsProcessing(false);
      }
    } catch (error: any) {
      setErrorMsg(error?.message || "Something went wrong.");
      setStep(2);
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className={`flex flex-col items-center flex-1 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 font-bold bg-background">1</div>
          <span className="text-sm font-medium">Resume</span>
        </div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        <div className={`flex flex-col items-center flex-1 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 font-bold bg-background">2</div>
          <span className="text-sm font-medium">Job Description</span>
        </div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
        <div className={`flex flex-col items-center flex-1 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 font-bold bg-background">3</div>
          <span className="text-sm font-medium">Processing</span>
        </div>
      </div>

      <Card className="shadow-lg border-2">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Upload your Resume</CardTitle>
              <CardDescription>We support PDF and DOCX formats up to 4MB.</CardDescription>
            </CardHeader>
            <CardContent>
              {resumeUrl ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/20 border-emerald-500/50">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  <p className="text-lg font-medium text-emerald-600">Resume Uploaded Successfully!</p>
                  <Button className="mt-8" onClick={() => setStep(2)}>
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="resumeUploader"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]) setResumeUrl(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    setErrorMsg(error.message);
                  }}
                />
              )}
              {errorMsg && <p className="text-sm font-medium text-red-500 mt-4 text-center">{errorMsg}</p>}
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the target job description to analyze your gaps.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste the job requirements, responsibilities, and description here..."
                className="min-h-[300px] mb-6 resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {errorMsg && <p className="text-sm font-medium text-red-500 mb-4 text-center">{errorMsg}</p>}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => { setStep(3); handleAnalyze(); }} disabled={jobDescription.length < 50}>
                  Analyze Profile <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <CardContent className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2">Analyzing your profile...</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Our AI is extracting skills, cross-referencing requirements, and building a personalized roadmap layout. This usually takes 15 seconds.
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
