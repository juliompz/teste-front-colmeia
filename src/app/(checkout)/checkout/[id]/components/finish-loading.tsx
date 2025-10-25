import { Loader2 } from "lucide-react";
import React from "react";

const FinishLoading = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="animate-spin h-6 w-6" />
      <p>{text}</p>
    </div>
  );
};

export { FinishLoading };
