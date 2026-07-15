import { Suspense } from "react";
import { ClassifiedInner } from "@/components/government/classified-inner";

export default function ClassifiedPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto p-8 opacity-50 text-center">
          CARREGANDO...
        </div>
      }
    >
      <ClassifiedInner />
    </Suspense>
  );
}
