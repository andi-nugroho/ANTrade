"use client";

import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UploadProgressProps {
  progress: number;
}

export function UploadProgress({ progress }: UploadProgressProps) {
  const router = useRouter();
  const isComplete = progress === 100;
  
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h2 className="font-heading text-heading-h3 font-bold mb-2">
            {isComplete ? "Upload Complete!" : "Creating Your NFT..."}
          </h2>
          <p className="text-body-sm text-text-tertiary">
            {isComplete 
              ? "Your NFT has been created successfully" 
              : "Please wait while we process your NFT"}
          </p>
        </div>
        
        <div className="relative h-3 bg-background-tertiary rounded-full overflow-hidden mb-2">
          <div 
            className={cn(
              "h-full transition-all duration-300 ease-out",
              isComplete ? "bg-success-500" : "bg-primary-600",
              "bg-gradient-to-r from-primary-600 to-secondary-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-body-xs text-text-tertiary mb-8">
          <span>Uploading</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        {isComplete && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-success-500/20 p-3">
                <CheckCircle className="h-10 w-10 text-success-500" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push("/create")}
              >
                Create Another
              </Button>
              <Button 
                variant="gradient" 
                onClick={() => router.push("/profile")}
              >
                View My NFTs
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
