// COMMENTED OUT FOR PROCOIN COMPETITION - FOCUS ON SECONDARY MARKETPLACE ONLY
// "use client";

// import { useState } from "react";
// import { PageHeader } from "@/components/layout/page-header";
// import { Button } from "@/components/ui/button";
// import { CreateNFTForm } from "@/components/create/create-nft-form";
// import { UploadProgress } from "@/components/create/upload-progress";

// export default function CreatePage() {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleUploadStart = () => {
//     setIsUploading(true);
//     simulateUpload();
//   };

//   const simulateUpload = () => {
//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         const newProgress = prev + Math.random() * 10;
//         if (newProgress >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             setIsUploading(false);
//             setUploadProgress(0);
//           }, 1000);
//           return 100;
//         }
//         return newProgress;
//       });
//     }, 300);
//   };

//   return (
//     <div className="flex flex-col min-h-screen animate-fade-in">
//       <PageHeader title="Create NFT" />

//       <div className="px-4 pb-6">
//         {isUploading ? (
//           <UploadProgress progress={uploadProgress} />
//         ) : (
//           <CreateNFTForm onUploadStart={handleUploadStart} />
//         )}
//       </div>
//     </div>
//   );
// }

// TEMPORARY REDIRECT FOR COMPETITION - FOCUS ON SECONDARY MARKETPLACE
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to discover page since we're focusing on secondary marketplace
    router.push("/discover");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-text-secondary">Focusing on secondary marketplace trading</p>
      </div>
    </div>
  );
}
