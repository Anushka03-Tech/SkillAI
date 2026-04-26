import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({ 
    pdf: { maxFileSize: "4MB", maxFileCount: 1 }, 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB", maxFileCount: 1 } 
  })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req as NextRequest);
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
