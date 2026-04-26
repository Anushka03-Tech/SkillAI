"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button variant="outline" className="print:hidden h-14" onClick={() => window.print()}>
      <Printer className="mr-2 w-5 h-5" /> Export PDF
    </Button>
  );
}
